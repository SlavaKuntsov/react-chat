import React from 'react'
import PropTypes from "prop-types";

import generateAvatarsFromHash from '../utils/helpers/generateAvatarsFromHash';

const Avatar = ({children ,avatar, fullname, _id}) => {
	console.log('avatar fullname: ', fullname);
	console.log('_id: ', _id.length);
	if(avatar) {
		return (
			<div
				style={{"--image-url": `url('../../../src/assets/avatars/${avatar}')`,}}
				className="avatar rounded-full lg:w-12 lg:h-12 w-10 h-10 bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-top bg-center relative"
			>{children}</div>
		)
	}
	if(avatar === null || avatar === "") {
		const {color, lighten} = generateAvatarsFromHash(_id)
		const firstChar = fullname.charAt(0)
		return <div 
			className={`avatar-empty rounded-full shrink-0 lg:w-12 lg:h-12 w-10 h-10 flex items-center justify-center relative text-white lg:text-xl text-lg uppercase`}
			style={{backgroundImage: `linear-gradient(135deg, ${color} 00%, ${lighten} 90%)`}}
		>
			{firstChar}
			{children}
		</div>
	}
}

Avatar.propTypes = {
	// children: PropTypes.object,
	user: PropTypes.object,
	_id: PropTypes.string,
};

export default Avatar;