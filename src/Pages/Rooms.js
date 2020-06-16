import React, {Component, Fragment} from 'react';
import { Col, Row} from 'antd';
import '../App.css';
import bedroom from '../images/bedroomN.png';
import kitchen from '../images/kitchenN.png';
import livingroom from '../images/livingroomN.png';
import Header from './Header.js';
import ServerError from './ServerError';
import SignIn from './SignIn';

class Rooms extends Component{
    
    constructor(props){
        super(props);
        this.state={
            server:false,
            plan:'homeSweetHome',
            user:'User'
        }
        this.WorkingServer();
        this.WorkingServer=this.WorkingServer.bind(this);

        this.session();
        this.session=this.session.bind(this);
        
        this.getplan();
        this.getplan=this.getplan.bind(this);
        
    }
    WorkingServer(){
        fetch('/server').then(res=>res.json()).then(data=>{
          this.setState({
            server: data.server,
          });
        })
      }    
    session(){
        fetch('/session').then(res=>res.json()).then(data=>{
          this.setState({
            user: data.user,
          });
        })
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
            {this.state.server
            ?
            <Fragment>
            {this.state.user==='User'?
            <SignIn/>
            :
            <Fragment>
                <Header />
                <div className='Rooms'></div>
                <h2 orientation="left">
                   <h1>Hello <span className="smarthome">{this.state.user}</span></h1>
                </h2>


                {this.state.plan.bedroom===0?null:<h1>Bedrooms</h1>}
                <Row>
                {[...Array(this.state.plan.bedroom)].map((e,i)=>
                <Fragment>
                    <Col 
                    className="gutter-row" 
                    span={Math.floor(24/this.state.plan.bedroom)}
                    >  
                    <form method='post' action='/change/room'>
                        <input name='typeofroom' type='text' value='bedroom' hidden></input>
                        <button className="btnRoom" name='rooom' type='submit' value={i}>
                            bedroom {i+1}
                            <img className="imgRoom" src={bedroom} alt="bedroom"></img>
                        </button>
                    </form> 
                   </Col>
                </Fragment>
                )}
                </Row>

                {this.state.plan.livingroom===0?null:<h1>livingrooms</h1>}
                <Row>
                {[...Array(this.state.plan.livingroom)].map((e,i)=>
                <Fragment>
                    <Col 
                    className="gutter-row" 
                    span={Math.floor(24/this.state.plan.livingroom)}
                    >  
                    <form method='post' action='/change/room'>
                        <input name='typeofroom' type='text' value='livingroom' hidden></input>
                        <button className="btnRoom" name='rooom' type='submit' value={i}>
                            livingroom {i+1}
                            <img className="imgRoom" src={livingroom} alt="livingroom"></img>
                        </button>
                    </form> 
                    </Col>
                </Fragment>
                )}
                </Row>

                {this.state.plan.kitchen===0?null:<h1>kitchens</h1>}
                <Row>
                {[...Array(this.state.plan.kitchen)].map((e,i)=>
                <Fragment>
                    <Col
                    span={Math.floor(24/this.state.plan.kitchen)}
                    > 
                    <form method='post' action='/change/room'>
                        <input name='typeofroom' type='text' value='kitchen' hidden></input>
                        <button className="btnRoom" name='rooom' type='submit' value={i}>
                            kitchen {i+1}
                            <img className="imgRoom" src={kitchen} alt="kitchen"></img>
                        </button>
                    </form>  
                   </Col>
                    
                </Fragment>
                )}
                </Row>
               
            </Fragment>
            }
            </Fragment>
            :
            <ServerError/>
            }
            </div> 
        );    
    }
}

export default Rooms;


