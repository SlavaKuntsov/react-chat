const initialState = {
	data: null,
	isAuth: false,
	token: window.localStorage.token || null,
	verify: false,
	verifyCode: null
}

export default ( state = initialState, {type, payload} ) => {
	switch ( type ) {
		case 'USER:SET_DATA': 
			return {
				...state,
				data: payload,
				isAuth: true,
				token: window.localStorage.token
			}
		case 'USER:SET_VERIFY': 
			return {
				...state,
				verifyCode: payload.verifyCode,
				isVerify: payload.verify
			}
		default: 
			return state
	}
}