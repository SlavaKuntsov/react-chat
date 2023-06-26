import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import Login from '../modules/Auth/Login'
import Register from '../modules/Auth/Register'
import Verify from '../modules/Auth/Verify'
import Chat from '../modules/Home/Chat'
import Home from '../modules/Home/Home'
import Profile from '../modules/Home/Profile'

import userAction from '../redux/actions/user'
import store from '../redux/store'

function Global({ isAuth, verifyCode, verify, data, isAuthLoading, token }) {

	console.log('isAuthLoading: ', isAuthLoading);
	const navigate = useNavigate()
	const [code, setCode] = useState()

	useEffect(() => {
		
		// if(window.localStorage.token !== '' || window.localStorage.token !== undefined || window.localStorage.token !== null) {
			// 	navigate("/login");
		 	// }
		// if(!data && !token) {
		// 	console.log(2222222)
		// 	navigate('/login')
		// 	return 
		// }
		if(isAuthLoading) {
			store.dispatch(userAction.setIsLoading(false))
			navigate('/home')
			return 
		}
		if (data && !verify) {
			return navigate('/verify')
		}


	}, [isAuth, verify, isAuthLoading])

	if (verifyCode === code && !verify) {
		store.dispatch(userAction.fetchUserRegister(data))
		console.log(88888888)
		return navigate('/home')
	}

	return (
		<section className='global h-full w-full flex items-center justify-center '>
			<Routes>
				{/* auth */}
				{['/', '/login'].map((path, id) => (
					<Route path={path} element={<Login />} key={id} />
				))}
				<Route path='/register' element={<Register />} />
				<Route
					path='/verify'
					element={<Verify code={code => setCode(code)} />}
				/>

				{/* home */}
				<Route path='/home' element={<Home />} />
				<Route path='/messenger' element={<Chat />} />
				<Route path='/profile' element={<Profile />} />

				{/* 404 */}
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
			data: user.data,
			token: user.token,
			isAuthLoading: user.isAuthLoading
		},
	userAction
)(Global)
