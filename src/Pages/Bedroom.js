import React, {Component} from 'react';
import { Switch,Row,Col,Input, Slider } from 'antd';
import Header from './Header.js';
import '../App.css';
import bedroomRoom from '../images/bedroomRoom.png';

const marks = {
    15: '15°C',
    // 30: '30°C',
    // 40: '40°C',
    50: {
        style: {
        color: '#f50',
        },
        label: <strong>50°C</strong>,
    },
};

class Rooms extends Component{

    constructor(props){
        super(props);
        this.state={
            rooom:0,
            lamp: "broken",
            window:'broken',      
            climatiseur:"broken",
            temperature:0,
            temp: 0,  
        } 
        this.getRoom();  
        this.getLampState();
        this.getTemperature();
        this.getWindowState();

        this.getRoom=this.getRoom.bind(this)
        this.getLampState=this.getLampState.bind(this)
        this.getTemperature=this.getTemperature.bind(this);
        this.getWindowState=this.getWindowState.bind(this);

        this.changeLampState=this.changeLampState.bind(this) 
        this.handleTemperature=this.handleTemperature.bind(this) 
        this.handleTemperatureinput=this.handleTemperatureinput.bind(this) 
        // this.changeTemperature=this.changeTemperature.bind(this) 
        this.changeAirConditionerState=this.changeAirConditionerState.bind(this) 
        this.changeWindowState=this.changeWindowState.bind(this) 
      }

      getRoom(){
        fetch('/home/room').then(res=>res.json()).then(data=>{
          this.setState({ rooom: data.room })
        })
        console.log(this.state.rooom)
      }

      getLampState(){
        fetch('/home/lamp').then(res=>res.json()).then(data=>{
          this.setState({ lamp: data.bedroom[this.state.rooom] })
        })
      }

      getTemperature(){
        fetch('/home/temperature').then(res=>res.json()).then(data=>{
          this.setState({
            temperature: data.temperature.bedroom[this.state.rooom],
            temp: data.temperature.bedroom[this.state.rooom],
            climatiseur: data.airConditioner.bedroom[this.state.rooom], 
          })
        })
      }

      getWindowState(){
        fetch('/home/window').then(res=>res.json()).then(data=>{
          this.setState({ window: data.bedroom[this.state.rooom] })
        })
      }

    render(){
        return(
          <div className="App">
            <Header/>


            <div className="theRight">
                <img className="bedroomImg" src={bedroomRoom} alt="manage your bedroom"/>
            </div>


            <div className="theLeft">

              <Row gutter={[8, 48]}>
                <Col>
                  Climatiseur:
                </Col>
                <Col>
                  <Switch 
                    disabled={this.state.climatiseur==='broken'?true:false}
                    checked={this.state.climatiseur==='on'?true:false}  
                    onChange={this.changeAirConditionerState} 
                  /> 
                </Col>
              </Row>

              <Row gutter={[8, 48]}>
                <Col>
                  Temperature :
                </Col>
                <Col>
                  <form  method='post' action='/change/temperature'>
                    <Input 
                      type='submit' 
                      value={this.state.temp}
                      hidden={this.state.temperature===0?true:false}
                    />
                    <input  
                      type="number" 
                      name="tmp" 
                      hidden
                      onChange={this.handleTemperatureinput}  
                      value={+this.state.temp}
                    />
                  </form>
                </Col>
              </Row>
              {/* <Row gutter={[8, 48]}> */}
                {/* <Col> */}
                    {this.state.climatiseur==="on"
                    ?  
                    <Slider
                      disabled={this.state.temperature===0 || this.state.climatiseur==='off'?true:false}
                      max={50} 
                      min={15} 
                      marks={marks} 
                      defaultValue={this.state.temperature} 
                      value={this.state.temp}
                      onChange={this.handleTemperature} 
                    /> 
                    :null 
                    }
                {/* </Col> */}
              {/* </Row>      */}
                  
      
              <Row gutter={[8, 48]}>
                <Col>
                  Light : 
                </Col>
                <Col>
                  <Switch 
                    disabled={this.state.lamp==='broken'?true:false}
                    checked={this.state.lamp==='on'?true:false}
                    // checkedChildren="on" 
                    // unCheckedChildren="off"  
                    onChange={this.changeLampState} 
                  />
                </Col>
                <Col>
                  {this.state.lamp} 
                </Col>
              </Row>

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

    

    changeLampState() {
      fetch('/change/lamp');
      this.getLampState();
      //console.log(this.state.temperature)
    }

    handleTemperature(value) {
      this.setState({ temp: +value }); 
      console.log('slider '+value)  
      // this.changeTemperature(); 
    }
    handleTemperatureinput(e) {
      this.setState({ temp: e.target.value }); 
      console.log('input '+e.target.value)  
      // this.changeTemperature(); 
    }

    // async changeTemperature() {
    //   let result=await fetch('/change/temperature',{
    //     'method':'POST',
    //     'mode': 'no-cors',
    //     'headers':{
    //       'accept':'application/json',
    //       'content-type':'application/json'
    //     },
    //     'body':JSON.stringify({
    //       tmp:this.state.temp
    //     })
    //   });
    //   this.getTemperature();
    //   //console.log(result);
    // }

    changeAirConditionerState() {
      fetch('/change/airConditioner');
      this.getTemperature();
    }

    changeWindowState() {
      fetch('/change/window');
      this.getWindowState();
    }
}

export default Rooms;
