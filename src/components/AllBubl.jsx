import React from 'react'

import { ReactComponent as YourSvgLite } from '../assets/bubl/blob2.svg';
import { ReactComponent as YourSvg1 } from '../assets/bubl/blob1.svg';
import { ReactComponent as YourSvg } from '../assets/bubl/blob (2).svg';

export default function AllBubl (props) {
	
	return (
		<>
			<YourSvg1 className='bubl w-52 absolute top-12 left-0 z-0'/>
			<YourSvg className='bubl w-96 absolute -bottom-32 left-56 z-0'/>
			<YourSvgLite className='bubl w-[480px] absolute top-32 right-20 z-0'/>
		</>
	)
};

