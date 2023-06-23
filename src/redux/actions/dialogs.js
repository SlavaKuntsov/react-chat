import dialogsApi from '../../../src/utils/api/dialogs';

const actions = {
	setDialogs: items => ({
		type: 'DIALOGS:SET_ITEMS', 
		payload: items
	}),
	setIsLoading: bool => ({
		type: 'DIALOGS:SET_IS_LOADING', 
		payload: bool
	}),
	setCurrentDialog: ({id, data}) => ({
		type: 'DIALOGS:SET_CURRENT_DIALOG', 
		payload: id,
		data: data
	}),
	fetchCurrent: id => dispatch => {
		console.log('id: ', id);
		dialogsApi
			.getCurrent({ dialog: id })
			.then(({data}) => {
				console.log('data: ', data);

				// dispatch(actions.setCurrentDialog({ data: data }));
			})
			.catch((err) => {
				console.log(err)
			})
	},
	fetchDialogs: () => dispatch => {
		dispatch(actions.setIsLoading(true))

		window.axios.defaults.headers.common['token'] = window.localStorage['token']

		dialogsApi
			.getAll()
			.then(({data}) => {
				console.log('data: ', data);
				console.log(3)
				dispatch(actions.setDialogs(data))
				dispatch(actions.setIsLoading(false))
			})
			.catch((err) => {
				console.log(err)
				dispatch(actions.setIsLoading(false))
			})
	}
}

export default actions