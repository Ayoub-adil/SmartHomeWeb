import React from 'react';
import { NavLink } from 'react-router-dom';
import './Toolbar.css';
import '../SideDrawer/DrawerToggleButton';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

const toolbar = props =>(
    <header className="toolbar">
        <nav className="toolbar-navigation"> 
            <div className="toolbar_toggle-button">
                <DrawerToggleButton click={props.drawerClickHandler} />
            </div>
            <div className="toolbar_logo">SmartHome-App</div>
            <div className="spacer"></div>
            <div className="toolbar-navigation-items">
                <ul>
                    <li><NavLink to="/Home">Home</NavLink></li>
                    <li><NavLink exact to="/">Disconnect</NavLink></li>                   
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;