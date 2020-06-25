import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideDrawer.css';
import {UserOutlined,LogoutOutlined,InfoCircleOutlined} from '@ant-design/icons';


const sideDrawerHome = props => { 
let drawerClasses = 'side-drawer';
let type = null

if(props.show) {
    drawerClasses = 'side-drawer open';
}
fetch('/session')
    .then(res=>res.json())
    .then(data=>{ type=data.type })


    return (
<nav className={drawerClasses}>
    <ul>
        {type==='admin'?<li><NavLink to="/Profil"><UserOutlined/> Family</NavLink></li>:null}
        <li><NavLink to="/About"><InfoCircleOutlined/> About us</NavLink></li>
        <li><NavLink onClick={()=>fetch('/disconnect')} exact to="/"><LogoutOutlined/> Disconnect</NavLink></li> 
    </ul>
</nav>
    );
};


export default sideDrawerHome;