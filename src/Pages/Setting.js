import React, {Component} from 'react';
import { Card, Avatar, Switch, Button } from 'antd';
import { KeyOutlined, WindowsOutlined, AlertOutlined } from '@ant-design/icons';
import '../App.css';
import lampe from '../images/lampe.jpg';
import temperature from '../images/temperature.jpg';
import Header from './Header.js';
import { TimePicker } from 'antd';
import moment from 'moment';

const format = 'HH:mm';

function onChange(checked) {
    console.log(`switch to ${checked}`);
}

function onChang(objectTime,timeString) {
    console.log(timeString);
}

class Setting extends Component{
    constructor(props){
        super(props);
        this.state={
            outsideT:'Conexion au termometre',
            rain:'Conexion au capteur de pluie',
            door:'Conexion au capteur',
            garageDoor:'Conexion au capteur',
            timeLamp:null,
        } 
        this.getOutsideTemperature();
        this.getDoorState();
        this.getGarageDoorState();

        this.getOutsideTemperature=this.getOutsideTemperature.bind(this);
        this.getDoorState=this.getDoorState.bind(this);
        this.getGarageDoorState=this.getGarageDoorState.bind(this);

        this.changeDoorState=this.changeDoorState.bind(this) 
        this.changeGarageDoorState=this.changeGarageDoorState.bind(this) 
    }

    timeLampChange=(time)=>{
        this.setState({timeLamp:time})
    }
    test=()=>{
        console.log(this.state.timeLamp.hour);
    }

    getOutsideTemperature(){
        fetch('/home/outsideTemperature').then(res=>res.json()).then(data=>{
          this.setState({
            outsideT: data.outsideTemperature,
            rain: data.rain[0],
          });
        })
    }
    getDoorState(){
        fetch('/home/door').then(res=>res.json()).then(data=>{
          this.setState({
            door: data.door,
          });
        })
    }
    getGarageDoorState(){
        fetch('/home/garageDoor').then(res=>res.json()).then(data=>{
          this.setState({
            garageDoor: data.garageDoor,
          });
        })
    }

    render(){
        return(
            <div className="App">
                <Header />
                <Card style={{ marginTop: 16 }} type="inner">
                    <Avatar size={40} src={temperature} />
                    Weather
                    <div className="onOff">{this.state.outsideT}°C</div>
                    <div className="onOff">{this.state.rain?null:<span>Pas de </span>}Pluie</div>
                </Card>
                <Card style={{ marginTop: 16 }} type="inner">
                    <Avatar size={40} style={{ color: '#007bff' , background:'none' }}icon={<AlertOutlined />}/>
                    Alert
                    <div className="onOff">ON/OFF <Switch size="small" defaultChecked onChange={onChange} /></div>
                </Card>

                <Card style={{ marginTop: 16 }} type="inner">
                    <Avatar size={40} src={lampe} />
                    Mouvement ligth
                    <div className="onOff">Auto <Switch size="small" defaultChecked onChange={this.test} /></div>
                </Card>

                <Card style={{ marginTop: 16 }} type="inner">
                    <Avatar size={40} src={lampe} />
                    <div className="onOff">Auto <Switch size="small" defaultChecked onChange={onChange} /></div>
                    <div className="onOff">All lights OFF at : 
                    <TimePicker 
                        onChange={this.timeLampChange} 
                        // defaultValue={moment('12:08', format)} 
                        value={this.state.timeLamp} 
                        format={format} 
                    />
                    </div>
                    Light
                </Card>

                <Card style={{ marginTop: 16 }} type="inner">
                    <Avatar size={40} style={{ color: '#007bff' , background:'none' }}icon={<KeyOutlined />}/>
                    Door System
                    <div className="onOff">{this.state.door?<>Locked </>:<>Unlocked </>} 
                    <Switch 
                        size="small" 
                        checked={this.state.door}  
                        onChange={this.changeDoorState} 
                    />
                    </div>
                </Card>
                
                <Card style={{ marginTop: 16 }} type="inner">
                    <Avatar size={40} style={{ color: '#007bff' , background:'none' }}icon={<KeyOutlined />}/>
                    Door : Garage
                    <div className="onOff">{this.state.garageDoor}<> </> 
                    <Switch 
                        size="small" 
                        checked ={this.state.garageDoor==="opened"?true:false}  
                        onChange={this.changeGarageDoorState} 
                    />
                    </div>
                </Card>

                <Card style={{ marginTop: 16 }} type="inner">
                    <Avatar size={40} style={{ color: '#007bff' , background:'none' }}icon={<WindowsOutlined />}/>
                    Window
                    <div className="onOff">Auto <Switch size="small" defaultChecked onChange={onChange} /></div>
                    <div className="onOff">All Windows close at : <TimePicker defaultValue={moment('12:08', format)} format={format} /></div>
                </Card>

            </div>

        );
    }

    changeDoorState() {
        fetch('/change/door');
        this.getDoorState();
    }

    changeGarageDoorState() {
        fetch('/change/garageDoor');
        this.getGarageDoorState();
    }
}

export default Setting;
