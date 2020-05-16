import React, {Component} from 'react';
import { Card, Avatar, Switch, Button } from 'antd';
import { KeyOutlined, WindowsOutlined, AlertOutlined } from '@ant-design/icons';
import '../App.css';
import lampe from '../images/lampe.jpg';
import temperature from '../images/temperature.jpg';
import Header from './Header.js';
import { TimePicker } from 'antd';
import moment from 'moment';

const format = 'HH:mm';

function onChange(checked) {
    console.log(`switch to ${checked}`);
}

class Setting extends Component{
    render(){
        return(
            <div className="App">
                <Header />
                <Card
                style={{ marginTop: 16 }}
                type="inner">
                <Avatar size={40} src={temperature} />
                Weather
                <div className="onOff">Nuageux</div>
                </Card>
                <Card
                style={{ marginTop: 16 }}
                type="inner">
                <Avatar size={40} style={{ color: '#007bff' , background:'none' }}icon={<AlertOutlined />}/>
                Alert
                <div className="onOff">ON/OFF <Switch size="small" defaultChecked onChange={onChange} /></div>
                </Card>

                <Card
                style={{ marginTop: 16 }}
                type="inner">
                <Avatar size={40} src={lampe} />
                Mouvement ligth
                <div className="onOff">Auto <Switch size="small" defaultChecked onChange={onChange} /></div>
                </Card>

                <Card
                style={{ marginTop: 16 }}
                type="inner">
                <Avatar size={40} src={lampe} />
                <div className="onOff">ON/OFF <Switch size="small" defaultChecked onChange={onChange} /></div>
                <div className="onOff">All lights OFF at : <TimePicker defaultValue={moment('12:08', format)} format={format} /></div>
                Light
                </Card>

                <Card
                style={{ marginTop: 16 }}
                type="inner">
                <Avatar size={40} style={{ color: '#007bff' , background:'none' }}icon={<KeyOutlined />}/>
                Door System
                <div className="onOff">Open/Close <Switch size="small" defaultChecked onChange={onChange} /></div>
                </Card>
                
                <Card
                style={{ marginTop: 16 }}
                type="inner">
                <Avatar size={40} style={{ color: '#007bff' , background:'none' }}icon={<KeyOutlined />}/>
                Door : Garage
                <div className="onOff">Open/Close <Switch size="small" defaultChecked onChange={onChange} /></div>
                </Card>

                <Card
                style={{ marginTop: 16 }}
                type="inner">
                <Avatar size={40} style={{ color: '#007bff' , background:'none' }}icon={<WindowsOutlined />}/>
                Window
                <div className="onOff">Auto <Switch size="small" defaultChecked onChange={onChange} /></div>
                <div className="onOff">All Windows close at : <TimePicker defaultValue={moment('12:08', format)} format={format} /></div>
                </Card>

            </div>

        );
    }
}

export default Setting;
