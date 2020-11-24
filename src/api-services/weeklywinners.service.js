// import Axios from 'axios'
const axios = require('axios')

// const RESOURCE_NAME = 'https://localhost:44300/api/homepage'
const RESOURCE_NAME = 'https://photocontestapi2.azurewebsites.net/api/homepage'

export default {
  getWeeklyWinners () {
    return axios.get(RESOURCE_NAME)
  }
}
