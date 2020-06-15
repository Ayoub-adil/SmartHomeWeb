import React, {Component} from 'react';
import './console.css';
import { Alert} from 'antd';

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
                <label style={{marginRight:10}}>Login : 
                    <input type="text" name="log" required style={{marginLeft:10}}/>
			    </label>
                <label className="pasw">Password : 
                    <input type="password" name="psw" required style={{marginLeft:10}}/>	
				</label>
                </div>

                {/* <div className="formStyle">
				
                </div> */}
                <div className="formStyle">
				<label style={{marginRight:10}}>Adress :
                  <input style={{margin:10}} type="text"name="adress" required style={{marginRight:10}}/>	
				</label>
        
        
        <label>Installation date : 
                   <input  type="date" name="date" required style={{marginRight:10}} />	
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
				<label>Garage : 
                    <input style={{margin:10}} type="checkbox"name="ng" />	
				</label>
                </div>
                

                <input className='addAdmin' type="submit" value="Add admin" />

				
            </form>
            
        </div>
      );
    }
  }
    
  export default Formulaire;





