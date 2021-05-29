import {useState, useEffect} from 'react';
import{Jumbotron, Button, Modal, Form} from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'antd/dist/antd.css';
import{message, Typography} from 'antd';
import axios from './API/axios.js';
import './landing.css';
import { AlertFilled } from '@ant-design/icons';

const {Link} = Typography;

function App(props) {

  // setShow 是更改状态的function， 以下类似于constructor的初始化
  // onClick 括号里的是funciton，自己定义的
  // show 是设置状态

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (e) => {
    if (e.target.outerText === "Customer"){
      setModal('customer')
    } else{
      setModal('vendor')
    }
    setShow(true)
  };

  const [loginEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [vendors, setVendors] = useState([]);
  const [name, setName] = useState('');
  const [modal, setModal] = useState('');

  useEffect(() =>{
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
    });
    axios.get('/vendor?lat=' + lat + '&lng=' + lng).then(response => {
      console.log(response)
      setVendors(response.data.vendors)
    })
  },[lat, lng])
  
  // view menu without login
  const onSkip = () => {
    props.history.push('/customer',{
      customer: [],
      position : [lat, lng],
      vendors: vendors
    });
  }

  const Signup = () =>{
    props.history.push('/customer/signup', {
      customer: [],
      position: [lat, lng],
      vendors: vendors
    });
  } 

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
        alert(response.data.error)
      }
    }).catch(error => {
      console.log(error)
    })
  }


  const [vendorDetail, setVendorDetail] = useState('');
  // const onVendorLogin = () => {
  //   axios.post('/vendor/login', {name : name, password: password}).then(response =>{
  //     console.log(props);
  //     console.log(response);
  //     if(response.data.success){
  //       setVendorDetail(response.data.vendor);
  //       message.success('Logged in successfully!')        
  //       axios.get('/order/' + response.data.vendor.id + '?status=outstanding').then(response2 =>{
  //         console.log(response2);
  //         if(!response2.data.success){
  //           props.history.push('/vendor/preparing/noorder', {vendor: response.data.vendor})
  //         }
  //         else{
  //           props.history.push('/vendor/preparing', {vendor: response.data.vendor, orders: response2.data.orders});
  //         }
  //       })
  //     }
  //     else{
  //       message.error(response.data.error)
  //     }
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }
  const onVendorLogin = () => {
    axios.post('/vendor/login', {name : name, password: password}).then(response =>{
      console.log(props);
      console.log(response);
      if(response.data.success){
        setVendorDetail(response.data.vendor);
        message.success('Logged in successfully!')        
        props.history.push('/vendor', {
          vendor: response.data.vendor,
          position: [lat, lng]});
      }
      else{
        alert(response.data.error)
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
              <Link className='sec-link' onClick = {onSkip}>
                View Menu Without Login
              </Link>
            </Modal.Footer>
        </div>
    </div>
  ) 

  const vendorModal = (
    /* <Modal.Header closeButton>
          <Modal.Title>Vendor Login</Modal.Title>
    </Modal.Header> */
    <div className='login-container'>
      <div className='popup'>
      <h2>Vendor Login</h2>
        <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Vendor Name</Form.Label>
            <Form.Control type="loginEmail" placeholder="Enter name"
              onChange = {e => setName(e.target.value)} />
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
          <br />
        </Modal.Body>    
          <Modal.Footer>
            <Button className='primary-btn' variant="outline-primary" onClick={onVendorLogin}>
              Login
            </Button>
            <Button className='secondary-btn' variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer> 
      </div>
    </div>
  )

  return (
    <div className='landing-container'>
      <Modal show={show} onHide={handleClose}>
        {(modal ==="customer") ? customerModal : vendorModal}
      </Modal>
      <div className="landing-subcontainer">
        <h3>Welcome to </h3>
        <h1> KeepItSimple <br /> Snacks in a Van</h1>
        <br />
        <p className="font--aboutus">
          Snacks in a Van runs a fleet of food vans that work as popup cafes. 
          Choose one of the options from below to continue!
        </p>
        <p>
          <Button variant = "outline-primary" onClick={handleShow} className='landbtn btnCustomer'>Customer</Button>
          <Button variant ="outline-primary" onClick={handleShow} className='landbtn'>Vendor</Button>
        </p>
      </div>
    </div>
  );
}

export default App;