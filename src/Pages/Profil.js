/* eslint-disable jsx-a11y/alt-text */
import React, {Component, Fragment} from 'react';
import { Alert} from 'antd';
import { Modal } from 'antd';
import prof from '../images/profil.png'
import '../App.css';
import UsersTab from './UsersTab.js';
import Header from './Header.js';
import ServerError from './ServerError';
import SignIn from './SignIn';

class Profil extends Component{

  constructor(props){
		super(props);
		this.state={
      server:false,
      user:'User',
      msg : "pas de message",
      visible: false
        } 
      this.WorkingServer();
      this.WorkingServer=this.WorkingServer.bind(this);
  
      this.session();
      this.session=this.session.bind(this);

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
    session(){
      fetch('/session').then(res=>res.json()).then(data=>{
        this.setState({
          user: data.user,
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
{this.state.server
?
<Fragment>
{this.state.user==='User'?
<SignIn/>
:
<Fragment>

          <Header />
          <center>
            <div className="leftPrf">
            <div>
              <img className='imgke' src={prof}></img>
              <p>Hello <span className="smarthome">{this.state.user}</span>, You are the Owner of this House !</p>
              <p>Your <span className="smarthome">family members</span> can join us</p>
              <div>
              <button className="btnProfil" type="submit" onClick={this.showModal}>Add Member</button>
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
              <button className="btnProfil" type="submit">Add admin</button>
              </center>
            </div>
          </form>
        </Modal>
            </div>
            </center>  
</Fragment>
}
</Fragment>
:
<ServerError/>
}
        </div>
      );
    }
  }
    
  export default Profil;





