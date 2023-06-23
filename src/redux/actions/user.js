import userApi from '../../utils/api/user'
import createNotification from '../../utils/helpers/createNotification'

const actions = {
	setUser: data => ({
		type: 'USER:SET_DATA',
		payload: data
	}),
	setAuth: data => ({
		type: 'USER:SET_AUTH',
		payload: data
	}),
	removeAuth: () => ({
		type: 'USER:REMOVE_AUTH',
	}),
	setVerify: data => ({
		type: 'USER:SET_VERIFY',
		payload: data
	}),
	setCurrentDialog: ({id, data}) => ({
		type: 'DIALOGS:SET_CURRENT_DIALOG', 
		payload: id,
		data: data
	}),
	fetchMe: id => dispatch => {
		userApi
			.getMe()
			.then(({ data }) => {
				dispatch(actions.setCurrentDialog({ id: id, data: data }));
			})
			.catch(err => {
				console.log(err)
			})
	},
	fetchUserData: () => dispatch => {
		userApi
			.getMe()
			.then(({ data }) => {
				dispatch(actions.setUser(data))
				dispatch(actions.setAuth(data))
				dispatch(actions.setVerify({ verify: true }))
			})
			.catch(err => {
				console.log(err)
			})
	},
	fetchUserLogin: (postData, props) => dispatch => {

		dispatch(actions.setVerify({ verify: true }))

		userApi.login(postData).then(({ data }) => {
			const { status, token } = data
			if (status === 'success') {
				createNotification({
					type: 'success',
					title: 'Отлично!',
					text: 'Авторизация прошла успешно'
				})
				// props.history.push('/home')

				window.axios.defaults.headers.common['token'] = token
				window.localStorage['token'] = token

				dispatch(actions.fetchUserData())

				// Navigate('/home')
			}
			if (status === 'failed') {
				createNotification({
					type: 'error',
					title: 'Ошибка при авторизации!',
					text: 'Неверный логин или пароль'
				})
			}
			if (status === 'error') {
				createNotification({
					type: 'error',
					title: 'Ошибка!',
					text: 'Пользователь не найден'
				})
			}
		})
	},
	fetchVerify:
		({ postData, codeResult }) =>
		dispatch => {
			userApi.verify(postData).then(code => {
				dispatch(actions.setVerify({ verifyCode: code.data }))
			})
		},
	fetchUserRegister: (postData, props) => dispatch => {

		userApi
			.registration(postData)
			.then(({ data }) => {
				const { status, token } = data

				if (status === 'success') {
					createNotification({
						type: 'success',
						title: 'Отлично!',
						text: 'Регистрация прошла успешно'
					})
					// props.history.push('/home')

					// dispatch(actions.fetchVerify(postData)) // verify user

					window.axios.defaults.headers.common['token'] = token
					window.localStorage['token'] = token

					dispatch(actions.fetchUserLogin(postData))

					// 	Navigate('/home')
				}

				if (status === 'failed') {
					createNotification({
						type: 'error',
						title: 'Ошибка при авторизации!',
						text: 'Неверный логин или пароль'
					})
				}

				if (status === 'error') {
					createNotification({
						type: 'error',
						title: 'Ошибка!',
						text: 'Пользователь не найден'
					})
				}
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export default actions
