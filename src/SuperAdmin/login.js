import React, {Component} from 'react';
import './style.css';

class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			msg : "pas de message",
			err : false,
		} 
		this.login();
		this.login=this.login.bind(this)
	}

	login(){
		// {this.restart()}
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
			{(this.state.msg === "pas de message")? this.state.err=false:this.state.err=true}
			<div style={{backgroundColor: "white" , color:'red', padding:20, textAlign:"center"}}>{(this.state.err)? <> Login failed :<br/> {this.state.msg} </>:null}</div>
		</div>
		</div>
		</>
      );
    }
  }
    
  export default Login;





