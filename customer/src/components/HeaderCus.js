import { useState, useEffect } from 'react'
import { Jumbotron, Button, Modal, Form } from 'react-bootstrap';
import axios from '../API/axios';
import Menu from '../Menu/Menu.js';
// import '../ShoppingCart/styles.css';
// import '../landing.css';
import logo from '../images/logo.png';
import { Layout, message } from 'antd';
import { ShoppingOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import '../loginPage/Login.css';
import { useHistory } from "react-router-dom";
import './headerstyle.css';
import '../RegistrationPage/Registration.css'
import '../ShoppingCart/styles.css'
const { Header } = Layout;



export default function HeaderCus(props) {
  let history = useHistory();
  console.log(props);

  const [vendorAddress, setVendorAddress] = useState('');
  const [title, setTitle] = useState('');
  const [buttonMyOrder, setButtonMyOrder] = useState([]);
  const [buttonLogOut, setButtonLogOut] = useState([]);
  const [buttonMyProfile, setButtonProfile] = useState([]);
  const [buttonCart, setButtonCart] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstName, setFirstName] = useState(props.data.location.state.customer.givenName);
  const [lastName, setLastName] = useState(props.data.location.state.customer.familyName);
  const [password, setPassword] = useState('');

  const toLogin = () => {
    props.data.history.push('../');
  }

  const onChange = () => {
    var reg = /^(?=.*[a-zA-Z])(?=.*\d)[\s\S]{8,}$/
    if (password === ''){
      axios.post('/customer/changeName/' + props.data.location.state.customer.id, {
        givenName: firstName, familyName:
          lastName
      }).then(response => {
        console.log(response);
        if (response.data.changeName) {
          // push the customer information
          alert("success! Please Login again using your new details");
          history.goBack();
        }
        else {
          alert(response.data.error)
        }
      }).catch(error => {
        console.log(error.response.data.message)
        alert(error.response.data.message)
      })
    } else if (reg.test(password)) {
      console.log(props.data.history);
      axios.post('/customer/changeDetails/' + props.data.location.state.customer.id, {
        givenName: firstName, familyName:
          lastName, password: password
      }).then(response => {
        console.log(response);
        if (response.data.changeDetails) {
          // push the customer information
          alert("success! Please Login again using your new details");
          history.goBack();
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

  // get the current order from the customer
  const onOrder = () => {
    //orderListGet
    axios.get('/order?customer=' + props.data.location.state.customer.id).then(response => {
      console.log(props.data.location.state.customer.id);
      console.log(response);
      if (response.data) {
        // props push the useful data
        props.data.history.push('/customer/order', { customer: props.data.location.state.customer, customerOrders: response.data.customerOrders, target: 'customer' });
      }
      else {
        props.data.history.push('/customer/order', { target: 'customer' });
        message.error(response.data.error)
      }
    }).catch(error => {
      console.log(error)
    })
  }


  useEffect(() => {
    if (props.data.location.state.vendor) {
      setVendorAddress(props.data.location.state.vendor.name)
    } else {
      setVendorAddress("Please select your vendor first!")
    }
    if (props.data.location.state.customer.length != 0) {
      setTitle([<Button href='' key="1" >Hi {props.data.location.state.customer.givenName}</Button>])
      setButtonMyOrder([<Button href='' key="1" onClick={onOrder}>My Order</Button>])
      setButtonProfile([<Button href='' key="1" onClick={handleShow}> My Profile</Button>])
      setButtonLogOut([<Button href='' key="1" onClick={toLogin}>Log Out</Button>])
      setButtonCart([<Button className='icon' id='basket' href='' key="1" onClick={onOrder}><ShoppingOutlined /></Button>])
    } else {
      setTitle([<Button href='' key="1" onClick={toLogin}>Log In</Button>])
    }

  }, [props.data.location.state.vendor, props.data.location.state.customer]);

  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [vendors, setVendors] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
    });
    axios.get('/vendor?lat=' + lat + '&lng=' + lng).then(response => {
      console.log(response)
      setVendors(response.data.vendors)
    })
  }, [lat, lng])

  console.log(lat);
  console.log(lng);

  const onCustomerLogin = () => {
        axios.post('/customer/loginhash', {loginEmail: props.data.location.state.customer.loginEmail, password: props.data.location.state.customer.password}).then(response =>{
          console.log(props);
          console.log(response);
          if(response.data.success){
              props.data.history.push('/customer', {
              customer: response.data.customer,
              vendors: vendors,
              position: [lat, lng]});
          } 
          else{
            message.error(response.data.error)
          }
        }).catch(error => {
          console.log(error)
        })
      }


  const ProfileModal = (
    <div className='login-container'>
      <div className='popup profile'>
        <h2>MY PROFILE</h2>
        <p className='email-warning'>Your Email Address (cannot be changed): <br /> </p>
        <p className='email' >{props.data.location.state.customer.loginEmail}</p>
        <Modal.Body>
          
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="firstName" placeholder="Enter Your First Name" defaultValue = {props.data.location.state.customer.givenName}
                onChange={e => setFirstName(e.target.value)} />
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="lastName" placeholder="Enter Your Last Name" defaultValue = {props.data.location.state.customer.familyName}
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

  return (
      <div>
        <div >
          <Modal show={show} onHide={handleClose}>
            {ProfileModal}
          </Modal>
        </div>


        <Header id='header_container'>
          <div id="left_container">
            <img src={logo} id='logo' />
            <div id="header_loc">
              <div id="loc-text">
                <p >Current Van: </p>
              </div>
              <div id="loc-url">
                <a className='lc_url'>{vendorAddress}</a>

              </div>

            </div>

          </div>


          <div className='mid_nav'>
            <input type='checkbox' id='n_check'></input>
            <div className='hamburger' id="menubutton">
              <label for='n_check'>
                <MenuOutlined className='icon' />
              </label>
            </div>
            <div className='links' id="right-container">

              <Button onClick={onCustomerLogin} id='btnMenu'> HOME </Button>
  
              <Button id='btnMenu'> MENU </Button>
              {buttonCart}
              <div className='drop'>

                <a className='icon'><UserOutlined /></a>
                <div className='u_drop_content' >
                  {buttonMyOrder}
                  {buttonMyProfile}
                  {buttonLogOut}
                </div>
              </div>
            </div>
          </div>

        </Header>
      </div>
  )
}