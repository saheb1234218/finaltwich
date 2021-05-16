import React from "react";
import {Link} from 'react-router-dom';
import styles from "../styles/Home.module.css"

export default function Navbar() {
    return (
        <div style={{display:'flex', alignItems:'center',justifyContent:'center',backgroundColor:'rgba(6, 12, 49, 0.95)'}} className={styles.navbar}>
            
                <p style={{marginLeft:'20px',fontSize:'23px'}} className={styles.navbar_name}>Twitch Tracker</p>
                <Link style={{color:'white'}} to="/">Home</Link>
        </div>
    );
}
