import React, {Component} from 'react';
import { Alert, Input, Button} from 'antd';
import './style.css';

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
        <div className="App">
            <div class="login">
			<h1>Login</h1>
			<form action="/SuperAdmin/loginDirecteur" method="post">
				<label for="username">
					<i class="fas fa-user"></i>
				</label>
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
		</div>
		</>
      );
    }
  }
    
  export default Login;





