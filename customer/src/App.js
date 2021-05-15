import {useState, useEffect} from 'react';
import{Jumbotron, Button, Modal, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'antd/dist/antd.css';
import{message} from 'antd';
import axios from './API/axios.js';


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



  const onVendorLogin = () => {
    axios.post('/vendor/login', {name : name, password: password}).then(response =>{
      console.log(props);
      console.log(response);
      if(response.data.success){
        message.success('Logged in successfully!')
        // props 在这里用于页面和页面之间传递内容（也可以组件之间传递，大括号里是要传递的内容
        props.history.push('/vendor', {vendor: response.data.vendor});
      }
      else{
        message.error(response.data.error)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  const customerModal = (
    <>
    <Modal.Header closeButton>
          <Modal.Title>Customer Login</Modal.Title>
    </Modal.Header>
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
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label> 
          <Form.Control type="password" placeholder="Password"
            onChange={e => setPassword(e.target.value)} />
        </Form.Group>
      </Form>
    </Modal.Body>    
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="outline-primary" onClick={onCustomerLogin}>
          Login
        </Button>
      </Modal.Footer> 
    </>
  ) 

  const vendorModal = (
    <>
    <Modal.Header closeButton>
          <Modal.Title>Vendor Login</Modal.Title>
    </Modal.Header>
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
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label> 
          <Form.Control type="password" placeholder="Password"
            onChange={e => setPassword(e.target.value)} />
        </Form.Group>
      </Form>
    </Modal.Body>    
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="outline-primary" onClick={onVendorLogin}>
          Login
        </Button>
      </Modal.Footer> 
    </>
  )

  return (
    <div style={{width: '50%', margin :'auto', marginTop:'10%'}}>
      <Modal show={show} onHide={handleClose} style={{marginTup: '2vh'}}>
        {(modal ==="customer") ? customerModal : vendorModal}
      </Modal>
      <Jumbotron style = {{background : 'white'}}>
        <h1> Welcome to KeepItSimple Snack In Van</h1>
        <p>
          Snacks in a Van runs a fleet of food trucks that work as popup cafes. 
          Choose one of the options to continue!
        </p>
        <p>
          <Button variant = "outline-primary" style={{marginLeft: '1vm' }} onClick={handleShow}>Customer</Button>
          <Button variant ="outline-primary" style={{marginLeft: '1vm' }} onClick={handleShow}>Vendor</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default App;