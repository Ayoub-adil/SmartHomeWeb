import React, {Component} from 'react';
import './console.css';
import { Alert} from 'antd';

import logo from '../images/logo.png';

class Formulaire extends Component{
    constructor(props){
		super(props);
		this.state={
            server:false,
			msg : "pas de message"
        } 
        this.WorkingServer();
        this.WorkingServer=this.WorkingServer.bind(this);

		this.AddAdmin();
		this.AddAdmin=this.AddAdmin.bind(this)
    }
    WorkingServer(){
        fetch('/server').then(res=>res.json()).then(data=>{
          this.setState({
            server: data.server,
          });
        })
      }

	AddAdmin(){
		fetch('/spForm')
		.then(res=>res.json())
		.then(data=>{this.setState({ msg : data.msg })})
    }
    

    render(){
      return(
        <div className="App">

            <form action="/spForm" method="post">

                <div className="formStyle">
                {(this.state.msg === "pas de message")?null:<Alert message={this.state.msg} type="error" closeText="Close" showIcon  />}
                <label >Login : <br/>
                    <input type="text" name="log" required />
			    </label>
          </div>
          <div className="formStyle">
                <label className="pasw">Password : <br/>
                    <input type="password" name="psw" required />	
				</label>
                </div>

                {/* <div className="formStyle">
				
                </div> */}
                <div className="formStyle">
				<label>Adress : <br/>
                  <input type="text"name="adress" required />	
				</label>
        
        </div>
        <div className="formStyle">
        <label>Installation date : <br/>
                   <input  type="date" name="date" required />	
				</label>
                </div>
                <div className="formStyle">
				<label>Living room number :<br/>
                    <input type="number" name="nlr" min="0" max="11" required />	
				</label>
                </div>

                <div className="formStyle">
				<label>Bedroom number :<br/>
                    <input type="number" name="nbr" min="0" max="11" required />	
				</label>
                </div>

                <div className="formStyle">
				<label>Kitchen number :<br/>
                    <input type="number" name="nk" min="0" max="11" required />	
				</label>
                </div>

                <div className="formStyle">
				<label>Stairs number :<br/>
                    <input type="number" name="ns" min="0" max="11" required />	
				</label>
                </div>

                <div className="formStyle">
				<label>Check if the Client has a garage : 
                    <input style={{margin:10}} type="checkbox"name="ng" />	
				</label>
                </div>
                

                <input className='addAdmin' type="submit" value="Add admin" />

				
            </form>

            <div>
            <img className='imglogo2' src={logo}></img>
            </div>
            
        </div>
      );
    }
  }
    
  export default Formulaire;





