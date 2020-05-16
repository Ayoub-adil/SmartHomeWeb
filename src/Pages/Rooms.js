import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row,Divider, Button} from 'antd';
import '../App.css';
import bedroom from '../images/bedroom.png';
import bedroom2 from '../images/bedroom2.png';
import kitchen from '../images/kitchen.png';
import livingroom from '../images/livingroom.png';
import Header from './Header.js';

class Rooms extends Component{
    constructor(props){
        super(props);
        this.state={
        }
        this.getplan();
        this.getplan=this.getplan.bind(this);
      }
      
    getplan(){
    fetch('/plan').then(res=>res.json()).then(data=>{
        this.setState({ plan: data.plan })
        console.log(this.state.plan);
    })
    }
    
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
                    {/* <NavLink to="/kitchen"> 
                    <img className="imgRoom" src={kitchen}></img>
                    </NavLink> */}
                    <form method='post' action='/setRoom'>
                        <input name='typeofroom' type='text' value='kitchen' hidden></input>
                        <button name='rooom' type='submit' value={0}>
                            <img className="imgRoom" src={kitchen}></img>
                        </button>
                    </form>  
                   </Col> 
                   <Col className="gutter-row" span={12}>  
                    {/* <NavLink to="/Bedroom"> 
                        <button name='rooom' type='submit' value={8}>
                    </NavLink> */}
                    <form method='post' action='/setRoom'>
                        <input name='typeofroom' type='text' value='bedroom' hidden></input>
                        <button name='rooom' type='submit' value={0}>
                            <img className="imgRoom" src={bedroom}></img>
                        </button>
                    </form>
                   </Col>   
                </Row>
                <Row>                   
                   <Col className="gutter-row" span={12}>  
                   {/* <NavLink to="/LivingRoom">
                   <img className="imgRoom" src={livingroom}></img>   
                   </NavLink> */}
                    <form method='post' action='/setRoom'>
                        <input name='typeofroom' type='text' value='livingroom' hidden></input>
                        <button name='rooom' type='submit' value={0}>
                            <img className="imgRoom" src={livingroom}></img>
                        </button>
                    </form> 
                   </Col>
                   <Col className="gutter-row" span={12}>  
                   <form method='post' action='/setRoom'>
                        <input name='typeofroom' type='text' value='bedroom' hidden></input>
                        <button name='rooom' type='submit' value={1}>
                            <img className="imgRoom" src={bedroom2}></img>
                        </button>
                    </form> 
                   {/* <NavLink to="/Bedroom2">  
                   <img className="imgRoom" src={bedroom2}></img>
                   </NavLink> */}
                   </Col>
                   
                </Row>
            </div>

            
        );    
    }

}

export default Rooms;


