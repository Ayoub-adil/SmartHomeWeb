import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Toolbar.css';
import '../SideDrawer/DrawerToggleButton';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

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
            <div className="toolbar_logo">SmartHome-App</div>
            <div className="spacer"></div>
            <div className="toolbar-navigation-items">
                <ul>
                    <li><NavLink to="/Home">Home</NavLink></li>
                    <li><NavLink to="/Profil">Profil</NavLink></li>
                    <li><NavLink onClick={this.disconnect} exact to="/">Disconnect</NavLink></li>                   
                </ul>
            </div>
        </nav>
    </header>
    );
  }
};

export default toolbar;
