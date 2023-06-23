import { HamburgerIcon } from '@chakra-ui/icons'
import classNames from 'classnames'
import React, { useState } from 'react'

import { TbLogout2 } from 'react-icons/tb'

import TextWrapper from './TextWrapper'
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

			<div className='sidebar-logout w-full flex row items-center absolute bottom-4 left-3'>
				<div className="icon min-w-10">
					<TbLogout2 
						style={{ color: 'white', fontSize: '24px', width: '28px' }} 
					/>
				</div>
				<TextWrapper>
					<SidebarText click={sidebarClick}>
						Logout
					</SidebarText>
				</TextWrapper>
			</div>
		</div>
	)
}
