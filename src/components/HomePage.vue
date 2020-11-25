<template>
  <div class="logo-style-props">
    <v-img src="https://photocontestblob.blob.core.windows.net/photocontestblob/homepage-art-6.gif" width="100%" height="100%"></v-img>

    <v-form v-model="valid">
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

    <template>
      <div class="text-center ma-2">
        <v-snackbar
          v-model="isUnlocked"
        >
          All features unlocked!

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
export default {
  name: 'HomePage',
  methods: {
    unlockApp () {
      var str = this.passcode.toLowerCase()
      if (str === this.secretWord) {
        localStorage.setItem('passcode', this.secretWord)
        this.isUnlocked = true
      }
    }
  },
  data () {
    return {
      secretWord: 'frosty',
      passcode: '',
      isUnlocked: false
    }
  }
}
</script>

<style scoped>
.logo-style-props {
  padding-top: 30px;
}
</style>
