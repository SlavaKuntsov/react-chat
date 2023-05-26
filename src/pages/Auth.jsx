import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Register from '../modules/Register'
import Login from '../modules/Login'

export default function Auth(props) {
	return (
		<section className='auth h-full w-full flex items-center justify-center '>
			<Routes>
				{['/', '/login'].map((path, id) => (
					<Route path={path} element={<Login />} key={id} />
				))}
				<Route path='/register' element={<Register />} />
			</Routes>
		</section>
	)
}
