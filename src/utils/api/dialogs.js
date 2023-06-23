import axios from '../../core/axios'

export default {
	getAll: () => axios.get('/dialogs')	,
	getCurrent: id => axios.post('/current', id)	
}