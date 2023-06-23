import { SmileOutlined } from '@ant-design/icons'
import { Result } from 'antd'
import React, { useEffect, useState } from 'react'
import AuthCode from 'react-auth-code-input'
import { connect } from 'react-redux'

import Block from '../components/Layout/Block'
import userAction from '../redux/actions/user'
import store from '../redux/store'

const Verify = ({ code, data }) => {
	console.log('VVVVV data: ', data)

	useEffect(() => {
		document.title = 'Verify'
	}, [])

	const [result, setResult] = useState()
	const handleOnChange = res => {
		code(res)
		setResult(res)
		if (res.length === 6)
			store.dispatch(
				userAction.fetchVerify({ postData: data, codeResult: res })
			)
	}

	return (
		<Block>
			<Result
				icon={<SmileOutlined />}
				title='Готово!'
				subTitle={
					<p>
						Регистрация прошла успешно! <br /> Код для подтверждения
						аккаунта <br /> отправлен на ваш Email
					</p>
				}
			/>
			<AuthCode
				onChange={handleOnChange}
				containerClassName='flex row items-center justify-center gap-4 mb-4'
				inputClassName='px-3 py-2 w-11 h-14 text-xl text-center rounded-lg border-blue-200 border-2 border-solid uppercase font-semibold'
			/>
		</Block>
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
)(Verify)
