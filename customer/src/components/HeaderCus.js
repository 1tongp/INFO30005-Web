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
const { Header } = Layout;



export default function HeaderCus(props) {
    let history = useHistory();
    console.log(props);

    const [vendorAddress, setVendorAddress] = useState('');
    const [title, setTitle] = useState('');
    const [buttonMyOrder, setButtonMyOrder] = useState([]);
    const [buttonLogOut, setButtonLogOut] = useState([]);
    const [buttonHome, setButtonHome] = useState([]);
    const [buttonMyProfile, setButtonProfile] = useState([]);

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
            props.data.history.push('/customer/order', {customerOrders: response.data.customerOrders});
        }
        else{
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
        }else{
            setTitle([<Button href='' key="1" onClick = {toLogin}>Log In</Button>])
        }
        // if(props.data.location.state.position){
        //     setButtonHome([<Button href = '' key = "1" onClick = {history.goBack}>Back</Button>])
        // }else{
        //     setButtonHome([<Button href = '' key = "1" onClick = {history.goBack}>Home</Button>])
        // }
        
    },[props.data.location.state.vendor, props.data.location.state.customer]);
        
    
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
                        <a></a>
                        <a className='header_text' href='../customer'>HOME</a>
                        {/* {buttonHome} */}
                        <a className='header_text' href=''>MENU</a>
                        <a className='icon' href=''><ShoppingOutlined /></a>
                        <div className='drop'>
                            <a className='icon'><UserOutlined /></a>
                            <div className='u_drop_content' >
                                
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