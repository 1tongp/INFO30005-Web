import {useState, useEffect} from 'react'
import axios from '../API/axios';
import Menu from '../Menu/Menu.js';
import '../ShoppingCart/styles.css';
import logo from '../images/logo.png';
import { Layout, message, Typography} from 'antd';
import {ShoppingOutlined, UserOutlined, MenuOutlined} from '@ant-design/icons';
import '../loginPage/Login.css';
import {useHistory} from "react-router-dom";
import{Jumbotron, Button, Modal, Form} from 'react-bootstrap';
import '../landing.css';
const { Header } = Layout;
const {Link} = Typography;

export default function HeaderCus(props) {
    let history = useHistory();
    console.log(props);
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState('');
    const [vendors, setVendors] = useState([]);
  const handleClose = () => setShow(false);

  const handleShow = (e) => {
    if (e.target.outerText === "Customer"){
      setModal('customer')
    } else{
      setModal('vendor')
    }
    setShow(true)
  };

  const Signup = () =>{
    props.history.push('/customer/signup');
  } 

  const [loginEmail, setEmail] = useState('');
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
    if (props.data.location.state.vendor){
        setVendorAddress(props.data.location.state.vendor.currentAddress)
    }else {
        setVendorAddress("Please select your vendor first!")
    }
    if (props.data.location.state.customer.length != 0){
        setTitle([<Button href='' key="1" >Hi {props.data.location.state.customer.givenName}</Button>])
        setButtonMyOrder([<Button href='' key="1" onClick = {onOrder}>My Order</Button>])
        setButtonProfile([<Button href='' key="1" onClick = {onProfile}> My Profile</Button>])
        setButtonLogOut([<Button href='' key="1" onClick = {toLogin}>Log Out</Button>])
    }else{
        setTitle([<Button href='' key="1" onClick = {handleShow}>Log In</Button>])
    }
    // if(props.data.location.state.position){
    //     setButtonHome([<Button href = '' key = "1" onClick = {history.goBack}>Back</Button>])
    // }else{
    //     setButtonHome([<Button href = '' key = "1" onClick = {history.goBack}>Home</Button>])
    // }
    
},[props.data.location.state.vendor, props.data.location.state.customer]);

    // 用这个信息去跟后端核对
  const onCustomerLogin = () => {
    axios.post('/customer/login', {loginEmail: loginEmail, password: password}).then(response =>{
      console.log(props);
      console.log(response);
      if(response.data.success){
        // props 在这里用于页面和页面之间传递内容（也可以组件之间传递，大括号里是要传递的内容
        props.history.push('/customer', {
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

    const customerModal = (
        <div className='login-container'>
          {/* <Modal.Header closeButton> */}
                
          {/* </Modal.Header> */}
          <div className='popup'>
            <h2>Customer Login</h2>
            <br />
              <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="loginEmail" placeholder="Enter email"
                    onChange = {e => setEmail(e.target.value)} />
                  <Form.Text className="text-mutes">
                    We'll never share your email with anyone else.
                  </Form.Text>
                  </Form.Group>
                  <br />
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label> 
                    <Form.Control type="password" placeholder="Password"
                      onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                </Form>
                <Link className='pri-link' onClick = {Signup}>
                  Don't have an account? Sign Up Now!
                </Link>
                <br /><br />
              </Modal.Body>    
                <Modal.Footer className='footer-container'>
                  <Button className='primary-btn' variant="outline-primary" onClick={onCustomerLogin}>
                    Login
                  </Button>
                  <Button className='secondary-btn' variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
            </div>
        </div>
      ) 

    const [vendorAddress, setVendorAddress] = useState('');
    const [title, setTitle] = useState('');
    const [buttonMyOrder, setButtonMyOrder] = useState([]);
    const [buttonLogOut, setButtonLogOut] = useState([]);
    const [buttonHome, setButtonHome] = useState([]);
    const [buttonMyProfile, setButtonProfile] = useState([]);
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    const toLogin = () =>{
        props.data.history.push('../');
    }

    // get the current order from the customer
    const onOrder = () => {
        //orderListGet
        axios.get('/order?customer=' + props.data.location.state.customer.id).then(response =>{
        console.log(props.data.location.state.customer.id);
        console.log(response);
        if(response.data.customerOrders.length != 0){
            // props push the useful data
            props.data.history.push('/customer/order', {customerOrders: response.data.customerOrders});
        }
        else{
            axios.post('/customer/login', {loginEmail: props.data.location.state.customer.loginEmail, password: props.data.location.state.customer.password}).then(response =>{
                console.log(props);
                console.log(response);
                if(response.data.success){
                  // props 在这里用于页面和页面之间传递内容（也可以组件之间传递，大括号里是要传递的内容
                  props.data.history.push('/customer/shoppingcart/empty', {
                    customer: response.data.customer});
                } 
                else{
                  message.error(response.data.error)
                }
              })
            
            // props.data.history.push('/customer/shoppingcart/empty');
        }
      }).catch(error => {
        console.log(error)
      })
    }

    const onProfile = () => {
        //orderListGet
        axios.get('/customer/' + props.data.location.state.customer.id).then(response =>{
        console.log(props.data.location.state.customer.id);
        console.log(response);
        if(response.data){
            // props push the useful data
            props.data.history.push('/customer/myprofile', {customer: response.data.customer});
        }
        else{
          message.error(response.data.error)
        }
      }).catch(error => {
        console.log(error)
      })
    }


    // useEffect(() => {
    //     if (props.data.location.state.vendor){
    //         setVendorAddress(props.data.location.state.vendor.currentAddress)
    //     }else {
    //         setVendorAddress("Please select your vendor first!")
    //     }
    //     if (props.data.location.state.customer.length != 0){
    //         setTitle([<Button href='' key="1" >Hi {props.data.location.state.customer.givenName}</Button>])
    //         setButtonMyOrder([<Button href='' key="1" onClick = {onOrder}>My Order</Button>])
    //         setButtonProfile([<Button href='' key="1" onClick = {onProfile}> My Profile</Button>])
    //         setButtonLogOut([<Button href='' key="1" onClick = {toLogin}>Log Out</Button>])
    //     }else{
    //         setTitle([<Button href='' key="1" onClick = {toLogin}>Log In</Button>])
    //     }
    //     // if(props.data.location.state.position){
    //     //     setButtonHome([<Button href = '' key = "1" onClick = {history.goBack}>Back</Button>])
    //     // }else{
    //     //     setButtonHome([<Button href = '' key = "1" onClick = {history.goBack}>Home</Button>])
    //     // }
        
    // },[props.data.location.state.vendor, props.data.location.state.customer]);
        
    
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
               {customerModal}
           </Modal>
            <Header className='header_container'>
                <img src={logo} className='logo'/>

                <p className='header_loc'>Current Location: <a className='lc_url'>{vendorAddress}</a></p>            
                <div className='mid_nav'>
                    <input type='checkbox' id='n_check'></input>
                    <div class='hamburger'>
                        <label for='n_check'>
                            <MenuOutlined className='icon'/>
                        </label>
                    </div>
                    <div className='links'>
                        <a className='header_text' href='../customer'>HOME</a>
                        {/* {buttonHome} */}
                        <a className='header_text' href=''>MENU</a>
                        <a className='icon' href=''><ShoppingOutlined /></a>
                        <div className='drop'>
                            <a className='icon'><UserOutlined /></a>
                            <div className='u_drop_content'>
                                {title}
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