import React from 'react';
import './DrawerToggleButton.css';
import {MoreOutlined} from '@ant-design/icons';
import { Avatar } from 'antd';

const DrawerToggleButton= props => (

     <button className="toggle-button" onClick={props.click}>
         
         <Avatar size={50} style={{ color: '#007bff' , background:'none' }}icon={<MoreOutlined/>}/>
     </button>
);


export default DrawerToggleButton;