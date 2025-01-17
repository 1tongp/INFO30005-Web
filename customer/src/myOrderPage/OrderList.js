import React, { useState, useEffect } from 'react';
import './MyOrder.css';
import { Modal, Form } from 'react-bootstrap';
import { Layout, BackTop} from 'antd';
import { ShoppingOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import '../ShoppingCart/styles.css';
import OrderListCom from '../components/OrderListCom.js'
import { useHistory } from "react-router-dom";
import logo from '../images/logo.png';
import axios from '../API/axios.js';
import './myorderheader.css';
import MyFooter from '../components/Footer.js';
import { message } from 'antd';
const { Header} = Layout;

// function to loop particular custmomer's orders
export default function OrderList(props) {
    let history = useHistory();
    console.log(props);

    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [vendors, setVendors] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [firstName, setFirstName] = useState(props.location.state.customer.givenName);
    const [lastName, setLastName] = useState(props.location.state.customer.familyName);
    const [password, setPassword] = useState('');

    useEffect(() => {
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
        <div className='login-container'>
           <div className='popup profile'>
                <h2>MY PROFILE</h2>
                <p className='email-warning'>Your Email Address (cannot be changed): <br /> </p>
                <p className='email'>{props.location.state.customer.loginEmail}</p>
                <br />
                <Modal.Body>
                 
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="firstName" placeholder="Enter Your First Name" defaultValue={props.location.state.customer.givenName}
                                onChange={e => setFirstName(e.target.value)} />
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="lastName" placeholder="Enter Your Last Name" defaultValue={props.location.state.customer.familyName}
                                onChange={e => setLastName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                onChange={e => setPassword(e.target.value)} />
                            <Form.Text className="text-mutes">if you don't want to change password, just leave it blank and update</Form.Text>
                            <br />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='primary-btn' variant="outline-primary" onClick={onChange}>
                        Update
                    </button>
                    <button className='secondary-btn' variant="secondary" onClick={handleClose}>
                        Close
                    </button>
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
            <BackTop />
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

                <div>
                    <OrderListCom id={props.location.state.customer.id} orders={props.location.state.customerOrders} target={props.location.state.target} />
                </div>
            </div>

            <MyFooter></MyFooter>

        </Layout>
        </div>
    )
}