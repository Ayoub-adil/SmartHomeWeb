import React, {Component, Fragment} from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar } from 'antd';
import { HomeOutlined,SettingOutlined,UserOutlined,LogoutOutlined,InfoCircleOutlined} from '@ant-design/icons';
import '../App.css';
import ServerError from './ServerError';
import SignIn from './SignIn';

class Home extends Component{
  constructor(props){
		super(props);
		this.state={
      server:false,
      user:'user',
        } 
    this.disconnect=this.disconnect.bind(this)

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
      
    disconnect(){fetch('/disconnect')}

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
        
        <div className="home">
          <div className="hometext">
             
             <h1 orientation="left">
                   <h2>Hello <span style={{ color: '#F9F9F9',}}>{this.state.user}</span></h2>
            </h1>
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
                      
            <NavLink to="/Profil">
            <button className='btn'><h2 className="titleroom">Family</h2> 
            <Avatar size={50} style={{ color: '#007bff' , background:'none' }}icon={<UserOutlined />}/>
            </button>
            </NavLink>

            <br/>
                                              
            <NavLink exact to="/about">
            <button className='btn'><h2 className="titleroom">About</h2> 
            <Avatar size={50} style={{ color: '#007bff' , background:'none' }}icon={<InfoCircleOutlined />}/>
            </button>
            </NavLink>
                                  
            <NavLink onClick={this.disconnect} exact to="/">
            <button className='btn'><h2 className="titleroom">Disconnect</h2> 
            <Avatar size={50} style={{ color: '#007bff' , background:'none' }}icon={<LogoutOutlined />}/>
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
