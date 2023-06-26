import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import Chat from '../modules/Home/Chat'
import Profile from '../modules/Home/Profile'
import Home from '../modules/Home/Home'

import userAction from '../redux/actions/user'
import store from '../redux/store'

import { BrowserRouter as Router } from "react-router-dom";

function Start({ isAuth, verifyCode, verify, data }) {
	// const navigate = useNavigate()
	// const [code, setCode] = useState()

	// useEffect(() => {
	// 	// if(window.localStorage.token !== '' || window.localStorage.token !== undefined || window.localStorage.token !== null) {
	// 	// 	navigate("/login");
	// 	// }
	// 	if (isAuth) {
	// 		return navigate('/home')
	// 	}
	// 	if (data && !verify) {
	// 		return navigate('/verify')
	// 	}
	// }, [window.localStorage.token, isAuth, navigate, verifyCode, verify, data])

	// if (verifyCode === code && !verify) {
	// 	store.dispatch(userAction.fetchUserRegister(data))

	// 	return navigate('/home')
	// }

	return (
		<section className='start h-full w-full flex items-center justify-center '>
			<Router>
				<Routes>
					<Route path='/home' element={<Home />} />
					<Route path='/chat' element={<Chat />} />
					<Route path='/profile' element={<Profile />} />
					{/* <Route path='*' element={<Navigate to='/404' replace />} /> */}
				</Routes>
			</Router>
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
)(Start)
