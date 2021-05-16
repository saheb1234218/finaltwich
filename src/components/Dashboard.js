import '../styles/Home.module.css';
import './dasboard.css';
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';
import Navbar from './Navbar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Spinner} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TwitchNavbar from './TwitchNavbar';

export default function Dashboard(props) {

	// const [vew, setVew] = useState([]);
	const dupVew = [];
	const [vidvw, setvidvw] = useState([]);
	const [lenofvid, setLenofvid] = useState([]);
	const dupLenofvid = [];
	const [tothrs,settothrs]=useState(0);
	const [len, setlen] = useState([]);
	const [rec, setRec] = useState([]);
	const dupRec = []
	const [cr, setcr] = useState([]);
	const [isloading, setisloading] = useState(false);
	const [creat, setcreat] = useState("");
	const [vid, setvid] = useState([]);
	const [ar, setar] = useState([]);
	const [followersofuser, setfollowersofuser] = useState([]);
	const [viewsofuser, setviewsofuser] = useState([]);
	const [followersph, setfollowersph] = useState([]);
	const followersarray = [];
	const finalarray = [];
	const viewersarray = [];
	const followersperh = [];
	const viewh = [];
	const streamtime = [];
	const gamesh = [];
	const totalhours=[];
	const [totalhrs,settotalhrs]=useState([]);
	const timeframe=[]
	const [tf,settf]=useState(0);
	const { match } = props;

	useEffect(() => {
		//fetching image
		

		const fetchdata = async () => {
			
	
			//fetching videos for total hrs streamed
				const videos=await axios(`https://peaceful-wildwood-66053.herokuapp.com/sql/videoOne/${match.params.id}`);
				const xyz=videos.data;
				
				for (var q in xyz){
					var totalcount;
					for (var w in xyz[q]){
						var qwt=0;
						var totqwt;
						const time=xyz[q][w].duration
					//	console.log(time);
						for(var l in time){
							if(time[l]==='h' || time[l]==='m' || time[l]==='s'){
								if(l===0){
									continue;
								}
								if(time[l]==='h'){
							//	console.log("hour",qwt);
								totqwt=totqwt+qwt;
								qwt=0;
							}
							if(time[l]==='m'){
								//console.log("min",qwt);
								qwt=qwt/60; //converting to hrs
								totqwt=totqwt+qwt;
								qwt=0;
							}
							if(time[l]==='s'){
								
								//	console.log("sec",qwt)
								qwt=qwt/3600; //converting to hrs
								totqwt=totqwt+qwt;
								if(isNaN(totqwt)==true){
									totqwt=0;
								}
								else{
									totqwt=totqwt+qwt;
									qwt=0;
	
								}
	
								
								
								
							}
						}
							else{
							//	console.log(time[l])
								qwt=qwt*10+Number(time[l]);
							}
						}
						totqwt=totqwt.toFixed(2)
					//	console.log("tot sum",totqwt); //total hrs of a video
						totalhours.push(totqwt); //pushing in array for hrs stream chart
						totalcount=totalcount+Number(totqwt);
						if(isNaN(totalcount)==true){
							totalcount=0;
						}
						else{
						//	console.log("tot count",totalcount); //total hrs of all videos
							totqwt=0;
						}
						
	
					}
					totalcount=totalcount.toFixed(2)
					//console.log("total hours streamed",totalcount);
					settothrs(totalcount)
					//console.log("array",totalhours);
				}
	
				//followers array
				const follw=await axios.get(`https://peaceful-wildwood-66053.herokuapp.com/sql/followersOne/${match.params.id}`);
				const follwdata=follw.data;
				console.log(follwdata);
				for(var x in follwdata){
					for(var y in follwdata[x]){
						//console.log(follwdata[x][y].followed_at);
						const sl=follwdata[x][y].followed_at.slice(11,13);
						timeframe.push(Number(sl));
					}
				}
				settf(timeframe.length);
				console.log(tf);
	
			const fetchimg = await axios(
				`https://murmuring-oasis-70868.herokuapp.com/k/channelInfo/${match.params.id}`
			);
			const followers = await axios(
				`https://murmuring-oasis-70868.herokuapp.com/k/channelFollowers/${match.params.id}`
			);
			const video = await axios(`https://murmuring-oasis-70868.herokuapp.com/k/channelvideo/${match.params.id}`);

			//  const userfollows=await axios('https://murmuring-oasis-70868.herokuapp.com/k/userFollows/44322889');
			setvid(video.data.data.videos);
			console.log(vid);
			setar(fetchimg.data.data);
			for (var key in video.data.data.videos) {
				for (var key1 in video.data.data.videos[key]) {

					if (key1 === 'views') {
						dupVew.push(video.data.data.videos[key][key1])
						// setVew([...vew, video.data.data.videos[key][key1]]);
					}
					if (key1 === 'length') {
						dupLenofvid.push(video.data.data.videos[key][key1]);
						// setLenofvid([...lenofvid, video.data.data.videos[key][key1]]);
					}
					if (key1 === 'recorded_at') {
						dupRec.push(video.data.data.videos[key][key1])
						// setRec([...rec, video.data.data.videos[key][key1]]);
					}
				}

			}
			console.log("views array")
			setlen(dupLenofvid);
			setcr(dupRec);
			setvidvw(dupVew);
			// setVew(dupVew);
			// setLenofvid(dupLenofvid);
			// setRec(dupRec);
			
			// console.log(lenofvid)
			// console.log(rec)
			// console.log(vew)
			//	for (var key in followers.data) {
			//	for (var key1 in followers.data[key]) {
			//	if (Array.isArray(followers.data[key][key1]) == true) {
			//		const listofitems = [...followers.data[key][key1]];

			//		for (var x in listofitems) {
			//		for (var y in listofitems[x]) {
			//			if (
			//				typeof listofitems[x][y] === 'object' &&
			//				listofitems[x][y] !== null
			//			) {
			//finalarray.push(listofitems[x][y].display_name);
			//		}
			//		}
			//	}
			//	}
			//}
			//	}
			//console.log(finalarray);


			await axios
				.get(`https://murmuring-oasis-70868.herokuapp.com/k/userFollows/${match.params.id}`)
				.then((result) => {
					for (var key in result.data.data.follows) {
						for (var x in result.data.data.follows[key]) {
							if (
								typeof result.data.data.follows[key][x] === 'object' &&
								result.data.data.follows[key][x] !== null
							) {
								followersarray.push(result.data.data.follows[key][x].followers);
								viewersarray.push(result.data.data.follows[key][x].views);
								followersperh.push(
									Number(result.data.data.follows[key][x].followers) / 10000
								);
								viewh.push(Number(result.data.data.follows[key][x].views) / 10000);
								streamtime.push(
									Number(result.data.data.follows[key][x].followers) - 300
								);
								gamesh.push(
									Number(result.data.data.follows[key][x].followers) - 30000
								);
							}
						}
					}

					//console.log(followersarray);
					setfollowersofuser(followersarray);
					setviewsofuser(viewersarray);

					const ctx = document.getElementById('mybarChart');
					new Chart(ctx, {
						type: 'bar',
						data: {
							labels: [
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
							],
							datasets: [
								{
									data: totalhours,
									label: 'Hours Streamed',
									
									backgroundColor: [
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
									],
									borderColor: [
										'Red',
										'Blue',
										'Yellow',
										'Green',
										'Purple',
										'Red',
										'Blue',
										'Yellow',
										'Green',
										'Purple',
										'Red',
										'Blue',
										'Yellow',
										'Green',
										'Purple',
										'Red',
										'Blue',
										'Yellow',
										'Green',
										'Purple',
										'Red',
										'Blue',
										'Yellow',
										'Green',
										'Purple',
									],
									borderWidth: 1,
								},
							],
						},
					});
					const ctx2 = document.getElementById('mylineChart');
					new Chart(ctx2, {
						type: 'line',
						data: {
							labels: [
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
							],
							datasets: [
								{
									label: 'Followers',
									data: followersarray,
									backgroundColor: [
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
									],
									borderColor: [
										'Red',
										'Blue',
										'Yellow',
										'Green',
										'Purple',
										'Red',
										'Blue',
										'Yellow',
										'Green',
										'Purple',
										'Red',
										'Blue',
										'Yellow',
										'Green',
										'Purple',
										'Red',
										'Blue',
										'Yellow',
										'Green',
										'Purple',
										'Red',
										'Blue',
										'Yellow',
										'Green',
										'Purple',
									],
									borderWidth: 1,
								},
							],
						},
					});
					const ctx1 = document.getElementById('mypieChart');
					new Chart(ctx1, {
						type: 'bar',
						data: {
							labels: [
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
							],
							datasets: [
								{
									label: 'Followers per hour',
									data: timeframe,
									backgroundColor: [
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
									],
									borderColor: [
										'Red',
										'Blue',
										'Yellow',
										'Green',
										'Purple',
										'Red',
										'Blue',
										'Yellow',
										'Green',
										'Purple',
										'Red',
										'Blue',
										'Yellow',
										'Green',
										'Purple',
										'Red',
										'Blue',
										'Yellow',
										'Green',
										'Purple',
										'Red',
										'Blue',
										'Yellow',
										'Green',
										'Purple',
									],
									borderWidth: 1,
								},
							],
						},
					});

					const ctx3 = document.getElementById('myline2Chart');
					new Chart(ctx3, {
						type: 'line',
						data: {
							labels: [
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
							],
							datasets: [
								{
									label: 'Viewers Count',
									data: viewh,
									backgroundColor: [
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
										'Blue',
									],
									borderColor: [
										'Red',
										'Blue',
										'Yellow',
										'Green',
										'Purple',
										'Orange',
									],
									borderWidth: 1,
								},
							],
						},
						options: {
							responsive: true,
							maintainAspectRatio: false,
						},
					});
					const ctx4 = document.getElementById('mybar2Chart');
					new Chart(ctx4, {
						type: 'bar',
						data: {
							labels: [
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
								'',
							],
							datasets: [
								{
									label: 'Viewers and Stream Time Dynamic',
									data: streamtime,
									backgroundColor: [
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
										'Pink',
									],
									borderColor: [
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
										'Red',
									],
									borderWidth: 0,
								},
							],
						},
						options: {
							responsive: true,
							maintainAspectRatio: false,
						},
					});
					const ctx5 = document.getElementById('mypie2Chart');
					new Chart(ctx5, {
						type: 'doughnut',
						data: {
							labels: [
								'Live Views',
								'Followers',
								'Time',
								'Average',
								
							],
							datasets: [
								{
									label: 'Videos streamed',
									data: gamesh,
									backgroundColor: [
										'Red',
										'Orange',
										'#990099',
										'#0066ff',
										'Red',
										'Orange',
										'#990099',
										'#0066ff',
										'Red',
										'Orange',
										'#990099',
										'#0066ff',
										'Red',
										'Orange',
										'Purple',
										'#0066ff',
										'Red',
										'Orange',
										'#990099',
										'#0066ff',
										'Red',
										'Orange',
										'#990099',
										'#0066ff',
										'Red',
										
										
									],
									borderColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
									borderWidth: 1,
								},
							],
						},
						options: {
							responsive: true,
							maintainAspectRatio: true,
						},
					});
				})
				.catch((err) => {
					console.log(err);
				});
		};
		fetchdata();
	}, []);


	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
			}}
		>
			<TwitchNavbar id={match.params.id} />
			<div
				style={{
					justifyContent: 'center',
					display: 'flex',
					flexWrap: 'wrap',
					flexDirection: 'row',
				}}
			>
				
				<div
				//hours streamed found from videos durations
					style={{
						zIndex:'10',
						borderRadius: '10px',
						border: '2px solid grey',
						boxShadow: '0 0 10px #2c3e50',
						margin: '40px 10px 40px 10px',
						width: '360px',
						height: '230px',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<h3 style={{marginLeft:'20px',color:'#0099ff'}}>{tothrs} Hrs</h3>
					<canvas id='mybarChart' width='360' height='200' />
				</div>
				<div
					style={{
						border: '2px solid grey',
						boxShadow: '0 0 10px #2c3e50',
						borderRadius: '10px',
						margin: '40px 20px 40px 20px',
						width: '360px',
						height: '230px',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
				<h3 style={{marginLeft:'20px',color:'#0099ff'}}>{Math.ceil(ar.followers/1000)} K</h3>
					<canvas id='mylineChart' width='360' height='200' />
				</div>
				<div
					style={{
						border: '2px solid grey',
						boxShadow: '0 0 10px #2c3e50',
						borderRadius: '10px',
						margin: '40px 20px 40px 20px',
						width: '360px',
						height: '230px',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<h3 style={{marginLeft:'20px',color:'#00cc99'}}>{tf} p/Hr</h3>
					<canvas id='mypieChart' width='360' height='200' />
				</div>
			</div>
			<div
				style={{
					
					border: '2px solid grey',
						boxShadow: '0 0 10px #2c3e50',
					// marginLeft: '30px',
					alignItems: 'center',
					borderRadius: '10px',
					// margin: '40px 20px 40px 20px',
					margin: '40px auto',
					// padding: '1.5rem',
					width: '87%',
					height: '50vh',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<canvas id='myline2Chart' width='1200' height='200' />
			</div>
			<div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
				<h5 style={{margin:'0px 20px 0px -400px'}}>Recent Video Streams</h5>
			<h7 style={{marginLeft:'-400px', fontWeight:'bold',color:'#18bc9c'}}>Stream Time</h7>	
			<h7 style={{marginLeft:'-400px', fontWeight:'bold',color:'#3498db'}}>Followers</h7>	
			<h7 style={{ marginLeft:'-400px', fontWeight:'bold',color:'#2c3e50'}}>Max Viewers</h7>	
			</div>
			
		<div style={{
			
    	lineHeight: '1', 
		margin:'30px 80px 10px 80px',
		 backgroundColor: 'white',display:'flex',flexWrap:'wrap', flexDirection:'row',justifyContent:'space-between'}}>
			
				{vidvw.map((y, index) => (
					<div style={{
						border: '2px solid grey',
						boxShadow: '0 0 10px #2c3e50',
						
						position: 'relative',
						overflow: 'hidden',
						backgroundColor: '#ecf0f1',
						boxShadow: '0 0 7px #2c3e50',
						color: '#2c3e50',
						borderRadius:'5px',
						margin:'2px 1px 10px 1px',display:'flex',flexDirection:'row'}}>
						<h5 style={{backgroundColor:'#18bc9c',width:'220px'}}>{cr[index]}</h5>
						<h5 style={{backgroundColor:'#3498db',width:'100px'}}>{y}</h5>
						<h5 style={{backgroundColor:'#2c3e50',width:'70px',color:'white'}}>{len[index]}</h5>
						
					</div>
					))}
			</div>
			

			<div
				style={{
					
					// marginLeft: '30px',
					alignItems: 'center',
					borderRadius: '10px',
					// margin: '40px 20px 40px 20px',
					margin: '30px 10px 20px 550px',
					width: '50%',
					height: '30vh',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>

				<canvas
					// style={{ marginLeft: '320px' }}
					id='mybar2Chart'
					width='900px'
					height='200'
				/>
			</div>
		
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						boxShadow: '0 0 10px #2c3e50',
						display: 'flex',
						border:'2px solid grey',
						flexDirection: 'column',
						//justifyContent:'center',
						//alignItems:'center',
						borderRadius: '10px',
						alignItems: 'center',
						// marginLeft: '50px',
						margin:'-210px 15px 30px 70px',
						width: '400px',
						height: '570px',
						backgroundColor: 'white',
					}}
				>
					<h4 style={{paddingTop:'10px',backgroundColor:'#d6d6c2' ,paddingLeft:'100px', width:'400px',height:'60px',borderRadius:'10px'}}>Streamer Profile</h4>


					<img
						src={ar.logo}
						style={{
							margin: '5px 0px 10px 0px',
							width: '110px',
							height: '110px',
							borderRadius: '50%',
						}}
					></img>


					<h3>{ar.display_name}</h3>
					<h1 style={{backgroundColor:'black',height:'10px'}}></h1>
					<h10 style={{displaay:'flex',flexDirection:'row', margin: '20px 0px 20px -10px' }}>
						
						<h10 style={{marginRight:'100px'}}>Followers</h10>
						<h10> AvgViewers</h10>          
					</h10>
					<h5 style={{displaay:'flex',flexDirection:'row', margin: '5x 0px 20px -10px' }}>
						<h10 style={{marginRight:'90px' ,color:'#18bc9c'}}>{ar.followers}</h10>
						<h10 style={{color:'#3498db'}}>{ar.views}</h10>
					</h5>
					<h10 style={{displaay:'flex',flexDirection:'row', margin: '20px 0px 20px -10px' }}>
						
						<h10 style={{marginRight:'100px'}}>Language</h10>
						<h10> Created At</h10>          
					</h10>
					<h5 style={{displaay:'flex',flexDirection:'row', margin: '5x 0px 20px -10px' }}>
						<h10 style={{marginRight:'0px' ,color:'#18bc9c'}}>English</h10>
						<h10 style={{color:'#3498db',marginLeft:'50px'}}>{ar.created_at}</h10>
					</h5>
					<br></br>
					<h5 style={{marginLeft:'20px'}}>{ar.description}</h5>
				</div>
				<div >
					
				<div
					style={{
						border: '2px solid white',
						boxShadow: '0 0 10px #2c3e50',
						
						borderRadius:'10px',
						// margin: '40px 0px 40px 100px',
						margin: '40px 450px 30px 5px',
						maxWidth: '400px',
						width: '50%',
						height: '300px',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<h4 style={{marginLeft:'100px',marginBottom:'30px'}}>Games Streamed</h4>{' '}
					<canvas id='mypie2Chart' width='560' height='310' margin='10px 0px 10px 0px' />
				</div>
				<div style={{
						border: '2px solid white',
						boxShadow: '0 0 10px #2c3e50',
						borderRadius:'10px',
						// margin: '40px 0px 40px 100px',
						margin: '-330px 0px 0px 430px',
						maxWidth: '400px',
						width: '50%',
						height: '300px',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
						<h5 style={{marginTop:'-5px',marginLeft:'-2px',paddingTop:'10px',backgroundColor:'#d6d6c2' ,paddingLeft:'130px', width:'400px',height:'50px',borderRadius:'10px'}}>Average Stream</h5>
						<div style={{display:'flex',flexDirection:'column'}}>
						<h7 style={{margin:'20px 0px 30px 20px',color:'#18bc9c',fontWeight:'bold'}}>Games Streamed</h7>
						<h7 style={{margin:'0px 0px 30px 20px',color:'#009999',fontWeight:'bold'}}>Live Views</h7>
						<h7 style={{margin:'0px 0px 30px 20px',color:'#18bc9c',fontWeight:'bold'}}>Followers</h7>
						<h7 style={{margin:'0px 0px 0px 20px', color:'#009999',fontWeight:'bold'}}>Total games played</h7>
						</div>
				</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}