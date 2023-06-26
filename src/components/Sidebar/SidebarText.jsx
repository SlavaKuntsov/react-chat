import React from 'react'
import classNames from 'classnames'

export default function SidebarText({ children, click, delay }) {
	return (
		<h3
			className={classNames(
				' duration-500 transition-opacity ease-in-out whitespace-nowrap font-bold text-white text-lg',
				{ 'opacity-0 delay-75': !click },
				{ 'opacity-100 delay-200': click },
				{ '': delay === 100 && click}
			)}
		>
			{children}
		</h3>
	)
}
