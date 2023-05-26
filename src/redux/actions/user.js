import userApi from '../../utils/api/message'

const actions = {
	setUser: data => ({
		type: 'USER:SET_DATA', 
		payload: data
	}),
	fetchUser: postData => dispatch => {
		userApi
			.login(postData)
			.then(({data}) => {
				dispatch(actions.setUser(data))
			})
			.catch(() => {
				dispatch(actions.setIsLoading(false))
			})
	}
}

export default actions