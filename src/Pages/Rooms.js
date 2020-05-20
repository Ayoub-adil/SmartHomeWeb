import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row,Divider} from 'antd';
import '../App.css';
import bedroom from '../images/bedroom.png';
import kitchen from '../images/kitchen.png';
import livingroom from '../images/livingroom.png';
import Header from './Header.js';

class Rooms extends Component{
    
    constructor(props){
        super(props);
        this.state={
            plan:'homeSweetHome',
        }
        this.getplan();
        this.getplan=this.getplan.bind(this);

        // let card =[]
        // _.times(this.state.plan.bedroom,(i)=>card.push(<span key={i}>*</span>))
        

    }
      
    getplan(){
    fetch('/home/plan').then(res=>res.json()).then(data=>{
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


                {/* {this.state.plan.bedroom} */}
                <h1>Bedrooms</h1>
                <Row>
                {[...Array(this.state.plan.bedroom)].map((e,i)=>

                <>
                    <Col 
                    className="gutter-row" 
                    // span={this.state.plan.bedroom%2===0?24/this.state.plan.bedroom:25/this.state.plan.bedroom}
                    span={Math.floor(24/this.state.plan.bedroom)}
                    // xs={12}
                    // sm={8}
                    // md={6}
                    // lg={4}
                    // xl={2}
                    >  
                   <form method='post' action='/change/room'>
                        <input name='typeofroom' type='text' value='bedroom' hidden></input>
                        <button name='rooom' type='submit' value={i}>
                            {i}
                            <img className="imgRoom" src={bedroom} alt="bedroom"></img>
                        </button>
                    </form> 
                   {/* <NavLink to="/Bedroom2">  
                   <img className="imgRoom" src={bedroom2}></img>
                   </NavLink> */}
                   </Col>
                
                
                </>
                )}
                </Row>

                <h1>livingrooms</h1>
                <Row>
                {[...Array(this.state.plan.livingroom)].map((e,i)=>
                <>
                    <Col 
                    className="gutter-row" 
                    // span={this.state.plan.livingroom%2===0?24/this.state.plan.livingroom:25/this.state.plan.livingroom}
                    span={Math.floor(24/this.state.plan.livingroom)}
                    // flex={1}
                    // xs={12}
                    // sm={8}
                    // md={6}
                    // lg={4}
                    // xl={2}
                    >  
                   {/* <NavLink to="/LivingRoom">
                   <img className="imgRoom" src={livingroom}></img>   
                   </NavLink> */}
                    <form method='post' action='/change/room'>
                        <input name='typeofroom' type='text' value='livingroom' hidden></input>
                        <button name='rooom' type='submit' value={i}>
                            {i}
                            <img className="imgRoom" src={livingroom} alt="livingroom"></img>
                        </button>
                    </form> 
                   </Col>
                </>
                )}
                </Row>

                <h1>kitchens</h1>
                <Row>
                {[...Array(this.state.plan.kitchen)].map((e,i)=>
                <>
                    <Col
                    // className="gutter-row" 
                    // span={this.state.plan.kitchen%2===0?24/this.state.plan.kitchen:25/this.state.plan.kitchen}
                    span={Math.floor(24/this.state.plan.kitchen)}
                    // xs={12}
                    // sm={8}
                    // md={6}
                    // lg={4}
                    // xl={2}
                    >  
                    {/* <NavLink to="/kitchen"> 
                    <img className="imgRoom" src={kitchen}></img>
                    </NavLink> */}
                    <form method='post' action='/change/room'>
                        <input name='typeofroom' type='text' value='kitchen' hidden></input>
                        <button name='rooom' type='submit' value={i}>
                            {i}
                            <img className="imgRoom" src={kitchen} alt="kitchen"></img>
                        </button>
                    </form>  
                   </Col> 
                </>
                )}
                </Row>
               
               
            </div>

            
        );    
    }

}

export default Rooms;


