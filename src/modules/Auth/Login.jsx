import classNames from 'classnames'
import { ErrorMessage, withFormik } from 'formik'
import { React, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Block from '../../components/Layout/Block'

import store from '../../redux/store'
import userAction from '../../redux/actions/user'
import validate from '../../utils/helpers/validate'

function Login({
	values,
	touched,
	errors,
	isSubmitting,
	handleChange,
	handleBlur,
	handleSubmit,
	handleReset,
	dirty,
	fetchUserLogin
}) {
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
					<Link to='/register' className='text-gray-500 mt-3'>
						Зарегистрироваться
					</Link>
				</form>
			</Block>
		</section>
	)
}

// container
const MyEnhancedForm = withFormik({
	enableReinitialize: true,

	mapPropsToValues: () => ({
		email: '',
		password: ''
	}),

	validate: values => {
		let errors = {}
		validate({ isAuth: true, errors, values })
		return errors
	},

	handleSubmit: (values, { setSubmitting, props }) => {

		store.dispatch(userAction.fetchUserLogin(values, props))

		setSubmitting(false)
	},

	displayName: 'Login' // helps with React DevTools
})(Login)

export default MyEnhancedForm
