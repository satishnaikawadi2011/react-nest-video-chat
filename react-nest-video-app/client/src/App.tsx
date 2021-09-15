import { Col, Row } from 'antd';
import React from 'react';
import './App.css';
import AppIconButton from './components/AppIconButton';
import VideoIcon from './icons/Video';
import CallEnd from './icons/CallEnd';
import DesktopIcon from './icons/Desktop';
import AudioIcon from './icons/Audio';

import chatVidSrc from './assets/chat.mp4';

function App() {
	return (
		<React.Fragment>
			<Row gutter={16} justify="space-around" style={{ height: '95vh', margin: '1rem', overflow: 'hidden' }}>
				<Col span={16}>
					<Row
						style={{
							borderRadius: 25,
							height: '78%',
							marginBottom: 10,
							position: 'relative'
						}}
					>
						<video
							width="100%"
							height="100%"
							style={{
								borderRadius: 25,
								objectFit: 'cover'
							}}
							autoPlay
							loop
							muted
							// src="https://player.vimeo.com/external/403132019.hd.mp4?s=63b545caee921b1c0e5450798c99418b42e3532f&profile_id=173&oauth2_token_id=57447761"
						>
							<source src={chatVidSrc} />
						</video>
						<div
							style={{
								position: 'absolute',
								bottom: 0,
								right: 0,
								width: 125,
								height: 125,
								// backgroundColor: 'black',
								margin: 10,
								borderRadius: 25
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
									borderStyle: 'solid'
								}}
								autoPlay
								loop
								muted
								// src="https://player.vimeo.com/external/403132019.hd.mp4?s=63b545caee921b1c0e5450798c99418b42e3532f&profile_id=173&oauth2_token_id=57447761"
							>
								<source src={chatVidSrc} />
							</video>
						</div>
					</Row>
					<Row style={{ backgroundColor: '#d9d9d9', borderRadius: 25, height: '20%' }} justify="center">
						<AppIconButton title="Cam" icon={<VideoIcon height={30} width={30} />} />
						<AppIconButton title="Mic" icon={<AudioIcon height={30} width={30} />} />
						<AppIconButton title="Share" icon={<DesktopIcon height={30} width={30} />} />
						<AppIconButton title="Leave" icon={<CallEnd height={30} width={30} />} />
					</Row>
				</Col>
				<Col style={{ backgroundColor: '#d9d9d9', borderRadius: 25 }} span={6}>
					Text Chat
				</Col>
			</Row>
		</React.Fragment>
	);
}

export default App;
