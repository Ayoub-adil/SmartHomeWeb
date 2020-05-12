import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row,Divider} from 'antd';
import './App.css';
import bedroom from './images/bedroom.png';
import bedroom2 from './images/bedroom2.png';
import kitchen from './images/kitchen.png';
import livingroom from './images/livingroom.png';
import Header from './Header.js';

const style = { background: '#007bff', padding: '8px 0' };

class Rooms extends Component{
    render(){
        return(
            <div className="App">
                <Header />
                <div className='Rooms'>

                </div>
               <Divider orientation="left">
                   <h1>Hello <span className="smarthome">User</span></h1>
               </Divider>
               
               <Row>
                   
                   <Col className="gutter-row" span={12}>  
                   <NavLink to="/kitchen"> 
                   <img className="imgRoom" src={kitchen}></img>
                   </NavLink>
                   </Col>
                   
                   <Col className="gutter-row" span={12}>    
                   <NavLink to="/Bedroom"> 
                   <img className="imgRoom" src={bedroom}></img>
                   </NavLink>
                   </Col>
                   
                </Row>

                <Row>                   
                
                   <Col className="gutter-row" span={12}>  
                   <NavLink to="/LivingRoom">
                   <img className="imgRoom" src={livingroom}></img>   
                   </NavLink>
                   </Col>
                   
                   <Col className="gutter-row" span={12}>  
                   <NavLink to="/Bedroom2">  
                   <img className="imgRoom" src={bedroom2}></img>
                   </NavLink>
                   </Col>
                   
                </Row>
            </div>

            
        );
    }
}

export default Rooms;
