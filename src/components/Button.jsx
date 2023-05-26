import React from 'react'
import { Button as BaseButton } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";

const Button = props => (
	<BaseButton
		{...props}
		className={
			classNames(
				"button", 
				props.className, 
				{"button--large": props.size === "large"},
				"bg-blue-500 w-full "
			)
		}
	/>
);	

Button.propTypes = {
	className: PropTypes.string
};

export default Button;