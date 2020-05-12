import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Card } from 'antd';
import './App.css';
import param from './images/param.png';
import Header from './Header.js';
import chooseRoom from './images/chooseRoom.jpg';

class Home extends Component{
    render(){
      return(
        <div className="App">
          <Header />
          {/* <div className="theRight">
                    <img className="bedroomImg" src={chooseRoom}/>
                </div> */}
          <div >
          
              <NavLink to="/Rooms">
                <button className='btn'>Rooms</button>
                {/* <Card title="Rooms" bordered={true} style={{ width: 300 }}>
                    <img className="img" src={chooseRoom}></img>
                </Card> */}
              </NavLink>
            
    
            
              <NavLink to="/Setting">
              <button className='btn'>Setting</button>
                {/* <Card title="Setting" bordered={true} style={{ width: 300 }}>
                    <img className="img" src={param}></img>
                </Card> */}
              </NavLink>
            
          </div>
            
        </div>
      );
    }
  }
  

export default Home;
