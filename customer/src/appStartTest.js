// This will be the main -> login page in the future
// Test file for API

import {useState} from 'react';
import{Jumbotron, Button, OverlayTrigger, Tooltip, Modal, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import{message} from 'antd';
import axios from './API/axios.js';

export default function AppStart(props) {

  // setShow is the function to change status(visible or invisible)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loginEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      feature still in progress
    </Tooltip>
  );

  // compare the props information with the database
  // check if the loginEmail and password are all correct
  const onLogin = () => {
    axios.post('/customer/login', {loginEmail: loginEmail, password: password}).then(response =>{
      if(response.data.success){
        props.history.push('/customer', {customer: response.data.customer});
      }
      else{
        message.error(response.data.error)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className='pagetest'>
      <Modal show={show} onHide={handleClose} style={{marginTup: '2vh'}} 
          size="lg" aria-labelledby="contained-modal-title-vcenter" centered>

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
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={onLogin}>
            Login
          </Button>
        </Modal.Footer>     
      </Modal>
      <Jumbotron style = {{background : 'blue'}}>
        <h1> Welcome to Snack In Van</h1>
        <p>KeepItSimple</p>

        <p>
          <Button variant = "secondary" onClick={handleShow}>Customer</Button>
        </p>
      </Jumbotron>
    </div>
  );
}
