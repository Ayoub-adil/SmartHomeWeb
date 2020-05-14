import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar } from 'antd';
import { HomeOutlined,SettingOutlined } from '@ant-design/icons';
import '../App.css';
import Header from './Header.js';

class Home extends Component{
  render(){
    return(
      <div className="App">
        <Header />
        <div className="home">
          <div className="hometext">
             <h1>SmartHome-App</h1>
             <p>Contrôlez votre maison depuis l’application SmartHome-App sur votre téléphone mobile.</p>
             <p>Découvrez plus de façons de contrôler votre maison :</p>
          </div>

            <NavLink to="/Rooms">
              <button className='btn'><h2 className="titleroom">Rooms</h2> 
              <Avatar size={50} style={{ color: '#007bff' , background:'none' }}icon={<HomeOutlined />}/>
              </button>
            </NavLink>
          
            <NavLink to="/Setting">
            <button className='btn'><h2 className="titleroom">Setting</h2> 
            <Avatar size={50} style={{ color: '#007bff' , background:'none' }}icon={<SettingOutlined />}/>
            </button>
            </NavLink>
          
        </div>
          
      </div>
    );
  }
}
  
export default Home;