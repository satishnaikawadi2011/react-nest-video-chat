import { Avatar, Col, Row } from 'antd';
import React, { useContext, useEffect, useRef } from 'react';
import AppIconButton from '../AppIconButton';
import VideoIcon from '../../icons/Video';
import CallEnd from '../../icons/CallEnd';
import DesktopIcon from '../../icons/Desktop';
import AudioIcon from '../../icons/Audio';
import { Redirect } from 'react-router-dom';

// import chatVidSrc from '../../assets/chat.mp4';
import VideoContext from '../../context/VideoContext';
import VideoOffIcon from '../../icons/VideoOff';
import AudioOff from '../../icons/AudioOff';
import { UserOutlined } from '@ant-design/icons';
import Chat from '../chat/Chat';
import { useHistory } from 'react-router';

const Video = () => {
	const history = useHistory();
	const {
		stream,
		otherUserName,
		name,
		otherUserStream,
		myVdoStatus,
		handleScreenSharing,
		userVdoStatus,
		updateVideo,
		myMicStatus,
		updateMic,
		leaveCall,
		chat,
		call
	}: any = useContext(VideoContext);
	const userV = useRef<HTMLVideoElement>(null);
	const myV = useRef<HTMLVideoElement>(null);
	useEffect(
		() => {
			if (stream && myV.current) {
				myV.current.srcObject = stream;
			}

			if (otherUserStream && userV.current) {
				userV.current.srcObject = otherUserStream;
			}
		},
		[
			stream,
			otherUserStream
		]
	);

	return (
		<React.Fragment>
			<Row
				gutter={16}
				justify="space-around"
				style={{
					height: '100%',
					margin: '1rem',
					overflowX: 'hidden'
				}}
			>
				{stream && (
					<Col
						span={16}
						style={{
							marginTop:

									chat.length ? 25 :
									0
						}}
					>
						<Row
							style={{
								borderRadius: 25,
								// height: '78%',
								height: '72vh',
								// backgroundColor: 'red',
								margin: 10,
								position: 'relative',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								borderColor: 'black',
								borderStyle: 'solid',
								borderWidth: 5,
								overflow: 'hidden'
							}}
						>
							<video
								width="100%"
								height="100%"
								style={{
									borderRadius: 25,
									objectFit: 'cover',
									opacity:

											userVdoStatus ? 1 :
											0
								}}
								autoPlay
								loop
								muted
								playsInline
								ref={userV}
							/>{' '}
							:
							<Avatar
								style={{
									backgroundColor: '#116',
									position: 'absolute',
									opacity:
										`${
											userVdoStatus ? '0' :
											'1'}`
								}}
								size={98}
								icon={!otherUserName && <UserOutlined />}
							>
								{otherUserName}
							</Avatar>
							<div
								style={{
									position: 'absolute',
									bottom: 0,
									right: 0,
									width: 125,
									height: 125,
									backgroundColor: 'white',
									margin: 10,
									borderRadius: 25,
									borderColor:

											myVdoStatus ? 'white' :
											'black',
									borderWidth: 2,
									borderStyle: 'solid'
								}}
							>
								<video
									width="100%"
									height="100%"
									style={{
										borderRadius: 25,
										objectFit: 'cover',
										borderColor: 'white',
										borderWidth: 2,
										borderStyle: 'solid',
										opacity:
											`${
												myVdoStatus ? 1 :
												0}`
									}}
									autoPlay
									loop
									muted
									playsInline
									ref={myV}
								/>
								<Avatar
									style={{
										backgroundColor: '#116',
										position: 'absolute',
										right: '50%',
										top: '50%',
										transform: 'translate(50%,-50%)',
										opacity:
											`${
												myVdoStatus ? 0 :
												1}`
									}}
									size={50}
									icon={!name && <UserOutlined />}
								>
									{name}
								</Avatar>
							</div>
						</Row>
						<Row style={{ backgroundColor: '#d9d9d9', borderRadius: 25, height: '20%' }} justify="center">
							<AppIconButton
								title="Cam"
								onClick={() => {
									updateVideo();
								}}
								icon={

										myVdoStatus ? <VideoIcon height={30} width={30} /> :
										<VideoOffIcon height={30} width={30} />
								}
							/>
							<AppIconButton
								title="Mic"
								onClick={() => {
									updateMic();
								}}
								icon={

										myMicStatus ? <AudioIcon height={30} width={30} /> :
										<AudioOff height={30} width={30} />
								}
							/>
							<AppIconButton
								title="Share"
								onClick={() => handleScreenSharing()}
								icon={<DesktopIcon height={30} width={30} />}
							/>
							<AppIconButton
								title="Leave"
								onClick={() => {
									leaveCall();
									history.push('/');
									window.location.reload();
								}}
								backgroundColor="red"
								icon={<CallEnd height={30} width={30} />}
							/>
						</Row>
					</Col>
				)}
				<Chat />
			</Row>
		</React.Fragment>
	);
};

export default Video;
