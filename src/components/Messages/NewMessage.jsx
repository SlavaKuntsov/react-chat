import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import Avatar from '../Avatar'
import convertToTime from '../../utils/helpers/convertToTime'
import ReadedIcon from '../ReadedIcon'
import Time from '../Time'

import PlusCircleFilled from '@ant-design/icons/PlusCircleFilled'
import PauseSvg from '../../../src/assets/icons/pause.svg'
import PlaySvg from '../../../src/assets/icons/play.svg'
import WaveVoiceBlack from '../../../src/assets/icons/wave-black.svg'
import WaveVoice from '../../../src/assets/icons/wave.svg'


export default function NewMessage({
	text,
	avatar,
	date,
	audio,
	user,
	created_at,
	attachments,
	isReaded,
	isTyping,
	_id,
	dialog,
	item,
	author,
	isMe
}) {
	const [isPlaying, setIsPlaying] = useState(false)
	const [progress, setProgress] = useState(0)
	const [currentTime, setCurrentTime] = useState(0)
	const audioElem = useRef(null)

	const playAudio = () => {
		if (!isPlaying) {
			audioElem.current.play()
		} else {
			audioElem.current.pause()
		}
	}

	useEffect(() => {
		if (audioElem.current !== null) {
			audioElem.current.addEventListener(
				'playing',
				function () {
					setIsPlaying(true)
				},
				false
			)
			audioElem.current.addEventListener(
				'ended',
				function () {
					setIsPlaying(false)
					setProgress(0)
				},
				false
			)
			audioElem.current.addEventListener(
				'pause',
				function () {
					setIsPlaying(false)
				},
				false
			)
			audioElem.current.addEventListener(
				'timeupdate',
				function () {
					const duration =
						(audioElem.current && audioElem.current.duration) || 0
					setCurrentTime(audioElem.current.currentTime)
					setProgress(
						(audioElem.current.currentTime / duration) * 100
					)
				},
				false
			)
		}
	}, [isPlaying, setIsPlaying])

	return (
		<div
			key={_id}
			className={classNames(
				'message flex gap-2 shrink items-end',
				{ 'flex-row': isMe === false },
				{ 'flex-row-reverse': isMe === true },
				{
					'items-end': !text && attachments && attachments.length < 2
				},
				{ 'items-end': text }
			)}
		>
			{/* <img
                className="avatar rounded-full h-12"
                src={`../../../src/assets/avatars/${avatar}`}
                alt={`User ${user.fullname}`}
            /> */}
			{/* <div
				style={{
					'--image-url': `url('../../../src/assets/avatars/${avatar}')`
				}}
				className='avatar rounded-full w-12 h-12 bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-top bg-center'
			></div> */}


			{/* <div className="avatar-container mb-6">
				<Avatar avatar="" fullname="slava" _id={_id}/>
			</div> */}
			<div
				className={classNames(
					'message-info flex flex-col ',
					{ 'items-start': isMe === false },
					{ 'items-end': isMe === true }
				)}
			>
				<div
					className={classNames(
						'top items-end flex gap-2',
						{ 'flex-row': isMe === false },
						{ 'flex-row-reverse': isMe === true }
					)}
				>
					{/* ================= */}
					{!text && attachments ? (
						<div
							className={classNames(
								'only-attachments flex flex-row gap-1 flex-wrap max-w-xs',
								{ 'justify-end': isMe, 'justify-start': !isMe }
							)}
						>
							{attachments.map((item, id) => {
								return (
									<div
										style={{
											'--image-url': `url('../../../src/assets/avatars/${item.url}')`
										}}
										className={classNames(
											'image bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-top bg-center rounded-md pointer-events-none',
											{
												'h-52 w-52':
													attachments.length < 2,
												'h-12 w-12':
													attachments.length >= 2
											}
										)}
										key={id}
									></div>
								)
							})}
						</div>
					) : (
						<div
							className={classNames(
								'text px-4 py-3 rounded-t-xl lg:leading-relaxed leading-snug lg:max-w-xs max-w-[280px] relative z-10 overflow-hidden lg:text-base text-sm',
								{
									'bg-blue-100 text-white rounded-br-xl':
										isTyping,
									'bg-blue-500 text-white rounded-br-xl':
										isMe === false && text,
									'bg-slate-200 text-black rounded-bl-xl':
										isMe === true,
									'w-72 py-4 cursor-pointer bg-blue-500 rounded-br-xl': audio
								}
							)}
							onClick={audio && playAudio}
						>
							{!isTyping ? (
								audio ? (
									<>
										<audio
											ref={audioElem}
											src={`../../src/assets/audio/${audio}`}
											preload='auto'
										/>
										<div
											className={classNames(
												'background bg-blue-400 h-full absolute top-0 left-0 rounded-t-xl -z-20 transition-all duration-300',
												{
													'rounded-br-xl':
														isMe === false,
													'rounded-bl-xl bg-slate-300':
														isMe
												}
											)}
											style={{ width: `${progress}%` }}
										></div>
										<div className='text flex flex-row gap-2 items-center justify-between z-30'>
											<button
												className={classNames(
													'voice-btn bg-blue-700 rounded-full p-3',
													{ 'bg-gray-500': isMe }
												)}
											>
												<img
													className='w-4 h-4 pointer-events-none'
													src={
														isPlaying
															? PauseSvg
															: PlaySvg
													}
													alt='pause'
												/>
											</button>
											<img
												className={classNames(
													'pointer-events-none',
													{
														'animate-pulse':
															isPlaying
													}
												)}
												src={
													isMe
														? WaveVoiceBlack
														: WaveVoice
												}
												alt='voice'
											/>
											<span
												className={classNames(
													'text-slate-300 font-semibold text-sm',
													{ 'text-slate-600': isMe }
												)}
											>
												{convertToTime(currentTime)}
											</span>
										</div>
									</>
								) : (
									text
								)
							) : (
								<div className='flex flex-row gap-1 p-1'>
									{[1, 2, 3].map(item => {
										return (
											<span
												key={item}
												className={classNames(
													'h-2 w-2 bg-gray-400 rounded-full',
													{
														'animate-[wave_2.5s_ease-in-out_infinite]':
															item === 1,
														'animate-[wave_2.5s_ease-in-out_infinite_.7s]':
															item === 2,
														'animate-[wave_2.5s_ease-in-out_infinite_1.4s]':
															item === 3
													}
												)}
											></span>
										)
									})}
								</div>
							)}
						</div>
					)}
					{/* ============== */}
					{attachments && text && !audio && (
						<div className='attachments flex flex-row gap-1'>
							{attachments.map((item, id) => {
								return attachments.length > 3 ? (
									id === 0 && (
										<div
											className='one-attachment relative'
											key={id}
										>
											<div
												style={{
													'--image-url': `url('../../../src/assets/avatars/${
														id === 0 && item.url
													}')`
												}}
												className='image bg-[image:var(--image-url)] bg-no-repeat lg:h-12 lg:w-12 h-10 w-10 bg-cover bg-top bg-center rounded-md'
											></div>
											<PlusCircleFilled
												className='absolute -bottom-1 -left-1'
												style={{
													fontSize: '18px',
													color: 'rgb(226 232 240)'
												}}
											/>
										</div>
									)
								) : (
									<div
										style={{
											'--image-url': `url('../../../src/assets/avatars/${item.url}')`
										}}
										className='image bg-[image:var(--image-url)] bg-no-repeat h-12 w-12 bg-cover bg-top bg-center rounded-md'
										key={id}
									></div>
								)
							})}
						</div>
					)}
					<ReadedIcon isChat isMe={isMe} isReaded={isReaded} />
				</div>
				<span className='lg:text-sm text-xs text-gray-400 mt-1'>
					{date && <Time date={date} />}
				</span>
			</div>
		</div>
	)
}
