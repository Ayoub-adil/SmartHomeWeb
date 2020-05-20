import React, {Component} from 'react';
import { Layout, Tabs , Breadcrumb, Input, InputNumber, Button,Row,Col  } from 'antd';
import { UserOutlined, TableOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import './console.css';
import '../App.css';
import Title from 'antd/lib/typography/Title';
import Password from 'antd/lib/input/Password';
import Dashboard  from './Dashboard.js';

const { TabPane } = Tabs;

const { Header, Footer, Content } = Layout;


class Cons extends Component{


    render(){
      return(
        <div className="App">
            <Layout>
                <Header style={{padding:14}}>
                    <Button style={{float:'right' , fontWeight:800}} >Déconnexion</Button>
                    {/* <a href='#' style={{float:'right'}} icon={<UserOutlined />}  /> */}
                    <Title style={{color:'#F9F9F9'}} level={4}>Smarthome-App console</Title>
                    </Header>
                <Layout>
                    
                    <Layout>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>
                            Espace réservé pour l'administrateur de la société :
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
<form 
    method="post" 
    action="/traitementForm" 
>
    <Row>
    <Col>
    Login 
    </Col>
    <Col>
    <Input 
        name="log"
        placeholder="Login" 
    />
    </Col> 
    </Row>
    <Row>
    <Col>
    Password 
    </Col>
    <Col>
    <Input 
        name="psw" 
        placeholder="password" 
    />
    </Col>
    </Row> 
    <Row>
    <Col>
    Number of Livingrooms
    </Col>
    <Col>
    <InputNumber  
        name="nlr"
    />
    </Col>
    </Row>
    <Input 
        type='submit' 
        value="add admin" 
    />
</form>

                            </TabPane>
                        </Tabs>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>copyright ©2020</Footer>
                    </Layout>
                </Layout>                
                
            </Layout>
        </div>
      );
    }
  }
    
  export default Cons;
