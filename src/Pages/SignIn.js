import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Alert, Input, Button} from 'antd';
import key from '../images/key4.png';
import '../App.css';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

class SignIn extends Component{

    constructor(props){
		super(props);
		this.state={
			msg : "pas de message"
		} 
		this.login();
		this.login=this.login.bind(this)
	}

	login(){
		fetch('/user/login')
		.then(res=>res.json())
		.then(data=>{this.setState({ msg : data.msg })})
    }
    
    render(){
      return(
        <> 
  <div className="App">
    <div className="right">
        <img className='imgkey' src={key}></img>
    </div>

    <div className="left">
        <h1>Hello <span className="smarthome">User</span></h1>
        <p>Authenticate your account</p>
        {(this.state.msg === "pas de message")? null:<> <Alert message={this.state.msg} type="error" closeText="Close" showIcon /> </>}
        <form action="/user/login" method="post"> 
            <div className="formStyle">
            <label>Login : <br/>
                <input style={{width: '100%', margin: '1px 0'}} type="text" name="log" required />
			</label>
            </div>

            <div className="formStyle">
			<label>Password :<br/>
                <input style={{width: '100%', margin: '4px 0'}} type="password" name="psw" required />	
			</label>
            </div>

            <input style={{width: '80%', padding: '10px 20px' , margin: '20% 0%'}} className='signIn' type="submit" value="Sign in" />
           
        </form>
        
    </div>
    
  </div>
  </>
);
}
}

export default SignIn;
