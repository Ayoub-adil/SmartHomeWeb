import React, {Component} from 'react';
import { Tabs, Switch, Slider  } from 'antd';
import Header from './Header.js';
import '../App.css';
import LivingroomRoom from '../images/LivingroomRoom.png';

const { TabPane } = Tabs;
const marks = {
    0: '0°C',
    37: '37°C',
    100: {
        style: {
        color: '#f50',
        },
        label: <strong>100°C</strong>,
    },
};

function onChange(checked) {
    console.log(`switch to ${checked}`);
}

function formatter(value) {
    return `${value}%`;
}



class Rooms extends Component{

    constructor(props){
        super(props);
        this.state={
            rooom:0,
            type:'outdoor',
            lamp: "broken",
            window:'broken',      
            climatiseur:"broken",
            temperature:0,
            temp: 0,    
        }    
        this.getRoom();
        this.getLampState();
        // this.getTemperature();
        this.getWindowState();

        this.getRoom=this.getRoom.bind(this)
        this.getLampState=this.getLampState.bind(this)
        // this.getTemperature=this.getTemperature.bind(this);
        this.getWindowState=this.getWindowState.bind(this);

        this.changeLampState=this.changeLampState.bind(this) 
        // this.handleTemperature=this.handleTemperature.bind(this) 
        //this.changeTemperature=this.changeTemperature.bind(this) 
        // this.changeAirConditionerState=this.changeAirConditionerState.bind(this) 
        this.changeWindowState=this.changeWindowState.bind(this) 
      }

      getRoom(){
        fetch('/home/room').then(res=>res.json()).then(data=>{
            this.setState({ 
              rooom: data.room,
              type: data.type,
            })
        })
        console.log(this.state.rooom)
      }

      getLampState(){
        fetch('/home/lamp').then(res=>res.json()).then(data=>{
          this.setState({ lamp: data.livingroom[this.state.rooom] })
        })
      }

    //   getTemperature(){
    //     fetch('/home/temperature').then(res=>res.json()).then(data=>{
    //       this.setState({
    //         temperature: data.temperature.livingroom[this.state.rooom],
    //         temp: data.temperature.livingroom[this.state.rooom],
    //         climatiseur: data.airConditioner.livingroom[this.state.rooom], 
    //       })
    //     })
    //   }

      getWindowState(){
        fetch('/home/window').then(res=>res.json()).then(data=>{
          this.setState({ window: data.livingroom[this.state.rooom] })
        })
      }


    render(){
        return(
            <div className="App">
                <Header/>
                <div className="theRight">
                    <img className="bedroomImg" src={LivingroomRoom}/>
                </div>
                <div className="theLeft">
                    {/* <div className="onOffRoomX">
                        Temperature : <Slider marks={marks} defaultValue={37} />    
                    </div> */}
                    
                        <div className="onOffRoomX">Light : <Switch onChange={this.changeLampState} /> {this.state.lamp}</div>
                        
                        <div className="onOffRoomX">Window : <Switch  defaultChecked onChange={this.changeWindowState} /> {this.state.window}</div>
                    
                </div>

            </div>     
        );
    }



    changeLampState() {
      fetch('/change/lamp');
      this.getLampState();
    }

  //   handleTemperature(e) {
  //     this.setState({ temp: e.target.value });   
  //     this.changeTemperature(); 
  //   }

  //   async changeTemperature() {
  //     let result=await fetch('/change/temperature',{
  //       'method':'POST',
  //       'mode': 'no-cors',
  //       'headers':{
  //         'accept':'application/json',
  //         'content-type':'application/json'
  //       },
  //       'body':JSON.stringify({
  //         tmp:this.state.temp
  //       })
  //     });
  //     this.getLampState();
  //     console.log(result);
  //   }

  //   changeAirConditionerState() {
  //     fetch('/change/airConditioner');
  //     this.getTemperature();
  //   }

    changeWindowState() {
      fetch('/change/window');
      this.getWindowState();
    }
}

export default Rooms;
