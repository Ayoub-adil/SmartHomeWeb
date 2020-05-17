import React, {Component} from 'react';
import './console.css';

class Dashboard extends Component{
    render(){
      return(
        <div className="App">

          <table>
            <tr>
              <th>Login</th>
              <th>Password</th>
              <th>Living room number</th>
              <th>Bedroom number</th>
              <th>Kitchen number</th>
              <th>Stairs number</th>
              <th>Garage number</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>user 1</td>
              <td>vhzvsddjbdhcsdh</td>
              <td>3</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td><a href='#'>Delete</a></td>
            </tr>
            <tr>
              <td>user 2</td>
              <td>xzevgf5347923e</td>
              <td>2</td>
              <td>1</td>
              <td>1</td>
              <td>2</td>
              <td>1</td>
              <td><a href='#'>Delete</a></td>
            </tr>
          </table>
            
        </div>
      );
    }
  }
    
  export default Dashboard;





