const initialState = {
	data: null,
	isAuth: false,
	token: window.localStorage.token || null,
	verify: false,
	verifyCode: null,
	isAuthLoading: false,
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'USER:SET_AUTH':
			return {
				...state,
				data: payload,
				isAuth: true,
				token: window.localStorage.token
			}
		case 'USER:REMOVE_AUTH':
			return {
				...state,
				data: null,
				isAuth: false,
				token: null
			}
		case 'USER:SET_DATA':
			return {
				...state,
				data: payload
			}
		case 'USER:SET_IS_LOADING':
			return {
				...state,
				isAuthLoading: payload
			}
		case 'USER:SET_VERIFY':
			return {
				...state,
				verifyCode: payload.verifyCode,
				verify: payload.verify
			}
		default:
			return state
	}
}
