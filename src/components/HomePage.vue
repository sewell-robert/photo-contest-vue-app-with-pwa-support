<template>
  <div :class="{ 'root-container': !isLogoClickedTwice }">
    <div class="logo-style-props">
      <v-img
        v-on:click="enableSecurityForm()"
        src="https://photocontestblob.blob.core.windows.net/photocontestblob/homepage-logo-no-animation.png"
        width="100%"
        height="100%"
      >
      </v-img>
    </div>

    <div class="divider-style">
      <v-divider></v-divider>
    </div>

    <div class="homepage-text">
      <h2>Congratulations, Frank Schiciano!</h2>
    </div>

    <h3>Out of all the beautiful photos, yours received the most votes in Week 2!</h3><br />
    <h4>Whose photo will win next? Now accepting Week 3 photos.</h4>
    <h4>(click the menu button to get started)</h4>

    <div
      :hidden="!isLogoClickedTwice"
    >
      <v-form class="form-style-props">
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
      if (this.isLogoClicked) {
        this.isLogoClickedTwice = true
      }

      this.isLogoClicked = true
    },
    unlockApp () {
      var str = this.passcode.toLowerCase() // from user
      if (str === this.secretWord) {
        localStorage.setItem('passcode', this.secretWord)

        if (!localStorage.getItem('uuid')) {
          localStorage.setItem('uuid', uuidv4())
        }
        this.isUnlocked = true
      }

      // Disable this after today
      var isReset = localStorage.getItem('alreadyReset')
      if (!isReset && str === this.secretWord2) {
        localStorage.setItem('votesLeft', 1)
        localStorage.setItem('alreadyReset', true)
      }
    }
  },
  created () {
    if (!localStorage.getItem('uuid')) {
      localStorage.setItem('uuid', uuidv4())

      localStorage.setItem('passcode', this.secretWord)
    }
  },
  data () {
    return {
      secretWord: 'frosty',
      secretWord2: 'reset',
      passcode: '',
      isLogoClicked: false,
      isLogoClickedTwice: false,
      isUnlocked: false
    }
  }
}
</script>

<style scoped>
.root-container {
  overflow: hidden;
  max-height: 100%;
}
.form-style-props {
  padding-top: 250px;
}
.homepage-text {
  padding-bottom: 10px;
}
.divider-style {
  margin-top: -25px;
  margin-bottom: 20px;
  position: relative;
}
</style>
