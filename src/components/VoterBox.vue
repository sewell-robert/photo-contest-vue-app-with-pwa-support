<template>
  <div class="component-background">
    <div v-if="!isResultsEmpty">
      <h3>(tap on a photo to open it up)</h3>
    </div>
    <div class="no-photos" v-if="isResultsEmpty">
      No photos have been uploaded!
    </div>
    <div class="row-style-props">
      <v-row>
        <v-col
          v-for="(result, index) in results"
          :key="result.id"
          class="d-flex child-flex"
          cols="6"
        >
          <div class="text-center">
            <v-dialog
              v-model="dialog"
              :retain-focus="false"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  :src="result.imgUrlLowQuality"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  v-bind="attrs"
                  v-on="on"
                  v-on:click="cacheIndexForDialog(index)"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </template>

              <v-card :color="cardColor">
                <v-card-title v-if="photo.photoTitle" class="photoTitle-style-props">"{{photo.photoTitle}}"</v-card-title>

                <v-img
                  :src="photoUrlDialog"
                  class="grey lighten-2 white--text align-end"
                >
                  <div>
                    <v-card-title>Photo by {{ photo.author }}</v-card-title>
                  </div>

                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>

                <v-card-actions>
                  <v-card-subtitle class="card-subtitle">{{ photo.votes }} Votes</v-card-subtitle>

                  <v-spacer></v-spacer>

                  <v-btn
                    icon
                    :disabled="alreadyVoted"
                    class="heart-icon-btn"
                  >
                    <div v-if="isLiked">
                      <v-icon
                        color="#ff0000"
                        v-on:click="storeVote()"
                      >
                        mdi-heart
                      </v-icon>
                    </div>
                    <div v-else>
                      <v-icon
                        large
                        v-on:click="storeVote()"
                      >
                        mdi-heart
                      </v-icon>
                    </div>
                  </v-btn>

                  <v-btn
                    icon
                    @click="dialog = false, isLiked = false"
                  >
                    <v-icon large>mdi-close</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="text-center pagination-container">
      <v-pagination
        v-model="page"
        :length="paginationLength"
        circle
        color="#FF686B"
        class="pagination-style-props"
        @input="nextPage()"
      ></v-pagination>
    </div>

    <template>
      <div class="text-center ma-2">
        <v-snackbar
          v-model="isSnackbarVisible"
        >
          {{ snackbarText }}

          <template v-slot:action="{ attrs }">
            <v-btn
              :color="snackbarTextColor"
              text
              multi-line
              timeout="10000"
              v-bind="attrs"
              @click="isSnackbarVisible = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </template>
  </div>
</template>

<script>
import UploadService from '@/api-services/upload.service'
import VoterBoxService from '@/api-services/voterbox.service'

export default {
  name: 'VoterBox',
  methods: {
    nextPage () {
      UploadService.getNextPage(this.page)
        .then((response) => {
          this.results = response.data.photoDataList
        })
    },
    cacheIndexForDialog (index) {
      this.photo = this.results[index]

      if (this.photo.imgUrlHighQuality) {
        this.photoUrlDialog = this.photo.imgUrlHighQuality
      } else {
        this.photoUrlDialog = this.photo.imgUrl
      }

      if (this.cardColor === '#84DCC6') {
        this.cardColor = '#ffa69e'
      } else {
        this.cardColor = '#84DCC6'
      }
    },
    storeVote () {
      if (localStorage.getItem('uuid')) {
        if (localStorage.getItem('uuid') === this.photo.uuid) {
          this.snackbarText = 'Cannot vote for your own photo'
          this.snackbarTextColor = '#ff0000'
          this.isSnackbarVisible = true
        } else {
          var newDate = new Date()
          var todaysDt = newDate.getDate()
          var month = newDate.getMonth()
          var year = newDate.getFullYear()

          var votesRemaining = localStorage.getItem('votesLeft')
          var votesRemainingInt = parseInt(votesRemaining)

          if (votesRemainingInt > 0) {
            this.isLiked = true
            VoterBoxService.storeOneVote(this.photo.id)
              .then((response) => {
                this.photo.votes = response.data
              })
            localStorage.setItem('date', todaysDt)
            localStorage.setItem('month', month)
            localStorage.setItem('year', year)
            localStorage.setItem('photoId', this.photo.id)

            votesRemainingInt = votesRemainingInt - 1
            localStorage.setItem('votesLeft', votesRemainingInt)

            this.$emit('votesRemainingInt', votesRemainingInt)
          } else {
            this.snackbarText = 'No votes remaining'
            this.snackbarTextColor = '#ff0000'
            this.isSnackbarVisible = true
          }
        }
      } else {
        this.snackbarText = 'You are not authorized to vote. Please reach out for help.'
        this.snackbarTextColor = '#ff0000'
        this.isSnackbarVisible = true
      }
    }
  },
  created () {
    UploadService.getNextPage(1)
      .then((response) => {
        this.results = response.data.photoDataList

        this.paginationLength = Math.ceil(response.data.photoCount / 6)

        if (response.data.photoCount === 0) {
          this.isResultsEmpty = true
        }
      })

    // UploadService.getNextPage(1)
    //   .then((response) => {
    //     this.results = response.data
    //   }).then(UploadService.getPhotoCount()
    //     .then((response) => {
    //       this.paginationLength = Math.ceil(response.data / 6)
    //       console.log(response.data)

    //       if (response.data === 0) {
    //         this.isResultsEmpty = true
    //       }
    //     }))

    var newDate = new Date()
    var todaysDt = newDate.getDate()

    if (localStorage.getItem('date')) {
      var date = localStorage.getItem('date')

      if (date === todaysDt) {
        this.alreadyVoted = true
      }
    }
  },
  data () {
    return {
      results: [],
      page: 1,
      paginationLength: 4,
      dialog: false,
      photo: {},
      photoUrlDialog: '',
      isLiked: false,
      alreadyVoted: false,
      isResultsEmpty: false,
      isSnackbarVisible: false,
      snackbarText: '',
      snackbarTextColor: '',
      cardColor: '#ffa69e'
    }
  }
}
</script>

<style scoped>
.component-background {
  width: auto;
}
.card-subtitle {
  font-size: larger;
}
.heart-icon-btn {
  margin-right: 25px;
}
h1 {
  color: gray;
  font-family: 'Calistoga', cursive;
}
.no-photos {
  padding-top: 150px;
}
.photoTitle-style-props {
  justify-content: center;
  color: rgba(0, 0, 0, 0.6);
}
</style>
