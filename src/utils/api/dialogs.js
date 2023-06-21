import axios from '../../core/axios'

export default {
	getAll: () => axios.get('/dialogs')	
}