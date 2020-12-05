<template>
  <div>
    <h2>Most Votes All-Time</h2>
    <div v-if="!isResultsEmpty">
      <v-carousel
        cycle
        hide-delimiters
        hide-delimiter-background
        interval="20000"
        class="carousel-style-props"
      >
        <v-carousel-item
          v-for='result in results'
          :key='result.id'
          reverse-transition="fade-transition"
        >
          <v-sheet
            height="100%"
            color="white"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <p>{{ result.votes }} votes <v-icon class="icon-style">mdi-trophy-variant</v-icon> By {{ result.author }} (Week {{ result.contestWeek }})</p>

              <v-card>
                <v-img
                  :src="result.imgUrlHighQuality"
                  width="100%"
                  height="auto"
                  class="grey lighten-2"
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
              </v-card>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div v-else class="no-votes">
      Nothing to see here.<br />No votes have been cast!
    </div>
  </div>
</template>

<script>
import WeeklyWinnersService from '@/api-services/weeklywinners.service'

export default {
  name: 'WeeklyWinners',
  created () {
    WeeklyWinnersService.getWeeklyWinners()
      .then((response) => {
        this.results = response.data

        if (this.results.length === 0) {
          this.isResultsEmpty = true
        }
      })
  },
  data () {
    return {
      results: [],
      isResultsEmpty: false
    }
  }
}
</script>

<style scoped>
h2 {
  color: gray;
  font-family: 'Calistoga', cursive;
}
p {
  color: gray;
  font-family: 'Calistoga', cursive;
}
.carousel-style-props {
  padding-top: 5px;
}
.no-votes {
  padding-top: 150px;
}
.icon-style {
  color: gray;
}
</style>
