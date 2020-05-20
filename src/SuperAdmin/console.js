import React, {Component} from 'react';
import { Layout, Tabs , Avatar, Breadcrumb,Form, Input, InputNumber, Button  } from 'antd';
import { UserOutlined, TableOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import './console.css';
import '../App.css';
import Title from 'antd/lib/typography/Title';
import Password from 'antd/lib/input/Password';
import Dashboard  from './Dashboard.js';
import Formulaire from './Formulaire.js';
const { TabPane } = Tabs;

const { Header, Footer, Content } = Layout;

function onChange(value) {
    console.log('changed', value);
}

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
};

const onFinish = values => {
    console.log(values);
};

  

class Console extends Component{

    // on annule had fetch 7it faut qu'on enovie les donnees du formulaire machi ghir nmchiw la page
    // Traitement() {
    //     fetch('/traitementForm')
    // }

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
                                        <Formulaire />
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
    
  export default Console;
