import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import '../App.css';
import Smarthome from '../images/home.png';

class Landing extends Component{

  restart()
	{
    fetch('/SuperAdmin/message')
  }
  
  render(){
    return(
      <div className="App">
      <div className='welcome'>
      <h1 className='titlee'>Welcome to <span className="smarthome">Smarthome</span></h1>
      <p>Let's manage your smart home NOW!</p>
    </div>
    <div className="smartH_img">
      <img className='img' src={Smarthome}></img>
    </div>

    <div className='btnStart'>
         <Link to="/SignIn"><Button type="primary" onClick={this.restart} shape="round">Get Started</Button></Link>
         <Link style={{marginLeft:25}} to="/login"><Button onClick={this.restart} type="primary" shape="round">Company Space</Button></Link>
         <Link style={{marginLeft:25}} to="/About"><Button onClick={this.restart} type="primary" shape="round">Promotion</Button></Link>
    </div>

    </div>
    );
  }
}

export default Landing;
