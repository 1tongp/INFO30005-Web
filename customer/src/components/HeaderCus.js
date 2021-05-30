import {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap';
import axios from '../API/axios';
import Menu from '../Menu/Menu.js';
// import '../ShoppingCart/styles.css';
import logo from '../images/logo.png';
import { Layout, message } from 'antd';
import {ShoppingOutlined, UserOutlined, MenuOutlined} from '@ant-design/icons';
import '../loginPage/Login.css';
import {useHistory} from "react-router-dom";
import './headerstyle.css';
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

    const toLogin = () =>{
        props.data.history.push('../');
    }

    // get the current order from the customer
    const onOrder = () => {
        //orderListGet
        axios.get('/order?customer=' + props.data.location.state.customer.id).then(response =>{
        console.log(props.data.location.state.customer.id);
        console.log(response);
        if(response.data){
            // props push the useful data
            props.data.history.push('/customer/order', {customer: props.data.location.state.customer, customerOrders: response.data.customerOrders, target: 'customer'});
        }
        else{
          props.data.history.push('/customer/order', {target: 'customer'});
          message.error(response.data.error)
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



    useEffect(() => {
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
            setButtonCart([<Button className='icon' id='basket' href='' key="1" onClick = {onOrder}><ShoppingOutlined /></Button>])
        }else{
            setTitle([<Button href='' key="1" onClick = {toLogin}>Log In</Button>])
        }
        // if(props.data.location.state.position){
        //     setButtonHome([<Button href = '' key = "1" onClick = {history.goBack}>Back</Button>])
        // }else{
        //     setButtonHome([<Button href = '' key = "1" onClick = {history.goBack}>Home</Button>])
        // }
        
    },[props.data.location.state.vendor, props.data.location.state.customer]);
        
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [vendors, setVendors] = useState([]);
    useEffect(() =>{
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
      },[lat, lng])
    
    console.log(lat);
    console.log(lng);
    const onCustomerLogin = () => {
        axios.post('/customer/loginhash', {loginEmail: props.data.location.state.customer.loginEmail, password: props.data.location.state.customer.loginEmail}).then(response =>{
          console.log(props);
          console.log(response);
          if(response.data.success){
            // props 在这里用于页面和页面之间传递内容（也可以组件之间传递，大括号里是要传递的内容
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
    
    return (
        <div>
            <Header id='header_container'>
                <div id="left_container">
                <img src={logo} id='logo'/>
                <div id="header_loc">
                    <div id="loc-text">
                        <p >Current Location: </p>
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
                            <MenuOutlined className='icon'/>
                        </label>
                    </div>
                    <div className='links' id="right-container">
                        {/* <a></a> */}
                        <Button onClick={onCustomerLogin} id='btnMenu'> HOME </Button>
                        {/* {buttonHome} */}
                        <Button id='btnMenu'> MENU </Button>
                        {buttonCart}
                        <div className='drop'>
                            
                            <a className='icon'><UserOutlined /></a>
                            <div className='u_drop_content' >
                                
                                {/* {title} */}
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