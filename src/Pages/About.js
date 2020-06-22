/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from 'react';
import {Col, Row} from 'antd';
import logo from '../images/about.png'
import pc from '../images/pc.png'
import contact from '../images/profil.jpg'
import contacta from '../images/profila.jpg'
import '../App.css';
import Header from './Header.js';
import { ContactsTwoTone , LockTwoTone , EyeTwoTone , SmileTwoTone} from '@ant-design/icons';
import { Avatar } from 'antd';



const iframe = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6638.24682793055!2d-7.355426868200157!3d33.7057553203173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7b6d37fd56af5%3A0x5e62c736d5933ac1!2sFacult%C3%A9%20des%20Sciences%20et%20Techniques!5e0!3m2!1sfr!2sma!4v1592725881607!5m2!1sfr!2sma" width="100%" height="300" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0">    </frame>'; 
function Iframe(props) {
  return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
}


class About extends Component{


  constructor(props){
		super(props);
		this.state={
      user:'User',
      msg : "pas de message",
        } 
  
      this.session();
      this.session=this.session.bind(this);

    }   
    session(){
      fetch('/session').then(res=>res.json()).then(data=>{
        this.setState({
          user: data.user,
        });
      })
    }
    
    render(){
      
      return(
        
        <div className="App">
        {this.state.user==='User'?null:<Header />}
      <Row className="AboutCard">
      <Col span={12}>
      <div className='desc' style={{ marginTop:"5%"}}>
          <h1 style={{ fontWeight:"bold"}}> WHO WE ARE ?</h1>
          <p>What if all the devices in your life could connect to the internet ?
            <br/> Smart Home is a company that gives you a virtual key to control your own house using a mobile phone or a computer.
            <br/> Our service provides you Confort, security and more....
            <br/> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
      </div>
      </Col>
      <Col span={12}>
      <div className='log'>
          <img src={logo}/>
      </div>
      </Col>
      </Row>

      <Row className="AboutCard2">
      <Col span={12}>
      <div className='weare'>
          <h1 style={{ fontWeight:"bold" , paddingTop:100}}>You can use our app for either iOS or Android, and our website can be used with any browsers!</h1>
      
      </div></Col>  
      <Col span={12}>
      <div className='log'>
        <img style={{ width:"90%"}} src={pc}/>
      </div> </Col>  
      
      </Row>

      <h1 style={{ margin:'20px', textAlign:'center', fontWeight:"bold"}}>Our services</h1>
      <Row className=''>
      
        <Col className='btnCrd' style={{marginLeft:45}}>        
        <Avatar size={60} style={{ color: '#007bff' , background:'none' }}icon={<LockTwoTone />}/>
        <span className="titleroom">Security</span> 
        <ul>
          <li>Door System</li>
          <li>Windows System</li>
          <li>Smoke detector</li>
        </ul>
        </Col>
        
        <Col className='btnCrd'>        
        <Avatar size={60} style={{ color: '#007bff' , background:'none' }}icon={<SmileTwoTone />}/>
        <span className="titleroom">Comfort</span> 
        <ul>
          <li>Light movement detector</li>
          <li>Temperature adjustment</li>
          <li>Rooms Lights</li>
        </ul>
        </Col>
        <Col className='btnCrd'>        
        <Avatar size={60} style={{ color: '#007bff' , background:'none' }}icon={<EyeTwoTone />}/>
        <span className="titleroom">Consultation of information</span> 
        <ul>
          <li>Rain detector</li>
          <li>Outside Temperature detector</li>
        </ul>
        </Col>
    </Row>

      <h1 style={{ margin:'20px', textAlign:'center',  fontWeight:"bold" }}>Contacts</h1>
      <Row className=''>
      
        <Col className='btnCrd' style={{marginLeft:45}}>
        <img className='pdp' src={contact}/>
        <h2 className="titleroom">Ayoub ADIL</h2> 
        <p>Student at the university of sciences and techniques of Mohammedia.
          <br/> Bachelor in Computer Science, Network and Multimedia.
        </p>
        <Avatar size={50} style={{ color: '#007bff' , background:'none' }}icon={<ContactsTwoTone />}/>
        <a href = "mailto: ayoub.adil0406@gmail.com">ayoub.adil0406@gmail.com</a>
        </Col>
        
        <Col className='btnCrd'>
        <img className='pdp' src={contacta}/>
        <h2 className="titleroom">Imane CHBIRA</h2>
        <p>Student at the university of sciences and techniques of Mohammedia.
        <br/> Bachelor in Computer Science, Network and Multimedia.</p>
        <Avatar size={50} style={{ color: '#007bff' , background:'none' }}icon={<ContactsTwoTone />}/>
        <a href = "mailto: Imane.chbira@gmail.com">Imane.chbira@gmail.com</a>
        </Col>
        
        <Col className='btnCrd'>
        <img className='pdp' src={contacta}/>
        <h2 className="titleroom">Oumayma ESSEMRHOUNI</h2>
        <p>Student at the university of sciences and techniques of Mohammedia.
        <br/> Bachelor in Computer Science, Network and Multimedia.</p> 
        <Avatar size={50} style={{ color: '#007bff' , background:'none' }}icon={<ContactsTwoTone />}/>
        <a href = "oumaymaessemrhouni@gmail.com">oumaymaessemrhouni@gmail.com</a>
        </Col>
    </Row>
<Iframe iframe={iframe} />
        </div>
      );
    }
  }
    
  export default About;





