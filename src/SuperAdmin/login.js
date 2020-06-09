import React, {Component} from 'react';
import { Alert } from 'antd';
import './style.css';

import logo from '../images/logo.png';

class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			msg : "pas de message",
		} 
		this.login();
		this.login=this.login.bind(this)
	}

	login(){
		fetch('/SuperAdmin/loginDirecteur')
		.then(res=>res.json())
		.then(data=>{this.setState({ msg : data.msg })})
	}
	
	
    render(){

      return(
		<>		
        <div className="AppLogin">
            <div class="login">
			<h1>Login</h1>
			<Alert message="Warning" description="Space reserved for the company's SuperAdmin / rohibited to the public" type="warning" showIcon />
			{/* <Alert message="Warning : Space reserved for the company's SuperAdmin" type="warning" showIcon/> */}
			<form action="/SuperAdmin/loginDirecteur" method="post">
				<label for="username">
					<i class="fas fa-user"></i>
				</label>
				<br/>
				<input type="text" name="username" placeholder="Username" id="username" required />
				
				<label for="password">
					<i class="fas fa-lock"></i>
				</label>
				<input type="password" name="password" placeholder="Password" id="password" required />
				<div class="msg"></div>
				<input type="submit" value="Login" />
			</form>
			{(this.state.msg === "pas de message")? null:<> <Alert message={this.state.msg} type="error" closeText="Close" showIcon/> </>}
		</div>
		<div>
			<img className='imglogo' src={logo}></img>
		</div>
		</div>
		</>
      );
    }
  }
    
  export default Login;





