import axios from '../../core/axios'

export default {
	login: postData => axios.post('/user/login', postData),
	registration: postData => axios.post('/user/registration', postData),
	verify: postData => axios.post(`/user/verify`, postData),
	getMe: () => axios.get('/user/me'),
	
}