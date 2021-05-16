import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import './Leaderboard.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Row,Col,Container,Spinner} from 'react-bootstrap';
const axios = require('axios');

const url = 'https://peaceful-wildwood-66053.herokuapp.com/twitch/leaderboard';

const profileimage= 'https://peaceful-wildwood-66053.herokuapp.com/sql/userinfoAll';
export default function Leaderboard({ users }) {
	/*
    data ==> whole data
    pageData == > varry pagenumber
    const var pagenumber
    */
   const [newpic,setnewpic]=useState([])
   const [loading,setloading]=useState(false);
   const [page,setpage]=useState(0);
   const[prevp,setprevp]=useState(0);
	const [data, setData] = useState([]);
    //search state for storing search item
    const [searchterm, setsearchterm] = useState('');
    //storing the 10 datas for each page in states
    const [finaldata, setfinaldata] = useState([]);

    //storing it in array of objects for filtering and sorting
    let store = [...finaldata];
    //getting the image url from api
   
    
    //pagination
    //pagination
    const pagination = (pageNumber) => {
		setprevp(pageNumber)
		const pn=page;
		console.log(pageNumber)
		console.log(prevp)
		if(prevp-pageNumber==1)
		{
			setpage(pn-1)
		}
		if(pageNumber==2  ){
			setpage(pn+1)
		}
		else if(pageNumber==1)
		{
			setpage(pn-1)
		}       // pno == 1 prev == 0
        var prevPage = 10 * (page - 1);
        var currentPage = 10 * page;
        const newData = data.slice(prevPage, currentPage);
        setfinaldata(newData);
		console.log(page)
    };


    
    // GET request function to your Mock API

    // Calling the function on component mount
    useEffect(async () => {
        // await fetchInventory();
		setloading(true);
        await axios
            .get(url)
            .then((result) => {
           //   console.log(result.data.success)
                const newData = result.data.success.slice(0, 10);
                setfinaldata(newData);
				const data1=result.data.success;
                // setData(newData);
                setData(newData);
				if(result.data.success.length>10){
					setpage(1);
				}
				}).catch((err)=>{
					console.log(err);
				})
 



              
		  await axios.get(profileimage).then((resppic)=>{
			  
			
			 setnewpic(resppic.data.success);
			 console.log(newpic);
		  }).catch((ering)=>{
			  console.log(ering);
		  })

         
      setloading(false);
	
    }, []);

	
	useEffect(() => {
		showSearchedResults();
	}, [searchterm]);

	const showSearchedResults = () => {
		const searchedResults = !searchterm
			? data
			: data.filter((val) => val.handler.toLowerCase().includes(searchterm.toLowerCase()));
		setfinaldata(searchedResults);
	};

	return (
		loading?
		<div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100vw',height:'100vh'}}>
			<Spinner animation="border" variant="primary" style={{width:'80px',height:'80px',}}></Spinner>
			<h4>Page Loading......</h4>
		</div>:
		<div
			class='container'
			class={styles.box}
			
		>
			{/* SEARCH AND SORT */}

			<div>
				<nav style={{ margin: '5px 0px 20px 0px' }} class='navbar navbar-expand-lg'>
					<button
						class='navbar-toggler'
						type='button'
						data-toggle='collapse'
						data-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span class='navbar-toggler-icon'></span>
					</button>

					<div class='collapse navbar-collapse' id='navbarSupportedContent'>
						<ul class='navbar-nav mr-auto'>
							{/*searching input*/}
							<li style={{ margin: '0px 20px  0px 10px' }} class='nav-item  active'>
							<input
									type='text'
									placeholder='Search By Name'
									style={{
										color: 'black',
										width: '300px',
										alignSelf: 'center',
										alignItems: 'center',
										justifyContent: 'center',
										border: '2px black solid',
										borderRadius: '20px',
									}}
									onChange={(e) => {
										setsearchterm(e.target.value);
									}}
								></input>
							</li>
							<li class='nav-item '>
								<b style={{ color: 'black' }} class='nav-link'>
									Sort By
								</b>
							</li>

							<li style={{ margin: '0px 20px 0px 20px ' }} class='nav-item '>
								{/*sorting algorithm */}
								<a
									style={{cursor:'pointer', color: 'white', borderRadius: '10px' }}
									class='nav-link bg-dark'
									onClick={() => {
										store.sort((a, b) => {
											if (a.followers < b.followers) return 1;
											if (a.followers > b.followers) return -1;
											else return 0;
										});
										setfinaldata(store);
									}}
								>
									Followers
								</a>
							</li>
							<li style={{ margin: '0px 20px 0px 20px ' }} class='nav-item'>
								<a
									style={{cursor:'pointer', color: 'white', borderRadius: '10px' }}
									class='nav-link bg-dark'
									onClick={() => {
										store.sort((a, b) => {
											if (a.avgView < b.avgView) return 1;
											if (a.avgView > b.avgView) return -1;
											else return 0;
										});
										setfinaldata(store);
									}}
								>
									Average Viewers
								</a>
							</li>
							<li
								style={{cursor:'pointer', margin: '0px 20px  0px 20px ', borderRadius: '5px' }}
								class='nav-item '
							>
								<a
									style={{ color: 'white', borderRadius: '10px' }}
									class='nav-link bg-dark'
									onClick={() => {
										store.sort((a, b) => {
											if (a.peakView < b.peakView) return 1;
											if (a.peakView > b.peakView) return -1;
											else return 0;
										});
										setfinaldata(store);
									}}
								>
									Peak Traffic
								</a>
							</li>
							<li
								style={{cursor:'pointer',
									margin: '0px 20px  0px 20px ',
									alignItems: 'center',
									borderRadius: '5px',
								}}
								class='nav-item '
							>
								<a
									style={{ color: 'white', borderRadius: '10px' }}
									class='nav-link  bg-dark'
									href='#'
								>
									Status
								</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>

			{/* TABLE  */}
			<div class='table-responsive container-fluid'>
				<table class='table table-borderless'>
					<thead class='thead-dark'>
						<tr class='table-secondary'>
							<th scope='col'>Rank</th>
							<th scope='col'>Twitch Handle</th>
							<th scope='col'>Followers</th>
							<th scope='col'>Average Viewers</th>
							<th scope='col'>Peak Viewers</th>
						</tr>
					</thead>
					<tbody>
						{/*mapping through finaldata where the current set of 10 datas are stored */}
						{finaldata.map((item, index) => (
							<tr
								key={index}
								class='table'
								class={styles.tablerow}
								
							>
								<th className='myrow' scope='row'>
									#{index + 1}
								</th>
								<td style={{ display: 'flex', flexDirection: 'row' }}>
									<div key={index}>
										
										<img
											src={newpic[index].image}
											// src='https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg'
											style={{
												width: '40px',
												height: '40px',
												margin: '0px 10px 0px 0px',
												border: '2px solid black',
												borderRadius: '5px',
											}}
										></img>
									</div>

									<Link
										onClick={() => {
											return console.log(item.id);
										}}
										style={{ color: 'black' }}
										to={`/dashboard/${item.id}`}
									>
										{item.handler}
									</Link>
								</td>

								<td>{item.followers}</td>
								<td>{item.avgView}</td>
								<td>{item.peakView}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* PAGINATION */}
			<div>
				<nav
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'row',
						fontWeight: 'bolder',
					}}
					aria-label='Page navigation example'
				>
					<ul class='pagination '>
						<li class='page-item' onClick={() => pagination(1)}>
							<a style={{visibility:page==0?'hidden':'visible'}} class='page-link' href='#'>
								Previous
							</a>
						</li>
						<li class='page-item' onClick={() => pagination(2)}>
							<a style={{visibility:page==0?'hidden':'visible'}} class='page-link' href='#'>
								Next
							</a>
						</li>
					</ul>
				</nav>
			</div>
			
		</div>
		
	);
}



