import React, {Component} from 'react';
import './console.css';

class Formulaire extends Component{
    render(){
      return(
        <div className="App">

            <form action="#" method="post">

                <div className="formStyle">
                <label>Login : <br/>
                    <input type="text" name="log" id="username" required />
			    </label>
                </div>

                <div className="formStyle">
				<label>Password :<br/>
                    <input type="password" name="psw" id="password" required />	
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
				<label>Garage number :<br/>
                    <input type="number" name="ng" min="1" max="11" required />	
				</label>
                </div>

                <input className='addAdmin' type="submit" value="Add an admin" />

				
            </form>
            
        </div>
      );
    }
  }
    
  export default Formulaire;





