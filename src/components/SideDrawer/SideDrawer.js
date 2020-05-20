import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideDrawer.css';


const sideDrawer = props => { 
let drawerClasses = 'side-drawer';
if(props.show) {
    drawerClasses = 'side-drawer open';
}

    return (
<nav className={drawerClasses}>
    <ul>
        <li><NavLink to="/Home">Home</NavLink></li>
        <li><NavLink to="/Rooms">Rooms</NavLink></li>
        <li><NavLink to="/Setting">Setting</NavLink></li>
        <li><NavLink to="/Profil">Profil</NavLink></li>
        <li><NavLink exact to="/">Disconnect</NavLink></li>
    </ul>
</nav>
    );
};


export default sideDrawer;