import React, {Component} from 'react';
import { Layout, Tabs , Alert, Breadcrumb, Button  } from 'antd';
import { TableOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import './console.css';
import '../App.css';
import Title from 'antd/lib/typography/Title';
import { Link } from 'react-router-dom';
import Dashboard  from './Dashboard.js';
import Formulaire from './Formulaire.js';
import logo from '../images/house.png';
import Login from './login';

const { TabPane } = Tabs;

const { Header, Footer, Content } = Layout;


  

class Console extends Component{

    constructor(props){
        super(props);
        this.state={
            session:"session",              
        }
        this.disconnect=this.disconnect.bind(this) 
        this.session()
        this.session=this.session.bind(this) 
    }
    disconnect(){fetch('/disconnectSA')}

    session(){
        fetch('/sessionSA').then(res=>res.json()).then(data=>{
        this.setState({
            session: data.sessionSA,
        });
        })
    }
    render(){
      return(
        <div className="App">
        {this.state.session===true?
            <Layout>
                <Header style={{padding:14}}>
                    <Link onClick={this.disconnect} exact to="/"><Button style={{float:'right' , fontWeight:800}} >Disconnect</Button></Link>
                    {/* <a href='#' style={{float:'right'}} icon={<UserOutlined />}  /> */}
                    <Title style={{color:'#F9F9F9'}} level={4}>
                        <span>Smart </span>
                        <img className="imgLogo" src={logo} alt="home"/>
                        <span> Home</span>
                    </Title>
                </Header>
                <Layout>
                    
                    <Layout>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>
                            <Alert message="Informational Notes" description="Space reserved for the company" type="info" showIcon />
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-content" style={{background:'#fff' , padding:24, minHeight:580}}>
                        <Tabs defaultActiveKey="1">
                            <TabPane
                            tab={
                            <span>
                                <TableOutlined />
                                Dashboard
                                </span>
                                }
                                key="1"
                                >
                                <Dashboard />

                            </TabPane>
                            <TabPane
                                    tab={
                                    <span>
                                        <UsergroupAddOutlined />
                                        Add an Admin
                                        </span>
                                        }
                                        key="2"
                                        >
                                        <Formulaire />
                            </TabPane>
                        </Tabs>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>copyright ©2020</Footer>
                    </Layout>
                </Layout>                
                
            </Layout>
        :<Login/>}
        </div>
      );
    }
  }
    
  export default Console;
