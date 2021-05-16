import {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap';
import axios from '../API/axios';
import Menu from '../Menu/Menu.js';
import '../ShoppingCart/styles.css';
import logo from '../images/logo.png';
import { Layout, message } from 'antd';
import {ShoppingOutlined, UserOutlined, MenuOutlined} from '@ant-design/icons';
import '../loginPage/Login.css';
const { Header } = Layout;



export default function HeaderCus(props) {
    //let history = useHistory();
    console.log(props);

    const [vendorAddress, setVendorAddress] = useState('');
    const [title, setTitle] = useState('');
    const [buttonMyOrder, setButtonMyOrder] = useState([]);
    const [buttonLogOut, setButtonLogOut] = useState([]);
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
        
    },[props.data.location.state.vendor, props.data.location.state.customer]);
        
    
    return (
        <div>
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
                        <a className='header_text' href='../'>HOME</a>
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