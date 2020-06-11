import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './console.css';
import { List } from 'antd/lib/form/Form';

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
      }
      
      this.recup();
      this.recup=this.recup.bind(this)


    }

    recup(){
      fetch('/Dash/recupp')
      .then(res=>res.json())
      .then(data=>{this.setState({ 
        login : data.login,
        livingroom : data.livingroom,
        bednum:data.bednum,
        kitchen: data.kitchen,
        stairs:data.stairs,
        garage:data.garage})})
    }

    



    render(){
      
      return(
        <div className="App">
           {/* {[...this.state.login].map((e,i)=>
           <p>{this.state.login[i+1]}
           <h1>{this.state.psw[i]}</h1></p>
          )} */}
           
          
          <table>
            <tr>
              <th>ID</th>
              <th>login</th>
              <th>Living room number</th>
              <th>Beedroom number</th>
              <th>Kitchen number</th>
              <th>Stairs number</th>
              <th>Garage number</th>
              <th>Action</th>
            </tr>
            {[...this.state.login].map((e,i)=>
            <tr>
            <td>{i+1}</td>
            <td>{this.state.login[i]}</td>
            <td>{this.state.livingroom[i]}</td>
            <td>{this.state.bednum[i]}</td>
            <td>{this.state.kitchen[i]}</td>
            <td>{this.state.stairs[i]}</td>
            <td>{this.state.garage[i]}</td>
           
            <td><a href='#'>Delete</a></td>
          </tr>)}
          
           
           
           </table> 
        </div>
      );
    }
  }
    
  export default Dashboard;





