// import Axios from 'axios'
const axios = require('axios')

// const RESOURCE_NAME = 'https://localhost:44300/api/voterbox'
const RESOURCE_NAME = 'https://photocontestapi2.azurewebsites.net/api/voterbox'

export default {
  storeOneVote (id) {
    return axios.get(RESOURCE_NAME + '/' + id)
  }
}
