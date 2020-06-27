import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Toolbar.css';
import '../SideDrawer/DrawerToggleButton';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import { HomeOutlined,SettingOutlined,UserOutlined,LogoutOutlined,InfoCircleOutlined} from '@ant-design/icons';
import logoo from '../../images/house.png';

class toolbar extends Component{
    constructor(props){
        super(props);
        this.state={
            type:null,
              }
        this.disconnect=this.disconnect.bind(this) 
		this.session();
        this.session=this.session.bind(this)
    }
    disconnect(){fetch('/disconnect')}
    session(){
        fetch('/session')
        .then(res=>res.json())
        .then(data=>{this.setState({ type: data.type })})
        }

    render(){
        return(
    <header className="toolbar">
        <nav className="toolbar-navigation"> 
            <div className="toolbar_toggle-button">
                <DrawerToggleButton click={this.props.drawerClickHandler} />
            </div>
            <NavLink to="/Home" className="toolbar_logo">
                <span>Smart </span>
                <img className="imgLogo" src={logoo} alt="home"></img>
                <span> Home</span>
            </NavLink>
            <div className="spacer"/>
            <div className="toolbar-navigation-items">
                <ul>
                    <li><NavLink to="/Rooms"><HomeOutlined /> Rooms</NavLink></li>
                    <li><NavLink to="/Setting"><SettingOutlined /> Setting</NavLink></li>
                    {this.state.type==='admin'?<li><NavLink to="/Profil"><UserOutlined /> Family</NavLink></li>:null}
                    <li><NavLink to="/About"><InfoCircleOutlined/> About us</NavLink></li>
                    <li><NavLink onClick={this.disconnect} exact to="/"><LogoutOutlined /> Disconnect</NavLink></li>                   
                </ul>
            </div>
        </nav>
    </header>
    );
  }
};

export default toolbar;
