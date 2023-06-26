import React, { useEffect } from 'react'

import AllBubl from '../../components/AllBubl'
import StartBlock from '../../components/StartBlock'

import { ChatIcon } from '@chakra-ui/icons'
import { TbLogout2 } from 'react-icons/tb'
import { IconUserCircle } from '@tabler/icons-react'

export default function Home(props) {
	useEffect(() => {
		document.title = 'Home'
	}, [])

	return (
		<>
			<AllBubl />

			<div className='cards flex row gap-20 h-full items-center'>
				<StartBlock text='Log Out' link='/login' click={true}>
					<TbLogout2
						style={{ width: '25px', height: '25px', color: '#5b5b5b' }}
					/>
				</StartBlock>
				<StartBlock text='Messenger' place='top' link='/messenger'>
					<ChatIcon boxSize={24} color='#5b5b5b' />
				</StartBlock>
				<StartBlock text='My Profile' link='/profile'>
					<IconUserCircle size={25} color='#5b5b5b'/>
				</StartBlock>
			</div>
		</>
	)
}
