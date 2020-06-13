import React, {Component, Fragment} from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar } from 'antd';
import { HomeOutlined,SettingOutlined } from '@ant-design/icons';
import '../App.css';
import Header from './Header.js';
import ServerError from './ServerError';
import SignIn from './SignIn';

class Home extends Component{
  constructor(props){
		super(props);
		this.state={
      server:false,
      user:'user',
        } 
    this.WorkingServer();
    this.WorkingServer=this.WorkingServer.bind(this);

		this.session();
    this.session=this.session.bind(this)
    }
    WorkingServer(){
        fetch('/server')
        .then(res=>res.json())
        .then(data=>{this.setState({server: data.server})})
      }

    session(){
      fetch('/session')
      .then(res=>res.json())
      .then(data=>{this.setState({ user: data.user })})
      }

  render(){
    return(
      <div className="App">
      {this.state.server
        ?
        <Fragment>
        {this.state.user==='User'?
        <SignIn/>
        :
        <Fragment>
        <Header />
        <div className="home">
          <div className="hometext">
             <h1>SmartHome-App</h1>
             <p>Control your home from SmartHome-App on your mobile phone.</p>
             <p>Discover more ways to control your home :</p>
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
        </Fragment>
            }
            </Fragment>
            :
            <ServerError/>
            }  
      </div>
    );
  }
}
  
export default Home;
