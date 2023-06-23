import { HamburgerIcon } from '@chakra-ui/icons'
import classNames from 'classnames'
import React, { useState } from 'react'
import { Link } from "react-router-dom";

import userAction from '../../redux/actions/user'
import dialogsActions from '../../redux/actions/dialogs'
import store from '../../redux/store'

import { TbLogout2 } from 'react-icons/tb'

import TextWrapper from '../TextWrapper'
import SidebarText from './SidebarText'

export default function Sidebar({ getSidebarClick }) {
	const [sidebarClick, setSidebarClick] = useState(false)

	getSidebarClick(sidebarClick)

	return (
		<div
			className={classNames(
				`sidebar-animated top-0 left-0  bg-blue-300 z-50 flex flex-col gap-14 py-4 m-3 rounded-lg absolute duration-1000 transition-all pl-4`,
				{ 'w-[300px] items-start': sidebarClick },
				{ 'w-16 items-center': !sidebarClick }
			)}
			style={{
				animation: 'cubic-bezier(.36,.75,.93,.56)',
				height: 'calc(100% - 24px)'
			}}
		>
			<div className='sidebar-icon w-full flex row items-center'>
				<HamburgerIcon
					// className='icon absolute top-4 left-4'
					w={28}
					h={25}
					onClick={() => setSidebarClick(prev => !prev)}
					color='white'
				/>
				<TextWrapper>
					<SidebarText click={sidebarClick}>
						React Chat
					</SidebarText>
				</TextWrapper>
			</div>

			<Link 
				to={
					sidebarClick && '/login'
				}
				className={
					classNames(
						'sidebar-logout flex row items-center absolute bottom-3 py-1 duration-500 transition-all rounded-lg',
						{ 'hover:px-1 hover:bg-red-200 left-2 px-1': sidebarClick },
						{ ' left-3': !sidebarClick }
					)
				}
				style={{ width: 'calc(100% - 16px'}}
				onClick={() => {
					if (sidebarClick) {
						store.dispatch(userAction.removeAuth())
						store.dispatch(dialogsActions.removeDialogs())
					}
				}}
			>
				<div className="icon min-w-10">
					<TbLogout2 
						className={
							classNames(
								'text-2xl',
								{ 'text-lg': sidebarClick },
								{ '': !sidebarClick }
							)
						}
						style={{ color: 'white', width: '28px' }} 
					/>
				</div>
				<TextWrapper>
					<SidebarText click={sidebarClick}>
						Logout
					</SidebarText>
				</TextWrapper>
			</Link>
		</div>
	)
}
