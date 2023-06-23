import { React, useState } from 'react'
import PropTypes from "prop-types";

import { Input } from 'antd';
import SmileOutlined from '@ant-design/icons/SmileOutlined';
import AudioOutlined from '@ant-design/icons/AudioOutlined';
import SendOutlined from '@ant-design/icons/SendOutlined';
import CameraOutlined from '@ant-design/icons/CameraOutlined';

import { UploadField } from '@navjobs/upload'
import data from '@emoji-mart/data/sets/14/apple.json'
import Picker from'@emoji-mart/react'
import { init } from 'emoji-mart'

init({ data })

export default function ChatInput () {
	
	const [inputValue, setInputValue] = useState('');
	// console.log('inputValue: ', inputValue);
	const [visibleEmojiPicker, setVisibleEmojiPicker] = useState(false);

	const styleBtn = {fontSize: '18px', color: 'rgb(107 114 128 / .9)'};

	return (
		<div className="chat-message-input w-[96%] lg:py-4 py-2 flex flex-row gap-4 justify-between items-center">

			<div className="smile-btn cursor-pointer relative">
				<SmileOutlined className='hover' style={styleBtn} onClick={() => setVisibleEmojiPicker(!visibleEmojiPicker)}/>
				{
					visibleEmojiPicker && 
						<div className="emoji-picker absolute bottom-10 z-50">
							<Picker 
								data={data} 
								onEmojiSelect={data => setInputValue(inputValue + data.native)} 
								previewPosition='none'
								locale='ru'
								emojiSize='22'
								theme='light'
								searchPosition='static'
								emojiButtonSize='30'
								set='apple'
								maxFrequentRows='3'
							/>
						</div>
				}
			</div>

			<Input 
				size='medium' 
				onChange={e => setInputValue(e.target.value)} 
				placeholder="Basic usage" 
				value={inputValue}
			/>

			<UploadField
				onFiles={files => console.log(files)}
					containerProps={{
						className: 'files pr-1 z-10 cursor-pointer'
					}}
					uploadProps={{
						accept: '.png,.jpg,.jpeg,.gif,.bmp',
						multiple: 'multiple'
					}}
			>
				<CameraOutlined className='hover' style={styleBtn} />
			</UploadField>

			<div className="send-or-audio hover cursor-pointer">
				{inputValue === '' ?
					<AudioOutlined style={styleBtn} />	
				:
					<SendOutlined style={styleBtn} onClick={() => console.log("inputValue res: ", inputValue)}/>	
				}
			</div>

		</div>
	)
};

ChatInput.propTypes = {
	userINfo: PropTypes.object
};
