import React, {Component} from 'react';
import {BrowserRouter , Route} from 'react-router-dom';
import './App.css';
import './index.css';
import Landing from './Pages/Landing.js';
import SignIn from './Pages/SignIn.js';
import Home from './Pages/Home.js';
import Rooms from './Pages/Rooms.js';
import Setting from './Pages/Setting.js';
import Bedroom from './Pages/Bedroom.js';
import LivingRoom from './Pages/LivingRoom.js';
import Kitchen from './Pages/kitchen.js';
import Login from './SuperAdmin/login.js';
import Console from './SuperAdmin/console.js';
import Cons from './SuperAdmin/cons.js';
import ServerError from './Pages/ServerError.js';
import Profil from './Pages/Profil.js';


class App extends Component{
  render(){

    return(
      <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/Home" component={Home} />
        <Route path="/Rooms" component={Rooms} />        
        <Route path="/Setting" component={Setting} />
        <Route path="/Bedroom" component={Bedroom} />
        <Route path="/kitchen" component={Kitchen} />
        <Route path="/LivingRoom" component={LivingRoom} />
        <Route path="/login" component={Login} />
        <Route path="/console" component={Console} />
        <Route path="/cons" component={Cons} />
        <Route path="/ServerError" component={ServerError} />
        <Route path="/Profil" component={Profil} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
