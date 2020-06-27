import React, {Component} from 'react';
import { Row, Col,} from 'antd';
import { Alert,} from 'antd';
import { Button} from 'antd'
import '../App.css';


class UsersTab extends Component{
  constructor(props){
    super(props);
    this.api='192.168.1.12:5000'
    this.state={
        server:false,
        user:'User',

        login:"",
        psw:"",
        msg:"pas de message"
    }


    this.getUsers();
    this.getUsers=this.forceUpdate.bind(this)

    this.delUser();
    this.delUser=this.delUser.bind(this)
    
  }

  getUsers(){
    fetch('users/tab')
    .then(res=>res.json())
    .then(data=>{this.setState({
      login : data.login,
      psw:data.psw
    })})
  }
    
  delUser(){
    fetch('/users/supp')
    .then(res=>res.json())
    .then(data=>{this.setState({
      msg: data.msg
    })})
  }
    
    render(){
      
      return(
        <div className="App" style={{textAlign:"center"}}>
            {(this.state.msg === "pas de message")? null:<Alert message={this.state.msg} type="success" closeText="Close" showIcon />}
          
              <Row style={{backgroundColor:"#7AAFFD", color:"#F9F9F9"}}>
                <Col span={8}>Login</Col>
                <Col span={8}>Password</Col>
                <Col span={8}>Operation</Col>
              </Row>
              
              {[...this.state.login].map((e,i)=>
             
              <Row>
                <Col span={8}>{this.state.login[i]}</Col>
                <Col span={8}>{this.state.psw[i]}</Col>
                <Col span={8}><Button  danger shape="round" size="small" onClick={
                   () => {
                    fetch('/users/supp', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        login:this.state.login[i],
                        
                      })
                    })
                  window.location.reload()
                  }
                 

                
                  
                }>Delete</Button></Col>
              </Row>)}
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





