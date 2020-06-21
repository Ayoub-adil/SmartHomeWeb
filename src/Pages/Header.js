import React , {Component} from 'react';
import Toolbar from '../components/Toolbar/Toolbar';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import Backdrop from '../components/Backdrop/Backdrop'
// import Landing from './Landing.js'
// import { Switch } from 'antd';
// import backdrop from '../components/Backdrop/Backdrop';


class Header extends Component {
  state = {
    SideDrawerOpen : false
  };
   
   onChange=(checked) => {
    console.log(`switch to ${checked}`);
  }


  drawerToggleClickHandler = () => {
    this.setState((prevState)=> {
      return{SideDrawerOpen : !prevState.SideDrawerOpen};
    });
  };

backdropClickHandler = () => {
    this.setState({SideDrawerOpen : false});
};


  render (){
    let sideDrawer;
    let backdrop;

    if(this.state.SideDrawerOpen){
      
      backdrop= <Backdrop  click={this.backdropClickHandler}/>
    }
    return (
          <div  style={{height :'100%'}} className="App">
            <Toolbar drawerClickHandler= {this.drawerToggleClickHandler} />
            <SideDrawer show={this.state.SideDrawerOpen}/>
            {backdrop}
            <main style={{marginTop:'64px '}}>
             
              
            </main>
          </div>
    )}
  };

export default Header;