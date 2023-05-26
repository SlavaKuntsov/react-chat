import PropTypes from 'prop-types'
import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Empty } from 'antd';
import EllipsisOutlined from "@ant-design/icons/EllipsisOutlined";

import ChatInput from "../../components/ChatInput";
import Status from "../../components/Status";
import NewMessage from './NewMessage'
import messagesActions from '../../../src/redux/actions/message'

function Message({ currentDialog, fetchMessages, items, isLoading }) {

	const antIcon = (
		<LoadingOutlined
			style={{
				fontSize: 32,
			}}
			spin
		/>
	);

	useEffect(() => {
		if (currentDialog) {
			fetchMessages(currentDialog)
		}
	}, [currentDialog])

	const messagesRef = useRef(null);
	
	useEffect(() => {
		if(currentDialog) {
			messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
		}
	}, [items]);

	if(currentDialog) {
		return (
	<>
		<div className="chat-header px-3 pt-4 pb-0 mb-3 grow flex flex-col gap-1 justify-center items-center">
			<h3 className="username font-semibold">
				{/* {userINfo.name} */}
				slava
			</h3>
			<Status userINfo={true} />
			<EllipsisOutlined
				style={{
					fontSize: "22px",
					color: "rgb(75 85 99)",
				}}
				className="absolute top-5 right-5"
			/>
		</div>
		<div 
			ref={messagesRef}
			className={
				classNames(
					'chat-message h-full w-full px-4 overflow-y-auto overflow-x-hidden flex flex-col gap-3',
					{'messages-loading items-center justify-center': isLoading || !items.length}
				)
			}
		>
			{isLoading  ?
				<Spin tip="Загрузка" indicator={antIcon} />
			: 
				items && !isLoading && (
					items.length > 0 ?
						items.map((item) => <NewMessage {...item}/>)
					:
						<Empty 
							description='Сообщений нет' 
							image={Empty.PRESENTED_IMAGE_SIMPLE} 
							// image={Empty.PRESENTED_IMAGE_DEFAULT} 
						/>
				)
			}
		</div>
		<ChatInput />
	</>
		)
	}

	return (
		// <h2 className="lg:text-base text-sm font-semibold lg:py-3 lg:px-5 px-4 py-2 bg-gray-200 rounded-lg text-gray-600">
        //     Выберите кому хотите написать
        // </h2>
		<Empty 
			description='Выберите кому хотите написать' 
			// image={Empty.PRESENTED_IMAGE_SIMPLE} 
			image={Empty.PRESENTED_IMAGE_DEFAULT} 
		/>
	)
}

Message.defaultProps = {
	user: {}
}

Message.propTypes = {
	text: PropTypes.string,
	avatar: PropTypes.string,
	date: PropTypes.string,
	user: PropTypes.object,
	attachments: PropTypes.array,
	isMe: PropTypes.bool,
	isTyping: PropTypes.bool,
	isReaded: PropTypes.bool
}

export default connect(
	({ dialogs, message }) => ({
		currentDialog: dialogs.currentDialog,
		items: message.items,
		isLoading: message.isLoading
	}),
	messagesActions
)(Message)
