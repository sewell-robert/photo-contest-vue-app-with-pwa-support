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
              counter="25"
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
            Photo successfully saved!

            <template v-slot:action="{ attrs }">
              <v-btn
                color="#12c718"
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
  props: {

  },
  methods: {
    handleFileUpload () {
      this.uploadedImage = this.$refs.file.files[0]
    },
    submitFile () {
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
        this.isImageSaved = true
        this.isImageRendered = true
        this.isImageSaving = false
      })
    }

    //   this.image = event.target.files[0].name;
    //   // OrderService.postOneImage();
    // },
  },
  created () {
    this.image = this.placeholderImage
    // OrderService.getAll()
    //   .then((response) => {
    //     this.image = 'data:image/jpg;base64,'.concat(this.image.concat(response.data));
    //   });
    UploadService.getLast()
      .then((response) => {
        // this.image = response.data.imgUrl
        // this.author = response.data.author
        this.index = response.data.id
      })
    // OrderService.getOne('2')
    //   .then((response) => {
    //     this.person = response.data.name;
    //   });
    // OrderService.getOneImage('2')
    //   .then((response) => {
    //     this.image = response.data.imgUrl;
    //   });
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
      isImageRendered: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  padding-bottom: 5px;
}
.submit-photo-btn {
  color: white;
}
h3 {
  color: #043404;
  font-family: 'Permanent Marker', cursive;
}
</style>
