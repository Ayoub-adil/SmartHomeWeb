import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Modal } from 'antd';
import prof from '../images/profil.png'
import '../App.css';

class UsersTab extends Component{
    
    render(){
      
      return(
        <div className="App" style={{textAlign:"center"}}>
              
              <Row style={{backgroundColor:"#7AAFFD", color:"#F9F9F9"}}>
                <Col span={8}>Login</Col>
                <Col span={8}>Password</Col>
                <Col span={8}>Operation</Col>
              </Row>
              <Row>
              <Col span={8}>Oumayma</Col>
                <Col span={8}>12345</Col>
                <Col span={8}>Delete</Col>
              </Row>
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
      );
    }
  }
    
  export default UsersTab;





