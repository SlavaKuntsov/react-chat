import React, { useEffect, useState } from 'react'
import FormOutlined from '@ant-design/icons/FormOutlined'
import TeamOutlined from '@ant-design/icons/TeamOutlined'
import { Input } from 'antd'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import Dialogs from '../../components/Dialogs/Dialogs'
import Message from '../../components/Messages/Message'
import Sidebar from '../../components/Sidebar/Sidebar'
import userAction from '../../redux/actions/user'
import store from '../../redux/store'
// import dialogsActions from '../../../src/redux/actions/dialogs'

const Messenger = ({ user, data }) => {
	const [sidebarClick, setSidebarClick] = useState(false)

	const navigate = useNavigate()


	const [searchValue, setSearchValue] = React.useState('')

	const [userINfo, setUserInfo] = React.useState({
		name: 'null',
		online: null
	})

	useEffect(() => {
		store.dispatch(userAction.setIsLoading(false))
		
		document.title = 'Chat'

		// if(!data) {
		// 	navigate('/login')
		// 	return 
		// }

		return store.dispatch(userAction.fetchUserData(false))
	}, [])

	return (
		<div className='Chat w-full h-full overflow-hidden'>
			{/* {sidebarClick &&  */}
			{/* <div
				style={{
					background:
						'linear-gradient(90deg, rgba(248,250,252,0.19592849346769958) 0%, rgba(180,180,180,0.6188976811427696) 24%, rgba(119,119,119,0.6244999220391281) 61%, rgba(85,85,85,0.7813626671371674) 100%)',
					animation: 'cubic-bezier(.36,.75,.93,.56)'
				}}
				className={classNames(
					`dark h-full w-9/12 absolute right-0 top-0 duration-1000 transition-all`,
					{ 'opacity-0 z-0': !sidebarClick },
					{ 'opacity-100 z-30': sidebarClick }
				)}
			></div> */}
			{/* } */}
			<div className='chat h-full flex flex-row z-10'>
				{/* sidebar menu */}
				<Sidebar getSidebarClick={click => setSidebarClick(click)} />

				{/* dialogs list */}
				<div className='chat-sidebar w-[320px] ml-20 h-full flex flex-col gap-8 items-start'>
					<div className='info p-3 pt-4 pb-0 flex w-full flex-col gap-8 items-center'>
						<div className='dialogs-header w-full flex flex-row items-center justify-between'>
							<div className='flex flex-row gap-2 items-center'>
								<TeamOutlined
									style={{
										fontSize: '18px',
										color: 'rgb(75 85 99)'
									}}
									type='team'
								/>
								<span className='text-gray-500'>
									Список диалогов
								</span>
							</div>
							<FormOutlined
								style={{
									fontSize: '18px',
									color: 'rgb(75 85 99)'
								}}
							/>
						</div>
						<div className='search w-full'>
							<Input.Search
								placeholder='Поиск среди контактов'
								allowClear
								onChange={e => setSearchValue(e.target.value)}
								value={searchValue}
								style={{
									width: '100%'
								}}
							/>
						</div>
					</div>
					<div className='dialogs flex grow overflow-y-hidden overflow-x-hidden'>
						<Dialogs
							clearSearchInput={bool =>
								setSearchValue(bool && '')
							}
							onSearch={searchValue}
						/>
					</div>
				</div>

				{/* current dialog */}
				<div
					className={classNames(
						'chat-dialog h-full w-full flex flex-col items-center justify-center'
					)}
				>
					<Message user={user}/>
				</div>
			</div>
			{/*

			<Message
                date="Sat Apr 15 2023 04:12:59" //now date
                isMe={true}
				isReaded
                avatar="red.jpg"
                attachments={[
                    {url: "red.jpg",},
                    {url: "default.webp",},
					{url: "red.jpg",},
                ]}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Maiores, amet.
            </Message>

            <Message
                date="Sat Apr 15 2023 04:32:59"
                isMe={false}
                attachments={[
                    {url: "red.jpg",},
                    {url: "default.webp",},
					{url: "red.jpg",},
                ]}
				audio={'cat.mp3'}
            >
                Lorem ipsum dolor sit amet cMaiores, amet.
            </Message>
            <Message
                date="Sat Apr 15 2023 04:32:59"
                isMe={true}
                attachments={[
                    {url: "red.jpg",},
                    {url: "default.webp",},
					{url: "red.jpg",},
                ]}
				audio={'long.mp3'}
            >
                Lorem ipsum dolor sit amet cMaiores, amet.
            </Message> */}
		</div>
	)
}

export default connect(
	({  user }) => console.log('user ', user) || ({
		data: user.data,
		user: user
	}),
	 userAction
)(Messenger)

