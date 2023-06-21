import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3333'
axios.defaults.headers.common['token'] = window.localStorage.token
// axios.defaults.baseURL = 'http://localhost:9999'

window.axios = axios

export default axios