<template>
  <div>
    <div>
      <v-card
        elevation="5"
        max-height="219"
      >
        <img :src="image" width="100%" height="auto" class="image-style-props">
      </v-card>
    </div>
      <div v-if="!isImageRendered">
        <div class="form-style-props">
          <v-card
            elevation="2"
            outlined
          >
            <input class="file-input btn" type="file" id="file" ref="file" v-on:change="handleFileUpload()" />

            <v-text-field
              v-model="author"
              label="Enter your name"
              required
              counter="10"
              :disabled="isImageSaving"
              class="author-text-field"
            ></v-text-field>
          </v-card>
        </div>

        <div class="submit-button-container">
          <v-btn
            elevation="2"
            width="75%"
            rounded
            fab
            color="#f92545"
            :loading="isImageSaving"
            :disabled="isImageSaving"
            :hidden="!isUnlocked"
            class="submit-photo-btn"
            v-on:click="submitFile()"
          >Submit Photo</v-btn>
        </div>

        <h3>(this may take a minute)</h3>
      </div>

      <template>
        <div class="text-center ma-2">
          <v-snackbar
            v-model="isImageSaved"
          >
            {{ snackbarText }}

            <template v-slot:action="{ attrs }">
              <v-btn
                :color="snackbarTextColor"
                text
                multi-line
                timeout="10000"
                v-bind="attrs"
                @click="isImageSaved = false"
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

export default {
  name: 'UploadPhoto',
  methods: {
    handleFileUpload () {
      this.uploadedImage = this.$refs.file.files[0]
    },
    submitFile () {
      if (this.uploadedImage) {
        if (this.author) {
          this.isImageSaving = true
          this.isImageSaved = false

          const formData = new FormData()
          formData.append('file', this.uploadedImage)
          formData.append('index', this.index)
          formData.append('author', this.author)

          this.index += 1

          const config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }

          UploadService.postOneImage(formData, config).then(response => {
            this.image = response.data.imgUrlHighQuality
            this.author = response.data.author
            this.index = response.data.id
            this.snackbarText = 'Photo successfully saved!'
            this.snackbarTextColor = '#12c718'
            this.isImageSaved = true
            this.isImageRendered = true
            this.isImageSaving = false
          })
        } else {
          this.isAuthorMissing = true
          this.snackbarText = 'Please enter your name'
          this.snackbarTextColor = '#ff0000'
          this.isImageSaved = true
        }
      } else {
        this.isUploadMissing = true
        this.snackbarText = 'Please choose a photo'
        this.snackbarTextColor = '#ff0000'
        this.isImageSaved = true
      }
    }
  },
  created () {
    this.passcode = localStorage.getItem('passcode')
    if (this.passcode) {
      if (this.passcode === 'frosty') {
        this.isUnlocked = true
      }
    }

    this.image = this.placeholderImage

    UploadService.getLast()
      .then((response) => {
        this.index = response.data.id
      })
  },
  data () {
    return {
      image: '',
      uploadedImage: '',
      placeholderImage: 'https://photocontestblob.blob.core.windows.net/photocontestblob/photo-pride-text-cropped.jpg',
      author: '',
      index: '',
      isImageSaving: false,
      isImageSaved: false,
      isImageRendered: false,
      passcode: '',
      isUnlocked: false,
      snackbarText: '',
      snackbarTextColor: '#12c718',
      isUploadMissing: true,
      isAuthorMissing: true
    }
  }
}
</script>

<style scoped>
.author-text-field {
  margin: 0px 10px 0px 10px;
}
.image-style-props {
  border: 2px solid black;
  border-radius: 4px;
}
.file-input {
  margin: 10px 0px 10px 0px;
}
.form-style-props {
  padding: 15px 0px 15px 0px;
}
.submit-button-container {
  padding-bottom: 10px;
}
.submit-photo-btn {
  color: white;
}
h3 {
  color: black;
  font-family: 'Permanent Marker', cursive;
}
</style>
