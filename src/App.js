import React, {Component} from 'react';
import {BrowserRouter , Route} from 'react-router-dom';
import './App.css';
import './index.css';
import Landing from './Pages/Landing.jsing.js.js';
import SignIn from './Pages/SignIn.js';
import Home from './Pages/Home.jsome.js.js';
import Rooms from './Pages/Rooms.js';
import Setting from './Pages/Setting.js';
import Bedroom from './Pages/Bedroom.js';
import Bedroom2 from './Pages/Bedroom2.js';
import LivingRoom from './Pages/LivingRoom.jsoom.js.js';
import Kitchen from './Pages/kitchen.js';

class App extends Component{
  render(){
    return(
      <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route path="/SignIn" component={SignIn} />
        {/* <Header /> */}
        {/* Le header ne doit pas etre fo9 SignIn et Landing page !!! */}
        <Route path="/Home" component={Home} />
        <Route path="/Rooms" component={Rooms} />        
        <Route path="/Setting" component={Setting} />
        <Route path="/Bedroom" component={Bedroom} />
        <Route path="/Bedroom2" component={Bedroom2} />
        <Route path="/kitchen" component={Kitchen} />
        <Route path="/LivingRoom" component={LivingRoom} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
