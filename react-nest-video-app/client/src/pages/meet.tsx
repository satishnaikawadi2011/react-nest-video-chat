// import { Col, Row } from 'antd';
import { Button, message } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import AppLoader from '../animations/components/AppLoader';
import Video from '../components/video/Video';
import VideoContext from '../context/VideoContext';

const Meet = () => {
	const { leaveCall }: any = useContext(VideoContext);

	useEffect(() => {
		if (window.performance) {
			console.info("window.performance work's fine on this browser");
		}
		if (performance.navigation.type === 1) {
			leaveCall();
			window.location.replace('http://localhost:3000/');
		}
		else {
			console.info('This page is not reloaded');
		}
	}, []);
	const location: any = useLocation();
	if (!location.state || location.state.from !== 'home') {
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
					width: '100vw',
					flexDirection: 'column'
				}}
			>
				<Button type="primary" onClick={() => window.location.replace('http://localhost:3000/')}>
					Go Back
				</Button>
				<AppLoader />;
			</div>
		);
	}

	return (
		<React.Fragment>
			<div
				style={{
					height: '100vh',
					// backgroundColor: 'blue',
					padding: 0,
					overflow: 'hidden'
				}}
			>
				<Video />
			</div>
		</React.Fragment>
	);
};

export default Meet;
