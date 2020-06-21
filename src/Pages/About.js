/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from 'react';
import {Col, Row} from 'antd';
import logo from '../images/house.webp'
import contact from '../images/profil.jpg'
import contacta from '../images/profila.jpg'
import '../App.css';
import Header from './Header.js';
import { DollarCircleOutlined} from '@ant-design/icons';
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
      <Row>
      <div className='desc'>
          <h1>Description</h1>
          <p>Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella, deinde aetatem ingressus adultam post multiplices bellorum aerumnas Alpes transcendit et fretum, in iuvenem erectus et virum ex omni plaga quam orbis ambit inmensus, reportavit laureas et triumphos, iamque vergens in senium et nomine solo aliquotiens vincens ad tranquilliora vitae discessit.</p>
      </div>
      <div className='log'>
          <img src={logo}/>
          <h1><h2>Smart <span style={{ color: '#007bff',}}>Home</span></h2></h1>
      </div>
      </Row>

      <Row>
      <div className='log'>
        <img src={logo}/>
        <h1><h2>Smart <span style={{ color: '#007bff',}}>Home</span></h2></h1>
      </div>      
      <div className='weare'>
          <h1>We Are :</h1>
          <p>Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella, deinde aetatem ingressus adultam post multiplices bellorum aerumnas Alpes transcendit et fretum, in iuvenem erectus et virum ex omni plaga quam orbis ambit inmensus, reportavit laureas et triumphos, iamque vergens in senium et nomine solo aliquotiens vincens ad tranquilliora vitae discessit.</p>
      </div>
      </Row>

      <h1 style={{ marginLeft:'20px' }}>Deals</h1>
      <Row className=''>
      
        <Col className='btnCrd'>        
        <Avatar size={60} style={{ color: '#007bff' , background:'none' }}icon={<DollarCircleOutlined />}/>
        <span className="titleroom">999$</span> 
        <p>Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella.</p>
        </Col>
        
        <Col className='btnCrd'>        
        <Avatar size={60} style={{ color: '#007bff' , background:'none' }}icon={<DollarCircleOutlined />}/>
        <span className="titleroom">1499$</span> 
        <p>Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella.</p>
        </Col>
        
        <Col className='btnCrd'>        
        <Avatar size={60} style={{ color: '#007bff' , background:'none' }}icon={<DollarCircleOutlined />}/>
        <span className="titleroom">1749$</span> 
        <p>Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella.</p>
        </Col>
    </Row>

      <h1 style={{ marginLeft:'20px' }}>Contacts</h1>
      <Row className=''>
      
        <Col className='btnCrd'>
        <img className='pdp' src={contact}/>
        <h2 className="titleroom">Ayoub ADIL</h2> 
        <p>Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella.</p>
        </Col>
        
        <Col className='btnCrd'>
        <img className='pdp' src={contacta}/>
        <h2 className="titleroom">Imane CHBIRA</h2>
        <p>Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella.</p> 
        </Col>
        
        <Col className='btnCrd'>
        <img className='pdp' src={contacta}/>
        <h2 className="titleroom">Oumayma ESSEMRHOUNI</h2>
        <p>Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella.</p> 
        </Col>
    </Row>
<Iframe iframe={iframe} />
        </div>
      );
    }
  }
    
  export default About;





