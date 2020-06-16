import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Modal } from 'antd';
import prof from '../images/profil.png'
import '../App.css';
import UsersTab from './UsersTab.js';
import Header from './Header.js';

class Profil extends Component{
    
  state = { visible: false };

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
              <button className="btnProfil" type="submit" onClick={this.showModal}>Add admin</button>
              </div>
              </div>

              <div className="gridprofil">
              <UsersTab />
              {/* <Row style={{backgroundColor:"#7AAFFD", color:"#F9F9F9"}}>
                <Col span={8}>Login</Col>
                <Col span={8}>Password</Col>
                <Col span={8}>Operation</Col>
              </Row>
              <Row>
              <Col span={8}>Oumayma</Col>
                <Col span={8}>12345</Col>
                <Col span={8}>Delete</Col>
              </Row> */}
                {/* <table className="tbl">
                  <tr>
                    <th>Login</th>
                    <th>Password</th>
                    <th>Operation</th>
                  </tr>
                  <tr>
                    <td>Oumayma</td>
                    <td>12345</td>
                    <td>Delete</td>
                  </tr>
                </table> */}
              </div>



          
          <Modal
          title="Add new users here"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
              
          <form action="#" method="post">
            <div className="formStyle">
              <label style={{marginRight:10}}>Login : 
              <input type="text" name="log" required style={{marginLeft:10}}/>
              </label>
              <label className="pasw">Password : 
              <input type="password" name="psw" required style={{marginLeft:10}}/>	
              </label>
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





