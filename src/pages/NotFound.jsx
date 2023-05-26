import React, {useEffect} from 'react'

export default function NotFound (props) {

	useEffect(() => {
		document.title = '404 - NotFound';
	}, [])
	
	return (
		<h1>
			404 not found
		</h1>
	)
};

