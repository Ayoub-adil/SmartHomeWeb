import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Alert, Input, Button} from 'antd';
import ImgErr from '../images/3819285.jpg';
import '../App.css';

class ServerError extends Component{
    render(){
      return( 
      <div className="App" style={{textAlign:"center"}}>
          <h1 className="Err">The server is down, try again later.</h1>
          <Link to="/Home"><button className="btnErr" >Go Home!</button> </Link> <br/>
          <img className="imgErr" src={ImgErr}></img>
      </div>
);
}
}

export default ServerError;
