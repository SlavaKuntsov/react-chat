import React from 'react'
import classNames from "classnames";
import PropTypes from "prop-types";

export default function Status ({userINfo}) {
	
	return (
		<div className="user-online flex flex-row gap-1 items-center">
			<span className={classNames(
				'status rounded-full mt-1 w-2 h-2',
				{'bg-lime-500' : userINfo.online,
				'bg-red-500' : userINfo.online === false || userINfo.online === undefined}
			)}></span>
			<p className="status-text text-gray-600">{userINfo.online === false || userINfo.online === undefined ? 'offline' : 'online'}</p>
		</div>
	)
};

Status.propTypes = {
	userINfo: PropTypes.bool
};