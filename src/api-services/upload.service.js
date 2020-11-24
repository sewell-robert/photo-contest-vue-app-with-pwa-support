
// import Axios from 'axios'
const axios = require('axios')

// const RESOURCE_NAME = 'https://localhost:44300/api/uploadphotos'
const RESOURCE_NAME = 'https://photocontestapi2.azurewebsites.net/api/uploadphotos'

export default {
  getAll () {
    return axios.get(RESOURCE_NAME)
  },
  getOneImage (id) {
    return axios.get(RESOURCE_NAME + '/' + id)
  },
  getLast () {
    return axios.get(RESOURCE_NAME + '/last')
  },
  getNextPage (page) {
    return axios.get(RESOURCE_NAME + '/page/' + page)
  },
  getPhotoCount () {
    return axios.get(RESOURCE_NAME + '/count')
  },
  postOneImage (formData, config) {
    return axios.post(RESOURCE_NAME, formData, config)
  }
}
