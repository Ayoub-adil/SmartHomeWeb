import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './console.css';
import { List } from 'antd/lib/form/Form';
import { Alert,} from 'antd';
class Dashboard extends Component{
    constructor(props){
      super(props);
      this.state={
                 login:"",
                 livingroom:"",
                 bednum:"",
                 kitchen:"",
                 stairs:"",
                 garage:"",
                 adress:"",
                 date:"",
                 msg : ""
      }
      
      this.recup();
      this.recup=this.recup.bind(this)

      this.AddAdmin();
		  this.AddAdmin=this.AddAdmin.bind(this)

    }

    recup(){
      fetch('/Dash/recupp')
      .then(res=>res.json())
      .then(data=>{this.setState({ 
        login : data.login,
        adress:data.adress,
        date:data.date,
        livingroom : data.livingroom,
        bednum:data.bednum,
        kitchen: data.kitchen,
        stairs:data.stairs,
        garage:data.garage})})
    }

    AddAdmin(){
      fetch('/spForm')
      .then(res=>res.json())
      .then(data=>{this.setState({ msg : data.msg })})
      }
      


    render(){
      
      return(
        <div className="App">
           {/* {[...this.state.login].map((e,i)=>
           <p>{this.state.login[i+1]}
           <h1>{this.state.psw[i]}</h1></p>
          )} */}
           
           {(this.state.msg === "succes")?<Alert
            message="Success"
            description="Adding completed successfully"
            type="success"
            showIcon
            closeText="Close"/>:null}
          <table>
            <tr>
              <th>ID</th>
              <th>login</th>
              <th>Livingrooms</th>
              <th>Beedrooms</th>
              <th>Kitchens</th>
              <th>Stairs</th>
              <th>Garage</th>
              <th>installation date</th>
              <th>address</th>
            </tr>
            {[...this.state.login].map((e,i)=>
            <tr>
            <td>{i+1}</td>
            <td>{this.state.login[i]}</td>
            <td>{this.state.livingroom[i]}</td>
            <td>{this.state.bednum[i]}</td>
            <td>{this.state.kitchen[i]}</td>
            <td>{this.state.stairs[i]==='0'?<span>None</span>:this.state.stairs[i]}</td>
            <td>{this.state.garage[i]==='on'?<span>Yes</span>:<span>No</span>}</td>
            <td>{this.state.date[i]}</td>
            <td>{this.state.adress[i]}</td>
           
            
          </tr>)}
          
           
           
           </table> 
        </div>
      );
    }
  }
    
  export default Dashboard;





