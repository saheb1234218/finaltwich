import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
	return (
		<div className='App'>
			<Navbar />
			<Leaderboard />
			<Footer />
		</div>
	);
}

export default App;