import React, {Component} from 'react';
import './console.css';

class Formulaire extends Component{
    render(){
      return(
        <div className="App">

            <form action="/spForm" method="post">

                <div className="formStyle">
                <label style={{marginRight:10}}>Login : 
                    <input type="text" name="log" required style={{marginLeft:10}}/>
			    </label>
                <label style={{marginLeft:30}}>Password : 
                    <input type="password" name="psw" required style={{marginLeft:10}}/>	
				</label>
                </div>

                {/* <div className="formStyle">
				
                </div> */}

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
                    <input style={{margin:10}} type="checkbox"name="ng" required />	
				</label>
                </div>

                <input className='addAdmin' type="submit" value="Add an admin" />

				
            </form>
            
        </div>
      );
    }
  }
    
  export default Formulaire;





