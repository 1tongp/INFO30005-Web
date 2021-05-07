import logo from '../images/logo.png';
import cart from '../images/landing.png'
import m from '../images/menu.png';
import click from '../images/click.png';
import discount from '../images/discount.png';
import React,{useState} from 'react';
import '../ShoppingCart/styles.css';
import './Main.css';
import { Layout, Button} from 'antd';
import {ShoppingOutlined, CopyrightOutlined, UserOutlined, MenuOutlined, ProfileOutlined} from '@ant-design/icons';
import{Modal, Form} from 'react-bootstrap';
// import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../API/axios.js';

const { Header, Footer, Content } = Layout;

//this function will implement the customer page strcture (the map and choosing vans have not been implemented yet)
export default function Main (props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loginEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = () => {
        axios.post('/customer/login', {loginEmail: loginEmail, password: password}).then(response =>{
        console.log(props);
        console.log(response);
        if(response.data.success){
          // props push the customer information
          props.history.push('/customer', {customer: response.data.customer});
        }
        else{
          alert(response.data.error)
        }
      }).catch(error => {
        console.log(error.response.data.message)
        alert(error.response.data.message)
      })
    }

    // if customer want to view menu without loggin, the loggin step can be skip
    // since the map feature has not been placed yet, we assume that customer will order the snacks from a given vendor
    const onSkip = () => {
        props.history.push('/menupreview',{
            vendor: "6082092adf7e59001590d377"
        });  
    }
    
    return (
        <Layout>
            <Header className='header_container'>              
                <img src={logo} alt="logo image" className='logo'/>
                <p className='header_loc'>Current Location: <a className='lc_url'> Union House</a></p>                   
                <div className='mid_nav'>
                    <input type='checkbox' id='n_check'></input>
                    <div class='hamburger'>
                        <label for='n_check'>
                            <MenuOutlined className='icon'/>
                        </label>
                    </div>
                    <div className='links'>
                        <a className='header_text' href=''>HOME</a>
                        <a className='header_text' href=''>MENU</a>
                        <a className='icon' href=''><ShoppingOutlined /></a>
                        <div className='drop'>
                            <a className='icon'><UserOutlined /></a>
                            <div className='u_drop_content'>
                                <a href=''>Log In</a>
                                <a href=''>Sign Up</a>
                            </div>
                        </div>
                    </div>
                </div>

            </Header>

            <Modal show={show} onHide={handleClose} style={{ marginTup: '2vh' }}
                size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>                  
                    <Modal.Title>LOG IN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="loginEmail" placeholder="Enter email"
                                onChange={e => setEmail(e.target.value)} />
                            <Form.Text className="text-mutes">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <br />
                    <Button variant="success" onClick={onLogin}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>

            <Content className=''>
                <img src={cart} className='main_img'/>
                <div className="col-menu">
                    <div className="col-img"><img src={m} /></div>
                    <div className="col-img"><img src={click} alt="" /></div>
                    <div className="col-img"><img src={discount} alt="" /></div>
                </div>

                {/* the map will be implement in next due, also the choosing vans on the map*/} 
                <div className='section'>
                    <br /><br /><br /><br />

                    <div className='button_container'>
                        <Button onClick={handleShow}>
                            <UserOutlined className='main_btn'/>
                            Login and Order
                        </Button>

                        {/* click the button to skip the login step*/} 
                        <Button onClick={onSkip}>     
                            <ProfileOutlined className='main_btn'/>                      
                            View Menu without Login
                        </Button>
                    </div>

                </div>
                <div className="about">
                    <div className="about-card">
                        <h2 >ABOUT US</h2>
                        <br/>
                        <div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, nulla pariatur! Laborum odit modi, sapiente ex soluta eum quos natus, optio architecto, porro ab qui corporis quas! Culpa, dolorem illum!
                                </p>
                            </div>
                    </div>
                </div>     
            </Content>     

            <Footer>
                <p>
                <CopyrightOutlined /> SNACKS IN A VAN
                <br />
                All Rights Reserved
                </p>
            </Footer>
        </Layout>
    )
}