const initialState = {
	items: [],
	currentDialog: null,
	isLoading: false
}

export default ( state = initialState, {type, payload, data} ) => {
	switch ( type ) {
		case 'DIALOGS:SET_ITEMS':
			return {
				...state,
				items: payload
			}
		case 'DIALOGS:SET_IS_LOADING':
			return {
				...state,
				isLoading: payload
			}
		case 'DIALOGS:SET_CURRENT_DIALOG':
			return {
				...state,
				currentDialog: payload,
				currentDialogData: data
			}
		default: return state
	}
}