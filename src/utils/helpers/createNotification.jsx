import { notification } from 'antd';


export default ({type, title, text}) => {
	notification[type]({
		message: title,
		description: text,
		duration: 3
	});
}