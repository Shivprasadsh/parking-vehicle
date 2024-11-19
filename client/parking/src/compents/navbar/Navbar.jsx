import React from 'react';
import './navbar.css';

function Navbar() {
    return (
        <div className='main-nav'>
            <div className='sub-nav'>
               <div className='regis-nav'>
                   <h1>Parking Registration</h1>
               </div> 
               <div className='links'>
               <a href="/">Parking Slots</a>
               <a href="summary">Summary</a> 
               </div>
                
            </div>
        </div>
    );
}

export default Navbar;
