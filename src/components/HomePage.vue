<template>
  <div>
    <div  class="logo-style-props">
        <v-img
          v-on:click="enableSecurityForm()"
          src="https://photocontestblob.blob.core.windows.net/photocontestblob/homepage-logo-art.gif"
          width="100%"
          height="100%"
        >
        </v-img>
    </div><br />

    <div
      class="form-style-props"
      :hidden="!isLogoClicked"
    >
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="8"
            >
              <v-text-field
                v-model="passcode"
                filled
                label="Enter passcode"
                type="password"
              ></v-text-field>
            </v-col>
            <v-col
              cols="4"
            >
              <v-btn
                height="56px"
                elevation="2"
                color="primary"
                v-on:click="unlockApp()"
              >Unlock</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>

    <template>
      <div class="text-center ma-2">
        <v-snackbar
          v-model="isUnlocked"
        >
          All features are unlocked!

          <template v-slot:action="{ attrs }">
            <v-btn
              color="#12c718"
              text
              multi-line
              timeout="10000"
              v-bind="attrs"
              @click="isUnlocked = false"
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
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'HomePage',
  methods: {
    enableSecurityForm () {
      this.isLogoClicked = true
    },
    unlockApp () {
      var str = this.passcode.toLowerCase()
      if (str === this.secretWord) {
        localStorage.setItem('passcode', this.secretWord)

        var date = new Date()
        localStorage.setItem('date', date.getDate() - 1)

        if (!localStorage.getItem('uuid')) {
          localStorage.setItem('uuid', uuidv4())
          console.log('UUID saved')
        }
        this.isUnlocked = true
      }
    }
  },
  data () {
    return {
      secretWord: 'frosty',
      passcode: '',
      isLogoClicked: false,
      isUnlocked: false
    }
  }
}
</script>

<style scoped>
.logo-style-props {
  padding-top: 10px;
}
.form-style-props {
  padding-top: 250px;
}
</style>
