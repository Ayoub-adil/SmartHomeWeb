import React, {Component} from 'react';
import { Alert} from 'antd';
import { Row, Col, Modal } from 'antd';
import prof from '../images/profil.png'
import '../App.css';
import UsersTab from './UsersTab.js';
import Header from './Header.js';

class Profil extends Component{

  constructor(props){
		super(props);
		this.state={
      server:false,
      msg : "pas de message",
      visible: false
        } 
    this.WorkingServer();
    this.WorkingServer=this.WorkingServer.bind(this);

		this.AddUser();
		this.AddUser=this.AddUser.bind(this)
    }

    WorkingServer(){
      fetch('/server').then(res=>res.json()).then(data=>{
        this.setState({
          server: data.server,
        });
      })
    }
    AddUser(){
      fetch('/UserForm')
      .then(res=>res.json())
      .then(data=>{this.setState({ msg : data.msg })})
      }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
    
    render(){
      
      return(
        
        <div className="App">
          <Header />
          <center>
            <div className="leftPrf">
            <div>
              <img className='imgke' src={prof}></img>
              <p>Hello, You are the administrator of your own Home!</p>
              <p>You can Add or delete users in this application.</p>
              <div>
              <button className="btnProfil" type="submit" onClick={this.showModal}>Add User</button>
              {(this.state.msg === "pas de message")?null:<Alert message={this.state.msg} type="success" closeText="Close" showIcon  />}
              </div>
              </div>
              <div className="gridprofil">
              <UsersTab />
              </div>

          <Modal
          title="Add new users here"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
              
          <form action="/UserForm" method="post">
            <div className="formStyle">
              <label style={{marginRight:10}}>Login : 
              <input type="text" name="login" required style={{marginLeft:10}}/>
              </label>
              <label className="pasw">Password : 
              <input type="password" name="psw" required style={{marginLeft:10}}/>	
              </label>
              <center>
              <button className="btnProfil" type="submit">Add</button>
              </center>
            </div>
          </form>
        </Modal>
            </div>
            </center>  
        </div>
      );
    }
  }
    
  export default Profil;





