import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Toolbar.css';
import '../SideDrawer/DrawerToggleButton';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import { HomeOutlined,SettingOutlined,UserOutlined,LogoutOutlined,InfoCircleOutlined} from '@ant-design/icons';
import logo from '../../images/house.webp';

class toolbar extends Component{
    constructor(props){
		super(props);
        this.disconnect=this.disconnect.bind(this)
    }
    disconnect(){fetch('/disconnect')}

    render(){
        return(
    <header className="toolbar">
        <nav className="toolbar-navigation"> 
            <div className="toolbar_toggle-button">
                <DrawerToggleButton click={this.props.drawerClickHandler} />
            </div>
            <NavLink to="/Home" className="toolbar_logo">
                <span>Smart </span>
                <img className="imgLogo" src={logo} alt="home"></img>
                <span> Home</span>
            </NavLink>
            <div className="spacer"/>
            <div className="toolbar-navigation-items">
                <ul>
                    <li><NavLink to="/Rooms"><HomeOutlined /> Rooms</NavLink></li>
                    <li><NavLink to="/Setting"><SettingOutlined /> Settings</NavLink></li>
                    <li><NavLink to="/Profil"><UserOutlined /> Family</NavLink></li>
                    <li><NavLink onClick={this.disconnect} exact to="/"><LogoutOutlined /> Disconnect</NavLink></li>                   
                </ul>
            </div>
        </nav>
    </header>
    );
  }
};

export default toolbar;
