import React, {Component} from 'react';
import { Tabs, Switch, Slider  } from 'antd';
import Header from './Header.js';
import '../App.css';
import bedroomRoom from '../images/bedroomRoom.png';

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
    render(){
        return(
            <div className="App">
                <Header/>
                <div className="theRight">
                    <img className="bedroomImg" src={bedroomRoom}/>
                </div>
                <div className="theLeft">
                    <div className="onOffRoomX">
                        Temperature : <Slider marks={marks} defaultValue={37} />    
                    </div>
                    
                        <div className="onOffRoomX">Light : On/Off <Switch  defaultChecked onChange={onChange} /></div>
                        <div className="onOffRoomX">Window : Open/Close <Switch  defaultChecked onChange={onChange} /></div>
                    
                </div>
                
            </div>     
        );
    }
}

export default Rooms;
