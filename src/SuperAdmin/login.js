import React, {Component} from 'react';
import './style.css';

class Login extends Component{
    render(){
      return(
        <div className="App">
            <div class="login">
			<h1>Login</h1>
			<form action="loginDirecteur" method="post">
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
		</div>
        </div>
      );
    }
  }
    
  export default Login;





