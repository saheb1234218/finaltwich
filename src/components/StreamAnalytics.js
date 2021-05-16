import React, { useState, useEffect } from 'react';
import './StreamAnalytics.css';
import axios from 'axios';

import TwitchNavbar from './TwitchNavbar';

const StreamAnalytics = (props) => {
	const { match } = props;
	const [streamInformation, setStreamInformation] = useState([]);
	useEffect(() => {
		const fetchData = async (id) => {
			try {
				const fetchedInformation = await axios(
					`https://murmuring-oasis-70868.herokuapp.com/k/streamUser/${id}`
				);
				setStreamInformation(fetchedInformation);
				console.log(fetchedInformation);
			} catch (error) {
				console.log('Oops an error while fetching stream information', error);
			}
		};
		fetchData(match.params.id);
	}, []);
	return (
		<div className='StreamAnalytics'>
			<TwitchNavbar id={match.params.id} />
			<h1>All Stream information for a particular user will come here</h1>
		</div>
	);
};

export default StreamAnalytics;
