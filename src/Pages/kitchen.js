import React, {Component, Fragment} from 'react';
import { Switch,Row,Col } from 'antd';
import Header from './Header.js';
import '../App.css';
import kitchenRoom from '../images/kitchenRoom.png';
import ServerError from './ServerError.js';
import SignIn from './SignIn.js';

class Rooms extends Component{
    
    constructor(props){
        super(props);
        this.state={
          server:false,
          user:'user',
            rooom:0,
            window:'broken',      
        } 
        this.WorkingServer();
        this.WorkingServer=this.WorkingServer.bind(this);
		    this.session();
        this.session=this.session.bind(this)

        this.getRoom();  
        this.getWindowState();

        this.getRoom=this.getRoom.bind(this)
        this.getWindowState=this.getWindowState.bind(this);

        this.changeWindowState=this.changeWindowState.bind(this) 
      }
    WorkingServer(){
        fetch('/server')
        .then(res=>res.json())
        .then(data=>{this.setState({server: data.server})})
      }
    session(){
      fetch('/session')
      .then(res=>res.json())
      .then(data=>{this.setState({ user: data.user })})
      }


      getRoom(){
        fetch('/home/room').then(res=>res.json()).then(data=>{
          this.setState({ rooom: data.room })
        })
        console.log(this.state.rooom)
      }

      getWindowState(){
        fetch('/home/window').then(res=>res.json()).then(data=>{
          this.setState({ window: data.kitchen[this.state.rooom] })
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
                <Header/>
                <div className="theRight">
                    <img className="kitchenImg" src={kitchenRoom} alt="manage your kitchen"/>
                </div>
                <div className="theLeft">
                    <Row gutter={[8, 48]}>
                    <Col>
                    Window : 
                    </Col>
                    <Col>
                    <Switch 
                        disabled={this.state.window==='broken'?true:false}
                        checked={this.state.window==='opened'?true:false}
                        onChange={this.changeWindowState} 
                    />
                    </Col> 
                    <Col>
                    {this.state.window}
                    </Col>  
                </Row>
                </div>
                </Fragment>
            }
            </Fragment>
            :
            <ServerError/>
            } 
            </div>     
        );
    }

    changeWindowState() {
        fetch('/change/window');
        this.getWindowState();
    }
}


export default Rooms;
