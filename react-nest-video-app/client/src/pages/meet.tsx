// import { Col, Row } from 'antd';
import { Button, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import AppLoader from '../animations/components/AppLoader';
import Video from '../components/video/Video';
import VideoContext from '../context/VideoContext';

const Meet = () => {
	const vidState = useContext(VideoContext)!;
	const [
		isPageRefreshed,
		setIsPageRefreshed
	] = useState(false);

	useEffect(() => {
		if (performance.navigation.type === 1 && isPageRefreshed) {
			vidState.leaveCall();
			window.location.replace('http://localhost:3000/');
		}
		return () => {
			setIsPageRefreshed(false);
		};
	}, []);
	const location: any = useLocation();
	// console.log(location);
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
