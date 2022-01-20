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

        <div id="text-box" className = "intro">Below is the link to the checkers game I coded while learning React and Typescript. I had a lot of fun while coding it and will definitely revist it sometime in the future</div>

        <Link to = "/game" className= "gameLink">Checkers Game</Link>
        
        </div>
    );
    
}

export default site;