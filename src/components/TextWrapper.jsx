import React from 'react'
import classNames from 'classnames'

export default function TextWrapper ({children, delay}) {
	
	return (
		<div className={
			classNames(
				'text-wrap',
				{ 'w-[200px] ml-4 text-center': delay === 100},
				{ 'w-[230px] text-center': delay !== 100},
				)
		}>
			{children}
		</div>
	)
};

