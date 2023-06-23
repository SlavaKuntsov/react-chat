import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import Login from '../modules/Login'
import Register from '../modules/Register'
import Verify from '../modules/Verify'
import userAction from '../redux/actions/user'
import store from '../redux/store'

function Auth({ isAuth, verifyCode, verify, data }) {
	const navigate = useNavigate()
	const [code, setCode] = useState()

	useEffect(() => {
		// if(window.localStorage.token !== '' || window.localStorage.token !== undefined || window.localStorage.token !== null) {
		// 	navigate("/login");
		// }
		if(isAuth) {
			return navigate('/home')
		}
		if (data && !verify) {
			return navigate('/verify')
		}
	}, [window.localStorage.token, isAuth, navigate, verifyCode, verify, data])

	if (verifyCode === code && !verify) {
		store.dispatch(userAction.fetchUserRegister(data))

		return navigate('/home')
	}

	return (
		<section className='auth h-full w-full flex items-center justify-center '>
			<Routes>
				{['/', '/login'].map((path, id) => (
					<Route path={path} element={<Login />} key={id} />
				))}
				<Route path='/register' element={<Register />} />
				<Route
					path='/verify'
					element={<Verify code={code => setCode(code)} />}
				/>
				<Route path='*' element={<Navigate to='/404' replace />} />
			</Routes>
		</section>
	)
}

export default connect(
	({ user }) =>
		console.log('user ', user) || {
			isAuth: user.isAuth,
			verifyCode: user.verifyCode,
			verify: user.verify,
			data: user.data
		},
	userAction
)(Auth)
