<template>
  <div id="app">
    <v-app>
      <v-sheet
        class="sheet-style-props"
      >
        <v-container class="fill-height">
          <v-row
            align="center"
            justify="center"
          >
            <v-app-bar
              flat
              color="#ffa69e"
              width="100%"
              class="app-bar"
            >
              <div class="votes-remaining-text">
                Remaining votes today: {{ votesLeft }}
              </div>
            </v-app-bar>

            <v-spacer></v-spacer>

            <v-btn
              class="mx-2 menu-btn"
              color="#bfb7aa"
              fab
              dark
              fixed
              right
              large
              @click.stop="drawer = !drawer"
            >
              <v-icon dark>mdi-format-list-bulleted-square</v-icon>
            </v-btn>
          </v-row>
        </v-container>

        <v-navigation-drawer
          v-model="drawer"
          temporary
          app
          color="#84DCC6"
          class="nav-drawer"
        >
          <v-list-item>
            <v-list-item-content>
              <p class="text-adjustment">Photo Pride Menu</p>
            </v-list-item-content>
          </v-list-item>

          <v-list dense>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon large color>mdi-string-lights</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title align="start" class="list-item-title"><router-link to="/" class="menu-item-title"><p class="router-link-text">Home</p></router-link></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider class="divider-style"></v-divider><br />

            <v-list-item link>
              <v-list-item-icon>
                <v-icon large>mdi-police-badge</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title align="start" class="list-item-title"><router-link to="/PolicyPage" class="menu-item-title"><p class="router-link-text">Our Policy</p></router-link></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider><br />

            <v-list-item link>
              <v-list-item-icon>
                <v-icon large>mdi-trophy-variant</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title align="start" class="list-item-title"><router-link to="/WeeklyWinners" class="menu-item-title"><p class="router-link-text">Winners</p></router-link></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider><br />

            <v-list-item link>
              <v-list-item-icon>
                <v-icon large>mdi-camera</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title align="start" class="list-item-title"><router-link to="/UploadPhoto" class="menu-item-title"><p class="router-link-text">Upload</p></router-link></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider><br />

            <v-list-item link>
              <v-list-item-icon>
                <v-icon large>mdi-heart-multiple</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title align="start" class="list-item-title"><router-link to="/VoterBox" class="menu-item-title"><p class="router-link-text">Vote</p></router-link></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-sheet>
      <v-content>
          <v-container fluid>
              <router-view class="shift-up" v-on:votesRemainingInt="onStoreVote"></router-view>
          </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    if (localStorage.getItem('uuid')) {
      var d = new Date()
      var n = d.getDay()
      var todaysDt = d.getDate()

      var lastVoteDay = localStorage.getItem('date')
      var lastVoteMonth = localStorage.getItem('month')
      var lastVoteYear = localStorage.getItem('year')

      if (!lastVoteDay) {
        localStorage.setItem('date', todaysDt) // really gets day of month as number
        localStorage.setItem('month', d.getMonth())
        localStorage.setItem('year', d.getFullYear())

        if (n === 6) {
          localStorage.setItem('votesLeft', 5)
          this.votesLeft = 5
        } else {
          localStorage.setItem('votesLeft', 1)
          this.votesLeft = 1
        }
      }

      if (lastVoteDay < todaysDt || lastVoteMonth < d.getMonth() || lastVoteYear < d.getFullYear()) {
        if (n === 6) {
          localStorage.setItem('votesLeft', 5)
          this.votesLeft = 5
        } else {
          localStorage.setItem('votesLeft', 1)
          this.votesLeft = 1
        }
      } else {
        this.votesLeft = localStorage.getItem('votesLeft')
      }
    } else {
      this.votesLeft = '0'
    }
  },
  methods: {
    onStoreVote (value) {
      this.votesLeft = value.toString()
    }
  },
  data () {
    return {
      drawer: false,
      votesLeft: ''
    }
  }
}
</script>

<style>
#app {
  /* font-family: 'Rye', cursive; */
  /* font-family: 'Permanent Marker', cursive; */
  font-family: 'Calistoga', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  color: gray;
}
.menu-btn {
  /* background-image: linear-gradient(to bottom right, #00A6ED,  #76E7CD, white); */
  background-image: radial-gradient(#84DCC6, #A5FFD6);
  margin-top: 10px;
}
.menu-item-title {
  text-decoration: none;
  font-size: medium;
}
.nav-drawer {
  /* background-image: linear-gradient(to right, #00A6ED,  #76E7CD, white); */
  background-image: linear-gradient(to right, #A5FFD6,  #84DCC6);
}
p {
  /* font-family: 'Rye', cursive; */
  /* font-family: 'Permanent Marker', cursive; */
  font-family: 'Calistoga', cursive;
}
.text-adjustment {
  color: gray;
  font-size: larger;
  padding-top: 15px;
}
/* .shift-up {
  margin-top: -15px;
} */
.votes-remaining-text {
  /* color: #616161; */
  /* color: #4f4f4f; */
  color: whitesmoke;
  font-size: large;
}
.sheet-style-props {
  margin-top: -12px;
}
.app-bar {
  background-color: #ffa69e;
}
.router-link-text {
  color: gray;
  font-size: large;
}
.list-item-title {
  padding-top: 4px;
}
/* .divider-style {
  background-color: #A5FFD6;
} */
</style>
