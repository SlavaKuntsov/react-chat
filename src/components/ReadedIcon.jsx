import React from 'react'
import PropTypes from "prop-types";

import ReadSvg from "../../src/assets/icons/read.svg";
import SentSvg from "../../src/assets/icons/sent.svg";
import UnreadedSvg from '../../src/assets/icons/unreaded.svg'
import classNames from 'classnames';


const ReadedIcon = ({isMe, isReaded, unReaded, isChat}) => {
	return(
		isMe ?
			(isReaded ? 
				(<img className="w-5 h-5 pointer-events-none" src={ReadSvg} alt="read" />) 
			: 
				(<img className="w-5 h-5 pointer-events-none" src={SentSvg} alt="sent" />)
			)
		:
			(!isChat && unReaded > 0 &&
			<span className={classNames(
				'unreaded bg-red-500 rounded-full h-5 min-w-[18px] px-1 flex items-center justify-center lg:text-xs text-[10px] text-white pointer-events-none',
				{'-ml-2' : unReaded && unReaded > 99}
			)}>
				{unReaded && unReaded <= 99 ?
					unReaded
					:
					'99+'
				}
			</span>)
	)
	
} 

ReadedIcon.propTypes = {
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool,
    unReaded: PropTypes.number,
    isChat: PropTypes.bool,
};


export default ReadedIcon;