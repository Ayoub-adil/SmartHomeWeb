import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      rooom:0,
      lamp: "broken",
      window:'half opened',
      climatiseur:"broken",
      temperature:0,
      temp: 0,
    }
    this.getLampState();
    this.getTemperature();
    this.getWindowState();

    this.getLampState=this.getLampState.bind(this)
    this.getTemperature=this.getTemperature.bind(this);
    this.getWindowState=this.getWindowState.bind(this);

    this.changeRoom=this.changeRoom.bind(this) 
    this.changeLampState=this.changeLampState.bind(this) 
    this.handleTemperature=this.handleTemperature.bind(this) 
    //this.changeTemperature=this.changeTemperature.bind(this) 
    this.changeAirConditionerState=this.changeAirConditionerState.bind(this) 
    this.changeWindowState=this.changeWindowState.bind(this) 
  }
  
 

  getLampState(){
    fetch('/lamp').then(res=>res.json()).then(data=>{
      this.setState({ lamp: data.lamp[this.state.rooom] })
    })
  }
  getTemperature(){
    fetch('/temperature').then(res=>res.json()).then(data=>{
      this.setState({
        temperature: data.temperature[this.state.rooom],
        temp: data.temperature[this.state.rooom],
        climatiseur: data.airConditioner[this.state.rooom], 
      })
    })
  }
  getWindowState(){
    fetch('/window').then(res=>res.json()).then(data=>{
      this.setState({ window: data.window[this.state.rooom] })
    })
  }



  render (){
    return (
      <div className="App App-header">
        <table>
          <thead>
            <tr>
              <td>Room number</td>
              <td><strong>{this.state.rooom+1}</strong></td>
              <td>
                <select onClick={this.changeRoom}>
                  <option>1</option>
                  <option>2</option>
                </select>
              </td>
            </tr>
          </thead>
          
          <tbody>
            <tr>
              <td>Lamp</td>
              <td>{this.state.lamp}</td>
              <td><button onClick={this.changeLampState}></button></td>
            </tr>
            <tr>
              <td>Air Conditioner</td>
              <td>{this.state.climatiseur}</td>
              <td>
              <button onClick={this.changeAirConditionerState}></button>
              </td>
            </tr>
            <tr>
              <td>Temperaturature</td>
              <td>
                {this.state.climatiseur==="on"
                ?this.state.temp 
                :null}
                /{this.state.temperature}°c
              </td>
              <td>
                {this.state.climatiseur==="on"
                ?<form  method='post' action='/setTemperature'>
                  {/* onBlur ={this.handleTemperature} onKeyUp  ={this.handleTemperature} */}
                  <input  type="number" name="tmp" min="15" max="50" placeholder={+this.state.temperature}></input>
                  <input type='submit' value='ok'></input>
                </form>
                :null
                }
              </td>
            </tr>
            
            <tr>
              <td>Window</td>
              <td>{this.state.window}</td>
              <td><button onClick={this.changeWindowState}></button></td>
            </tr>
          </tbody>
        </table>  
        <form method='post' action='/getpost'>
          <input type='text' name='first'/>
          <input type='text' name='last'/>
          <input type='submit'/>
        </form>
      </div>
    );
  }


  changeRoom(e) {
    this.setState({ rooom: e.target.value-1 });
    this.getLampState();
    this.getTemperature();
    this.getWindowState()
  }
  changeLampState() {
    fetch('/setLamp');
    this.getLampState();
  }
  handleTemperature(e) {
    this.setState({ temp: e.target.value });   
    this.changeTemperature(); 
  }
  async changeTemperature() {
    let result=await fetch('/setTemperature',{
      'method':'POST',
      'mode': 'no-cors',
      'headers':{
        'accept':'application/json',
        'content-type':'application/json'
      },
      'body':JSON.stringify({
        tmp:this.state.temp
      })
    });
    this.getLampState();
    console.log(result);
  }
  changeAirConditionerState() {
    fetch('/setAirConditioner');
    this.getTemperature();
  }
  changeWindowState() {
    fetch('/setWindow');
    this.getWindowState();
  }
}

export default App;