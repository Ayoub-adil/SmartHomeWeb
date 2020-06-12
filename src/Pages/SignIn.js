import React, {Component, Fragment} from 'react';
import { Alert,} from 'antd';
import key from '../images/key4.png';
import '../App.css';
import ServerError from './ServerError';


class SignIn extends Component{

    constructor(props){
		super(props);
		this.state={
            server:false,
			msg : "pas de message"
        } 
        this.WorkingServer();
        this.WorkingServer=this.WorkingServer.bind(this);

		this.login();
		this.login=this.login.bind(this)
    }
    WorkingServer(){
        fetch('/server').then(res=>res.json()).then(data=>{
          this.setState({
            server: data.server,
          });
        })
      }

	login(){
		fetch('/user/login')
		.then(res=>res.json())
		.then(data=>{this.setState({ msg : data.msg })})
    }
    
    render(){
      return(
        <div className="App">
        {this.state.server
        ?
        <Fragment>
        <div className="right">
            <img className='imgkey' src={key}></img>
        </div>

        <div className="left">
            <h1>Hello <span className="smarthome">User</span></h1>
            <p>Authenticate your account</p>
            {(this.state.msg === "pas de message")? null:<Alert message={this.state.msg} type="error" closeText="Close" showIcon />}
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
        </Fragment>
        :
        <ServerError/>
        }
        </div>
);
}
}

export default SignIn;
