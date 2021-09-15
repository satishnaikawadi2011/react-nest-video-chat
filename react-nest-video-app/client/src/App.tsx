import { Col, Row } from 'antd';
import React from 'react';
import './App.css';
import AppIconButton from './components/AppIconButton';
import VideoIcon from './icons/Video';
import CallEnd from './icons/CallEnd';
import DesktopIcon from './icons/Desktop';
import AudioIcon from './icons/Audio';

function App() {
	return (
		<React.Fragment>
			<Row gutter={16} justify="space-around" style={{ height: '95vh', margin: '1rem', overflow: 'hidden' }}>
				<Col span={16}>
					<Row style={{ backgroundColor: 'red', borderRadius: 25, height: '78%', marginBottom: 10 }}>
						Video
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
