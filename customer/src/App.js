import {useState, useEffect} from 'react';
import{Button, Modal, Form} from 'react-bootstrap';
import{ Typography} from 'antd';
import axios from './API/axios.js';
import './landing.css';

const {Link} = Typography;

function App(props) {
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
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
    });
    axios.get('/vendor?lat=' + lat + '&lng=' + lng).then(response => {
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

  const onCustomerLogin = () => {
    axios.post('/customer/login', {loginEmail: loginEmail, password: password}).then(response =>{
      console.log(props);
      console.log(response);
      if(response.data.success){
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
  
  const onVendorLogin = () => {
    axios.post('/vendor/login', {name : name, password: password}).then(response =>{
      console.log(props);
      console.log(response);
      if(response.data.success){
        setVendorDetail(response.data.vendor);   
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
    <div className='login-container'>
      <div className='popup'>
      <h2>Vendor Login</h2>
        <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Vendor Name</Form.Label>
            <Form.Control type="loginEmail" placeholder="Enter name"
              onChange = {e => setName(e.target.value)} />
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
        <div className="container--btns">
          <Button variant = "outline-primary" onClick={handleShow} className='landbtn btnCustomer'>Customer</Button>
          <Button variant ="outline-primary" onClick={handleShow} className='landbtn'>Vendor</Button>
        </div>
      </div>
    </div>
  );
}

export default App;