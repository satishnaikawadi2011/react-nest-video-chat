import { Col, Row } from 'antd';
import React from 'react';
import './App.css';
import VideoState from './context/VideoState';
import Home from './pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Meet from './pages/meet';

function App() {
	return (
		<React.Fragment>
			<Router>
				<VideoState>
					<Switch>
						<Route path="/" component={Home} exact />
						<Route path="/meet" component={Meet} exact />
					</Switch>
				</VideoState>
			</Router>
		</React.Fragment>
	);
}

export default App;
