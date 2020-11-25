<template>
  <div>
    <h2>Most Votes All-Time</h2>
    <v-carousel
      cycle
      hide-delimiters
      hide-delimiter-background
      :show-arrows="false"
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
            <p>{{ result.votes }} votes <v-icon color="black">mdi-trophy-variant</v-icon> By {{ result.author }}</p>
            <v-card>
              <v-img
                :src="result.imgUrlLowQuality"
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
</template>

<script>
import WeeklyWinnersService from '@/api-services/weeklywinners.service'

export default {
  name: 'WeeklyWinners',
  created () {
    WeeklyWinnersService.getWeeklyWinners()
      .then((response) => {
        this.results = response.data
      })
  },
  data () {
    return {
      results: []
    }
  }
}
</script>

<style scoped>
h2 {
  color: black;
  font-family: 'Permanent Marker', cursive;
}
p {
  color: black;
  font-family: 'Permanent Marker', cursive;
}
.carousel-style-props {
  padding-top: 5px;
}
</style>
