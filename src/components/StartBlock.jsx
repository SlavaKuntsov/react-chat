import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames'
import userAction from '../redux/actions/user'
import store from '../redux/store'

export default function StartBlock({ children, link, click, place, text }) {
	const removeAuth = () => {
		if (click) {
			console.log(2)
			store.dispatch(userAction.removeAuth())
		}
	}

	const [hover, setHover] = useState(false)
	console.log('hover: ', hover)

	return (
		<Link
			onMouseOver={() => setHover(true)}
			onMouseOut={() => setHover(false)}
			to={link}
			style={{ backgroundColor: 'rgba(248, 250, 252,0.5)' }}
			className={classNames(
				'start-block w-80 h-44 border-slate-200 border-solid border-2 rounded-3xl z-10 flex justify-center items-center relative',
				{ 'mb-44': place === 'top' },
				{ 'mb-20': place !== 'top' }
			)}
			onClick={() => {
				console.log(link)
				removeAuth()
			}}
		>
			{/* <div
				className='blur-bg w-full h-full blur-md absolute top-0 left-0 rounded-3xl z-0'
				style={{backdropFilter: 'blur(0px)'}}
			></div> */}
			<h2
				className={classNames(
					'transition-all duration-500 ease-in-out absolute font-semibold text-2xl text-[#5b5b5b]',
					{ 'opacity-0 -top-2': !hover },
					{ 'opacity-100 top-7': hover }
				)}
			>
				{text}
			</h2>
			<div
				className={classNames(
					'icon transition-all duration-500 ease-in-out',
					{ 'translate-y-6 scale-125 opacity-100': hover },
					{ 'opacity-60': !hover }
				)}
			>
				{children}
			</div>
		</Link>
	)
}
