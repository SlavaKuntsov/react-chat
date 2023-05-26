import dialogsApi from '../../../src/utils/api/dialogs'

const actions = {
	setDialogs: items => ({
		type: 'DIALOGS:SET_ITEMS', 
		payload: items
	}),
	setIsLoading: bool => ({
		type: 'DIALOGS:SET_IS_LOADING', 
		payload: bool
	}),
	setCurrentDialog: id => ({
		type: 'DIALOGS:SET_CURRENT_DIALOG', 
		payload: id,
	}),
	fetchDialogs: () => dispatch => {
		dispatch(actions.setIsLoading(true))
		dialogsApi.
			getAll()
			.then(({data}) => {
				dispatch(actions.setDialogs(data))
			})
			.then(() => {
				dispatch(actions.setIsLoading(false))
			})
	}
}

export default actions