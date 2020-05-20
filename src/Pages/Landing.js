import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import '../App.css';
import Smarthome from '../images/home.png';

class Landing extends Component{
  render(){
    return(
      <div className="App">
      <div className='welcome'>
      <h1>Welcome to <span className="smarthome">Smarthome</span></h1>
      <p>Let's manage your smart home</p>
    </div>
    <div className="smartH_img">
      <img className='img' src={Smarthome}></img>
    </div>

    <div className='btnStart'>
         <Link to="/SignIn"><Button type="primary" shape="round">Get Started</Button></Link>
         <Link style={{marginLeft:15}} to="/login"><Button type="primary" shape="round">Espace Société</Button></Link>
    </div>
    </div>
    );
  }
}

export default Landing;
