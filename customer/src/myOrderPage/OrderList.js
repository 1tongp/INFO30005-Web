import React, { useState, useEffect } from 'react';
import './MyOrder.css';
import { Jumbotron, Modal, Form } from 'react-bootstrap';
import { Layout, Button } from 'antd';
import { ShoppingOutlined, UserOutlined, MenuOutlined, CopyrightOutlined } from '@ant-design/icons';
import '../ShoppingCart/styles.css';
import OrderListCom from '../components/OrderListCom.js'
import { useHistory } from "react-router-dom";
import logo from '../images/logo.png';
import axios from '../API/axios.js';
import './myorderheader.css';
import MyFooter from '../components/Footer.js';
import { message } from 'antd';
import { Component } from 'react';

const { Header, Footer, Content } = Layout;

// function to loop particular custmomer's orders
export default function OrderList(props) {
    let history = useHistory();
    console.log(props);

    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [vendors, setVendors] = useState([]);
    // const [target, setTarget] = useState('');
    // const [status, setStatus] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [firstName, setFirstName] = useState(props.location.state.customer.givenName);
    const [lastName, setLastName] = useState(props.location.state.customer.familyName);
    const [password, setPassword] = useState('');

    useEffect(() => {
        // setTarget('customer');
        // setStatus('&status=outstanding');
        // console.log(target);
        // console.log(status);
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
        });
        axios.get('/vendor?lat=' + lat + '&lng=' + lng).then(response => {
            console.log(response)
            setVendors(response.data.vendors)
        })
    }, [lat, lng])

    const onCustomerLogin = () => {
        axios.post('/customer/loginhash', { loginEmail: props.location.state.customer.loginEmail, password: props.location.state.customer.password }).then(response => {
            console.log(props);
            console.log(response);
            if (response.data.success) {
                // props 在这里用于页面和页面之间传递内容（也可以组件之间传递，大括号里是要传递的内容
                props.history.push('/customer', {
                    customer: response.data.customer,
                    vendors: vendors,
                    position: [lat, lng]
                });
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const onChange = () => {
        var reg = /^(?=.*[a-zA-Z])(?=.*\d)[\s\S]{8,}$/
        if (password === '') {
            axios.post('/customer/changeName/' + props.location.state.customer.id, {
                givenName: firstName, familyName:
                    lastName
            }).then(response => {
                console.log(response);
                if (response.data.changeName) {
                    // push the customer information
                    alert("success! Please Login again using your new details");
                    props.history.push('/');
                }
                else {
                    alert(response.data.error)
                }
            }).catch(error => {
                console.log(error.response.data.message)
                alert(error.response.data.message)
            })
        } else if (reg.test(password)) {
            axios.post('/customer/changeDetails/' + props.location.state.customer.id, {
                givenName: firstName, familyName:
                    lastName, password: password
            }).then(response => {
                console.log(response);
                if (response.data.changeDetails) {
                    // push the customer information
                    alert("success! Please Login again using your new details");
                    props.history.push('/');
                }
                else {
                    alert(response.data.error)
                }
            }).catch(error => {
                console.log(error.response.data.message)
                alert(error.response.data.message)
            })
        } else {
            alert("Password should have at least one alphabet character, one numerical digit with length no less than 8 characters");
        }
    }

    const toLogin = () => {
        props.history.push('../');
    }

    const ProfileModal = (
        /* <Modal.Header closeButton>
              <Modal.Title>Vendor Login</Modal.Title>
        </Modal.Header> */
        <div className='login-container'>
            <div className='popup'>
                <h2>MY PROFILE</h2>
                <br />
                <Modal.Body>
                    <h2>Your Email Address (cannot be changed): <br /> {props.location.state.customer.loginEmail}</h2>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="firstName" placeholder="Enter Your First Name" defaultValue={props.location.state.customer.givenName}
                                onChange={e => setFirstName(e.target.value)} />
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="lastName" placeholder="Enter Your Last Name" defaultValue={props.location.state.customer.familyName}
                                onChange={e => setLastName(e.target.value)} />
                            {/* <Form.Label>Email</Form.Label>
                  <Form.Control type="loginEmail" placeholder="Enter Name"
                    onChange={e => setEmail(e.target.value)} /> */}

                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                onChange={e => setPassword(e.target.value)} />
                            <Form.Text className="text-mutes">if you don't want to change password, just leave it blank and update</Form.Text>
                            <br />
                            {/* <Form.Label>Password Confirm</Form.Label>
                  <Form.Control type="password" placeholder="Password"
                    onChange={e => setPasswordConfirm(e.target.value)} /> */}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='primary-btn' variant="outline-primary" onClick={onChange}>
                        Update
                </Button>
                    <Button className='secondary-btn' variant="secondary" onClick={handleClose}>
                        Close
                </Button>
                </Modal.Footer>
            </div>
        </div>
    )


    // get the current order from the customer
    const onOrder = () => {
        //orderListGet
        axios.get('/order?customer=' + props.location.state.customer.id).then(response => {
            console.log(props.location.state.customer.id);
            console.log(response);
            if (response.data) {
                // props push the useful data
                props.history.push('/customer/order', { customer: props.location.state.customer, customerOrders: response.data.customerOrders, target: 'customer' });
            }
            else {
                props.history.push('/customer/order', { target: 'customer' });
                message.error(response.data.error)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const onProfile = () => {
        //orderListGet
        axios.get('/customer/' + props.location.state.customer.id).then(response => {
            console.log(props.location.state.customer.id);
            console.log(response);
            if (response.data) {
                // props push the useful data
                props.history.push('/customer/myprofile', { customer: response.data.customer });
            }
            else {
                message.error(response.data.error)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <div >
                <Modal show={show} onHide={handleClose}>
                    {ProfileModal}
                </Modal>
            </div>
        <Layout>
            
            <Header id='header_container'>
                <div id='left_container'>
                    <img src={logo} alt='logo image' id='logo' />
                </div>

                <div className='mid_nav'>
                    <input type='checkbox' id='n_check'></input>
                    <div class='hamburger'>
                        <label for='n_check'>
                            <MenuOutlined className='icon' />
                        </label>
                    </div>

                    <div className='links' id="right-container">
                        <a></a>

                        <button onClick={onCustomerLogin} id='btnMenu'> HOME </button>
                        <button onClick={history.goBack} id='btnMenu'> MENU </button>
                        <button onClick={onOrder} id='btnMenu'><ShoppingOutlined /></button>

                        <div className='drop'>
                            <a className='icon'><UserOutlined /></a>
                            <div className='u_drop_content'>
                                {/* <button>Hi {props.location.state.customer.givenName}</button> */}
                                <button onClick={onOrder}>My Order</button>
                                <button onClick={handleShow}>My Profile</button>
                                <button onClick={toLogin}>Log Out</button>

                            </div>
                        </div>
                    </div>
                </div>

            </Header>

            <div className="minheight">
                <br></br><br></br>
                <h1>MY ORDERS</h1>
                <tr>
                    <th></th>
                </tr>

                <br></br>

                {/* <center>
                    <hr></hr>
                </center> */}

                <div>
                    <OrderListCom id={props.location.state.customer.id} orders={props.location.state.customerOrders} target={props.location.state.target} />
                </div>
            </div>

            <MyFooter></MyFooter>


        </Layout>
        </div>
    )
}