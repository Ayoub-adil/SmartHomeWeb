import React, {Component} from 'react';
import { Switch,Row,Col } from 'antd';
import Header from './Header.js';
import '../App.css';
import kitchenRoom from '../images/kitchenRoom.png';

class Rooms extends Component{
    
    constructor(props){
        super(props);
        this.state={
            rooom:0,
            window:'broken',      
        } 
        this.getRoom();  
        this.getWindowState();

        this.getRoom=this.getRoom.bind(this)
        this.getWindowState=this.getWindowState.bind(this);

        this.changeWindowState=this.changeWindowState.bind(this) 
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
            </div>     
        );
    }

    changeWindowState() {
        fetch('/change/window');
        this.getWindowState();
    }
}


export default Rooms;
