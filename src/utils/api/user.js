import axios from '../../core/axios'

export default {
	login: (postData) => axios.get('/user?/ogin', postData)
	
}