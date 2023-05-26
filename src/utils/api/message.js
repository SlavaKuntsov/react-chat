import axios from '../../core/axios'

export default {
	getAllDialogId: (id) => axios.get(`/messages?dialog=${id}`)
	
}