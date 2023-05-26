import classNames from 'classnames'
import { orderBy } from 'lodash'
import { React, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import dialogsActions from '../../../src/redux/actions/dialogs'
import DialogItem from '../../../src/components/Dialogs/DialogItem'

import { LoadingOutlined } from '@ant-design/icons'
import { Empty, Spin } from 'antd'

function Dialogs({
	items = [],
	userId,
	onSearch,
	clearSearchInput,
	fetchDialogs,
	setCurrentDialog,
	isLoading,
	currentDialog
}) {
	const [getUser_Dialog, SETgetUser_Dialog] = useState(false)

	const [filtred, setFiltred] = useState(Array.from(items))

	useEffect(() => {
		setFiltred(
			items.filter(
				dialog =>
					dialog.user.fullname
						.toLowerCase()
						.indexOf(onSearch.toLowerCase()) >= 0
			)
		)
	}, [onSearch])

	useEffect(() => {
		if (!items.length) {
			fetchDialogs()
		} else {
			setFiltred(items)
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
			)}
		</section>
	)
}

export default connect(
	({ dialogs }) => ({
		isLoading: dialogs.isLoading,
		currentDialog: dialogs.currentDialog,
		items: dialogs.items
	}),
	dialogsActions
)(Dialogs)
