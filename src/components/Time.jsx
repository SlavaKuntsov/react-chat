import React from 'react'
import classNames from "classnames";
import PropTypes from "prop-types";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ru } from 'date-fns/locale'


const Time = ({date}) => formatDistanceToNow(Date.parse(date), {locale: ru, addSuffix: true} )

Time.propTypes = {
	className: PropTypes.string
};

export default Time;