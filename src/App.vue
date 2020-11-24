<template>
  <div id="app">
    <v-app>
      <v-sheet
        height="80"
        class="overflow-hidden"
        style="position: relative;"
      >
        <v-container class="fill-height">
          <v-row
            align="center"
            justify="center"
          >
            <v-btn
              class="mx-2 menu-btn"
              color="#bfb7aa"
              fab
              dark
              fixed
              right
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
          class="nav-drawer"
        >
          <v-list-item>
            <v-list-item-content>
              <p class="text-adjustment">The Polar Express Navigation Menu</p>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-string-lights</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title align="start"><router-link to="/" class="menu-item-title">Home</router-link></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-police-badge</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title align="start"><router-link to="/PolicyPage" class="menu-item-title">Our Policy</router-link></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-trophy-variant</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title align="start"><router-link to="/WeeklyWinners" class="menu-item-title">Winners</router-link></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-camera</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title align="start"><router-link to="/UploadPhoto" class="menu-item-title">Upload</router-link></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-heart-multiple</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title align="start"><router-link to="/VoterBox" class="menu-item-title">Vote</router-link></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-sheet>
    <v-content>
        <v-container fluid>
            <router-view class="shift-up"></router-view>
        </v-container>
    </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.menu-btn {
  background-image: linear-gradient(to bottom right, #00A6ED,  #76E7CD, white);
}
.router-link-active {
  color: red;
}
.menu-item-title {
  text-decoration: none;
  font-size: medium;
}
.nav-drawer {
  background-image: linear-gradient(to right, #00A6ED,  #76E7CD, white);
}
p {
  font-family: 'Volkhov', serif;
}
.text-adjustment {
  font-weight: bold;
  font-size: larger;
  padding-top: 15px;
}
.shift-up {
  margin-top: -15px;
}
</style>
