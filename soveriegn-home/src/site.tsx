import portrait from './Michael.jpg';
import React from 'react';
import './site.css';
import { Link } from 'react-router-dom'

const site = () => {
    
    document.body.style.backgroundColor = "#CAFBFC";
    //TODO
    //document.textAlign = "center";
    
    return (
        <div>
        <div id="text-box" className = "title">Hello <br /> My name is Michael Christopher Scantlebury</div>

        <img src = {portrait} className = "michael" style = {{alignSelf: "center"}}/>

        <div id="text-box" className = "intro">To learn more about me (that is if you want to, not to trying to pear pressure you or anything...). Please check out the links below</div>

        <Link to = "/gamer" className= "gameLink">My Gamer Tag</Link>
        </div>
    );
    
}

export default site;