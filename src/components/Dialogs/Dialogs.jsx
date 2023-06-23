import classNames from 'classnames'
import { orderBy } from 'lodash'
import { React, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import dialogsActions from '../../../src/redux/actions/dialogs'
import DialogItem from '../../../src/components/Dialogs/DialogItem'
import userAction from '../../redux/actions/user'
import store from '../../redux/store'

import { LoadingOutlined } from '@ant-design/icons'
import { Empty } from 'antd'

function Dialogs({
	items,
	userId,
	onSearch,
	clearSearchInput,
	fetchDialogs,
	setCurrentDialog,
	isLoading,
	currentDialog,
	dialogId,
	user,
	currentDialogName
}) {
	
	console.log('currentDialogName: ', currentDialogName);
	// const [getUser_Dialog, SETgetUser_Dialog] = useState(false)

	const [filtred, setFiltred] = useState(items)
	const [dialogName, setDialogName] = useState('')


	useEffect(() => {
		setFiltred(
			items.filter(
				dialog => console.log('qqqqqqqqqq dialog: ', dialog) ||
				(user.email === dialog.partner.email ? dialog.author.fullname : dialog.partner.fullname)
						.toLowerCase()
						.indexOf(onSearch.toLowerCase()) >= 0
			)
		)
	}, [onSearch])

	useEffect(() => {
		if (items.length) {
			setFiltred(items)
		} else{
			// setTimeout(() => fetchDialogs(), 1000)
			fetchDialogs()
		}
	}, [items])

	const antIcon = (
		<LoadingOutlined
			style={{
				fontSize: 32
			}}
			spin
		/>
	)

	const delayFunction = res => {
			return res
	}


	return (
		<section
			className={classNames(
				'dialogs h-full lg:w-[320px] w-[280px] px-3 flex flex-col gap-2 overflow-y-auto overflow-x-hidden',
				{ 'items-center justify-center': isLoading || !items.length }
			)}
		>
			{/* {isLoading ? (
				<Spin tip='Загрузка' indicator={antIcon} />
			) : filtred.length ? (
				orderBy(filtred, ['lastMessageTime'], ['asc']).map(item => (
					<DialogItem
						key={item.user._id}
						unreaded={item.unreaded}
						isMe={item.user._id === userId}
						{...item}
						hashId={item._id}
						getUser={id => SETgetUser_Dialog(id)}
						clearSearchInput={bool => clearSearchInput(bool)}
						selectDialog={setCurrentDialog}
						currentDialog={currentDialog}
					/>
				))
			) : (
				<Empty
					description='Контакт не найден'
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					// image={Empty.PRESENTED_IMAGE_DEFAULT}
				/>
			)} */}
			{filtred.length ? (
				orderBy(filtred, ['lastMessageTime'], ['asc']).map(item => console.log('filtred ', item) || (
					<DialogItem
						key={item._id}
						_id={item._id}
						// unreaded={item.unreaded}
						// isReaded={item.isReaded}
						// // isMe={item.author._id === userId}
						
						currentDialogId={user ? (delayFunction(user.email === item.partner.email ? item.author.fullname : item.partner.fullname )) : 'name'}
						{...item}

						setName={name => setDialogName(name)}

						setCurrent={(id, data) => {
							store.dispatch(userAction.setCurrentDialog({id: id, data: data}))
						}}

						// hashId={item._id}
						// getUser={id => SETgetUser_Dialog(id)}
						clearSearchInput={bool => clearSearchInput(bool)}
						selectDialog={setCurrentDialog}
						currentDialog={currentDialog}
					/>
				))
			) : (
				<Empty
					description='Контакт не найден'
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					// image={Empty.PRESENTED_IMAGE_DEFAULT}
				/>
			)}
		</section>
	)
}

export default connect(
	({ dialogs, user }) => console.log('dialogs: ', dialogs) || console.log('user ', user) || ({
		isLoading: dialogs.isLoading,
		currentDialog: dialogs.currentDialog,
		items: dialogs.items,
		user: user.data,
		currentDialogName: dialogs.currentDialogData
	}),
	dialogsActions
)(Dialogs)
