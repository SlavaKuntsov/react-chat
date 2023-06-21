import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { connect } from 'react-redux'

import userAction from '../redux/actions/user'
import store from '../redux/store';
import Register from '../modules/Register'
import Login from '../modules/Login'
import Verify from '../modules/Verify';

function Auth({isAuth, verifyCode, isVerify}) {
	console.log(verifyCode);

	const navigate = useNavigate();
	const [code, setCode] = useState()
	console.log(code);
	
	useEffect(() => {
		// if(window.localStorage.token !== '' || window.localStorage.token !== undefined || window.localStorage.token !== null) {
		// 	navigate("/login");
		// }
		if (verifyCode !== null) {
			console.log(111111111111111111111111111111)
			return navigate("/verify") ;
		}
		
	}, [window.localStorage.token, isAuth, navigate, verifyCode, isVerify])

	if(`${verifyCode}` !== `${code}`) {
		console.log(3333)
	}
	if(verifyCode === code) {
		console.log(222222)
		return navigate("/home")
	}

	return (
		<section className='auth h-full w-full flex items-center justify-center '>
			<Routes>
				{['/', '/login'].map((path, id) => (
					<Route path={path} element={<Login />} key={id} />
				))}
				<Route path='/register' element={<Register />} />
				<Route path='/verify' element={<Verify code={code => setCode(code)}/>} />
				<Route path="*" element={<Navigate to="/404" replace />} />
			</Routes>
		</section>
	)
}

export default connect(
	({ user }) => console.log('user ', user) || ({
		isAuth: user.isAuth,
		verifyCode: user.verifyCode,
		isVerify: user.isVerify
	}),
	userAction
)(Auth)
