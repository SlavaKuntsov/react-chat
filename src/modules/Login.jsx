import classNames from 'classnames'
import { ErrorMessage, withFormik } from 'formik'
import { React, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

import Button from '../components/Button'
import Block from '../components/Layout/Block'
import validate from '../utils/helpers/validate'
import createNotification from '../utils/helpers/createNotification'
import userAction from '../redux/actions/action'

function Login(props) {
	const {
		values,
		touched,
		errors,
		isSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
		handleReset,
		dirty
	} = props

	useEffect(() => {
		document.title = 'Login'
	}, [])

	return (
		<section className='inline-block text-center p-5'>
			<div className='mb-10'>
				<h1 className='text-slate-950 font-semibold text-3xl pb-3'>
					Войти в аккаунт
				</h1>
				<h3 className='text-gray-500 text-lg'>
					Пожалуйста, войдите в аккаунт
				</h3>
			</div>
			<Block>
				<form onSubmit={handleSubmit} className='flex flex-col gap-1'>
					<input
						className={classNames(
							' w-80 py-3 px-5 mt-2 border-2 border-gray-200 border-solid rounded ease-in-out duration-500 transition-all',
							{ 'border-red-500': touched.email && errors.email },
							{
								'border-green-500':
									touched.email && !errors.email
							}
						)}
						id='email'
						type='text'
						placeholder='Еmail'
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
						errors={errors}
					/>
					<ErrorMessage
						name='email'
						component='span'
						className='text-red-400 text-sm leading-3 text-start'
					/>
					<input
						className={classNames(
							' w-80 py-3 px-5 mt-2 border-2 border-gray-200 border-solid rounded transition-[border] ease-in-out duration-500',
							{
								'border-red-500':
									touched.password && errors.password
							},
							{
								'border-green-500':
									touched.password && !errors.password
							}
						)}
						placeholder='Пароль'
						id='password'
						type='password'
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
						errors={errors}
					/>
					<ErrorMessage
						name='password'
						component='span'
						className='text-red-400 text-sm leading-3 text-start'
					/>
						<Button
							htmlType='submit'
							className='bg-blue-500 mt-3'
							type='primary'
							size='large'
							onSubmit={handleSubmit}
							disabled={isSubmitting}
						>
							Войти в аккаунт
						</Button>
					{/* {!isSubmitting ? (
						<Button
							htmlType='submit'
							className='bg-blue-500 mt-3'
							type='primary'
							size='large'
							onSubmit={handleSubmit}
						>
							Войти в аккаунт
						</Button>
					) : (
						<Link to={'/home'}>
							<Button
								htmlType='submit'
								className='bg-blue-500 mt-3'
								type='primary'
								size='large'
								onSubmit={handleSubmit}
							>
								Войти в аккаунт
							</Button>
						</Link>
					)} */}

					<Link to='/register' className='text-gray-500 mt-3'>
						Зарегистрироваться
					</Link>
				</form>
			</Block>
		</section>
	)
}

const MyEnhancedForm = withFormik({
	enableReinitialize: true,

	mapPropsToValues: () => ({
		email: '',
		password: ''
	}),

	validate: values => {
		let errors = {}

		validate({ isAuth: true, errors, values })

		// console.log('values: ', values)
		// console.log('errors: ', errors)

		return errors
	},

	handleSubmit: (values, { setSubmitting }) => {
		// setTimeout(() => {
		// 	alert(JSON.stringify(values, null, 2))
		// 	setSubmitting(false)
		// }, 1000)
		axios.post('/user/login', values)
			.then((data) => {
				const { status, token} = data.data
				setSubmitting(false)
				if(status === 'success') {
					createNotification({
						type: 'success',
						title: 'Отлично!',
						text: 'Авторизация прошла успешно'
					})
				}	
				if(status === 'failed') {
					createNotification({
						type: 'error',
						title: 'Ошибка при авторизации!',
						text: 'Неверный логин или пароль'
					})
				}
				if(status === 'error') {
					createNotification({
						type: 'error',
						title: 'Ошибка!',
						text: 'Пользователь не найден'
					})
				}
			})
			.catch(() => {
				setSubmitting(false)
			})
	},

	displayName: 'Login' // helps with React DevTools
})(Login)

export default MyEnhancedForm
