import React,{useState, useEffect} from 'react';
import './MyOrder.css';
import { Layout, Button } from 'antd';
import { ShoppingOutlined, UserOutlined, MenuOutlined, CopyrightOutlined } from '@ant-design/icons';
import '../ShoppingCart/styles.css';
import OrderListCom from '../components/OrderListCom.js'
import { useHistory } from "react-router-dom";
import logo from '../images/logo.png';
import axios from '../API/axios.js';
import './myorderheader.css';
import MyFooter from '../components/Footer.js';

import { Component } from 'react';

const { Header, Footer, Content } = Layout;

// function to loop particular custmomer's orders
export default function OrderList(props) {
    let history = useHistory();
    console.log(props);

    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [vendors, setVendors] = useState([]);
    // const [target, setTarget] = useState('');
    // const [status, setStatus] = useState('');
 
    useEffect(() => {
        // setTarget('customer');
        // setStatus('&status=outstanding');
        // console.log(target);
        // console.log(status);
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
        axios.post('/customer/login', {loginEmail: props.location.state.customer.loginEmail, password: props.location.state.customer.password}).then(response =>{
          console.log(props);
          console.log(response);
          if(response.data.success){
            // props 在这里用于页面和页面之间传递内容（也可以组件之间传递，大括号里是要传递的内容
            props.history.push('/customer', {
              customer: response.data.customer,
              vendors: vendors,
              position: [lat, lng]});
          } 
        }).catch(error => {
          console.log(error)
        })
      }

    //console.log(props);


    return (
        <Layout>
           <Header id='header_container'>   
                <div id = 'left_container'>
                    <img src={logo} alt = 'logo image' id='logo'/> 
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
                
                            <button onClick = {onCustomerLogin} id='btnMenu'> HOME </button>
                            <button onClick = {history.goBack} id='btnMenu'> MENU </button>              
                            <a className='icon' href=''><ShoppingOutlined /></a>

                        <div className='drop'>
                            <a className='icon'><UserOutlined /></a>
                            <div className='u_drop_content'>
                                <a href=''>Profile</a>
                                <a href=''>My Orders</a>
                                <a href=''>Log Out</a>

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

                {/* <center>
                    <hr></hr>
                </center> */}

                <div>
                    <OrderListCom id = {props.location.state.customer.id} orders= {props.location.state.customerOrders} target = {props.location.state.target}/>
                </div>
            </div>

            <MyFooter></MyFooter>

           
        </Layout>
    )
}