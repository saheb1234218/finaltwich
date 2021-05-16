import React, { useState, useEffect } from 'react';
import './TwitchNavbar.css';

import axios from 'axios';
import { Link } from 'react-router-dom';

const TwitchNavbar = (props) => {
	const [imgurl, setimgurl] = useState(null);
	const { id } = props;
	const [name,setname]=useState("");
	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchimg = await axios(
					`https://murmuring-oasis-70868.herokuapp.com/k/user/${id}`
				);
				setimgurl(fetchimg.data.data);
				setname(fetchimg.data.data.display_name)
				console.log(fetchimg.data);
			} catch (error) {
				console.log('Oops an error while fetching user image', error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="topbar"
			//style={{
			//	width: '100%',
			//	height: '150px',
			//	alignItems: 'center',
			//	display: 'flex',
			//	backgroundColor: 'rgba(6, 12, 49, 0.95)',
			//	marginBottom: '2rem',
		//	}}
		>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				{/* {imgurl.map((im, index) => {
					return (
						<div key={index}>
							<img
								src={imgurl[0].profile_image_url}
								style={{
									marginLeft: '20px',
									width: '120px',
									height: '120px',
									borderRadius: '50%',
								}}
							/>
						</div>
					);
				})} */}
				<div>
					<img
						src={imgurl ? imgurl.logo : null}
						style={{
							marginLeft: '20px',
							width: '120px',
							height: '120px',
							borderRadius: '50%',
						}}
					/>
				</div>
				<h2 style={{ margin: '30px 20px 10px 20px', color: 'white' }}>
					<Link to='/'>{name}</Link>{' '}
				</h2>
			</div>
			<div
				style={{
					margin: '80px 0px 0px 0px',
					display: 'flex',
					flexDirection: 'row',
					color: 'white',
				}}
			>
				<h4
					className='overview'
					style={{
						// marginRight: '0.1rem',
						padding: '10px 10px 10px 10px',
						borderRadius: '10px',
					}}
				>
					<Link to={`/dashboard/${id}`}>Overview</Link>
				</h4>
				<h4
					className='overview'
					style={{
						// marginLeft: '0.1rem',
						padding: '10px 10px 10px 10px',
						borderRadius: '10px',
					}}
				>
					<Link to={`/streams/${id}`}>Streams</Link>
				</h4>
			</div>
		</div>
	);
};

export default TwitchNavbar;