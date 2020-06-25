import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideDrawer.css';
import { HomeOutlined,SettingOutlined,UserOutlined,LogoutOutlined,InfoCircleOutlined} from '@ant-design/icons';


const sideDrawerHome = props => { 
let drawerClasses = 'side-drawer';
if(props.show) {
    drawerClasses = 'side-drawer open';
}

    return (
<nav className={drawerClasses}>
    <ul>
        <li><NavLink to="/Profil"><UserOutlined/> Family</NavLink></li>
        <li><NavLink to="/About"><InfoCircleOutlined/> About us</NavLink></li>
        <li><NavLink onClick={()=>fetch('/disconnect')} exact to="/"><LogoutOutlined/> Disconnect</NavLink></li> 
    </ul>
</nav>
    );
};


export default sideDrawerHome;