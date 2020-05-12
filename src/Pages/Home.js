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
          <div >
              <NavLink to="/Rooms">
                <button className='btn'><h2 className="titleroom">Rooms</h2> <Avatar size={90} style={{ color: '#ffffff' , background:'none' }}icon={<HomeOutlined />}/></button>
                {/* <Card title="Rooms" bordered={true} style={{ width: 300 }}>
                    <img className="img" src={chooseRoom}></img>
                </Card> */}
              </NavLink>
            
              <NavLink to="/Setting">
              <button className='btn'><h2 className="titleroom">Setting</h2> <Avatar size={90} style={{ color: '#ffffff' , background:'none' }}icon={<SettingOutlined />}/></button>
                {/* <Card title="Setting" bordered={true} style={{ width: 300 }}>
                    <img className="img" src={param}></img>
                </Card> */}
              </NavLink>
            
          </div>
            
        </div>
      );
    }
  }
  
export default Home;