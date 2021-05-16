import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Dashboard from './components/Dashboard';
import StreamAnalytics from './components/StreamAnalytics';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<Route path='/' exact={true} component={App}></Route>
		{/* <Route path='/dashboard' component={Dashboard}></Route> */}
		<Route path='/dashboard/:id' render={(routeProps) => <Dashboard {...routeProps} />}></Route>
		<Route path='/streams/:id' render={(routeProps) => <StreamAnalytics {...routeProps} />}></Route>
	</BrowserRouter>,

	document.getElementById('root')
);
