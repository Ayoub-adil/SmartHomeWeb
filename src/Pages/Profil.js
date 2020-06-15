import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Modal} from 'antd';
import prof from '../images/profil.png'
import '../App.css';

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
            <div className="rightPrf">
            <div className="rightimg">
              <img className='imgke' src={prof}></img>
            </div>
              <p>Hello, You are the administrator of your own Home!</p>
              <p>You can Add or delete users in this application.</p>
              <button type="submit" onClick={this.showModal}>Add admin</button>
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
        </div>
      );
    }
  }
    
  export default Profil;





