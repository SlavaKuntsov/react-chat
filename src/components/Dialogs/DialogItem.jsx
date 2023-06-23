import format from 'date-fns/format'
import isThisYear from 'date-fns/isThisYear'
import isToday from 'date-fns/isToday'
import { React, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'

import classNames from 'classnames'
import Avatar from '../../../src/components/Avatar'
import ReadedIcon from '../../components/ReadedIcon'
import dialogsActions from '../../redux/actions/dialogs'

const DialogItem = ({
	unreaded,
	isMe = true,
	lastMessageTime,
	text,
	_id,
	isReaded,
	clearSearchInput,
	selectDialog,
	currentDialog,
	avatar = 'red.jpg',
	isOnline = false,
	currentDialogId,
	currentDialogName,
	setCurrent,
	setName
}) => {
	setName(currentDialogId)

	const getLastMessageTime = lastMessage => {
		if (isToday(lastMessage)) {
			return format(lastMessage, 'HH:mm')
		} else {
			if (isThisYear(lastMessage)) {
				return format(lastMessage, 'dd.MM')
			} else {
				return format(lastMessage, 'dd.MM.yyyy')
			}
		}
	}

	const ref = useRef(null)
	const [boolWidth, setBoolWidth] = useState(false)

	useEffect(() => {
		ref.current.offsetWidth < 297 ? setBoolWidth(true) : setBoolWidth(false)
	}, [])

	function useOnceCall(cb, condition = true) {
		const isCalledRef = useRef(false)

		useEffect(() => {
			if (condition && !isCalledRef.current) {
				isCalledRef.current = true
				cb()
			}
		}, [cb, condition])
	}

	useOnceCall(() => {
		// store.dispatch(
		// 	userAction.setCurrentDialog({ id: null, data: currentDialogId })
		// )
		setCurrent(null, null)
	})

	return (
		<div
			ket={_id}
			ref={ref}
			className={classNames(
				'dialog-item flex flex-row gap-3 items-center relative shadow-sm p-4 w-full h-20 rounded-md justify-between cursor-pointer transition-colors duration-300 ease-in-out border-solid border-2',
				{
					'border-solid border-blue-300 border-2 shadow-md shadow-blue-100':
						currentDialog === _id
				},
				{
					'bg-white hover:bg-slate-200 border-white hover:border-slate-200':
						currentDialog !== _id
				}
			)}
			onClick={() => {
				selectDialog(_id)
				clearSearchInput(true)
				// store.dispatch(dialogAction.fetchCurrent(_id))

				setCurrent(_id, currentDialogId)
				// getUser(_id)
			}}
		>
			<Avatar avatar={null} fullname={currentDialogId} _id={_id}>
				{isOnline && (
					<span className='is-online absolute right-0  bottom-0 h-4 w-4 rounded-full bg-lime-500 border-[3px] border-solid border-white'></span>
				)}
				{isOnline && (
					<span className='is-online absolute right-0  bottom-0 h-4 w-4 rounded-full bg-lime-500 border-[3px] border-solid border-white'></span>
				)}
			</Avatar>
			<div className='info flex flex-col gap-0 lg:gap-1 justify-between grow'>
				<div className='top  grow-0 shrink flex flex-row justify-between gap-2 items-start'>
					<h5 className='fullname font-semibold lg:text-md text-sm'>
						{currentDialogId}
					</h5>
					<span className='last-message text-gray-500 lg:leading-3 leading-[8px] font-light lg:text-sm text-xs'>
						{getLastMessageTime(Date.parse(lastMessageTime))}
					</span>
				</div>
				<div className='bottom flex grow-0 flex-row justify-between gap-2 items-center'>
					{text ? (
						<p
							className={classNames(
								'grow truncate leading-5 lg:text-sm text-xs text-gray-600',
								{
									'lg:w-[190px] w-[160px]': boolWidth,
									'w-[200px]': !boolWidth
								}
							)}
						>
							{text}
						</p>
					) : (
						<p>...</p>
					)}

					{
						<ReadedIcon
							isChat={false}
							unReaded={unreaded}
							isMe={isMe}
							isReaded={isReaded}
						/>
					}
				</div>
			</div>
		</div>
	)
}

// export default DialogItem

export default connect(
	({ dialogs }) => console.log() || {
			currentDialogName: dialogs.currentDialogData
		},
	dialogsActions
)(DialogItem)
