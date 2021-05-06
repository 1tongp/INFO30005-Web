import {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap';
import {Divider, Drawer, PageHeader} from 'antd';
// import 'antd/dist/antd.css';
import axios from '../API/axios';

import OrderList from '../myOrderPage/OrderList.js';
import myOrder from '../myOrderPage/MyOrder.js';
import Menu from './Menu.js';
import '../ShoppingCart/styles.css';

import logo from '../images/logo.png';
import { Layout, InputNumber, message,Card } from 'antd';
import {Modal} from 'react-bootstrap';
import {
    ShoppingOutlined,
    CopyrightOutlined,
    UserOutlined,
    LikeOutlined,
    MenuOutlined
} from '@ant-design/icons';
import '../loginPage/Login.css';
const { Header, Footer, Content } = Layout;
const {Meta} = Card;

function onChange(value) {
    console.log('changed', value);
  }

function AfterLoginMain(props){
    console.log(props);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const handleDrawerClose = () =>setDrawerVisible(false);
    const handleDrawerShow = () => setDrawerVisible(true);
    const [orders, setOrders] = useState([]);
    const [snacks, setSnacks] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loginEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        //orderListGet
        axios.get('/order?customer=' + props.location.state.customer.id).then(response => {
            console.log(response);
            setOrders(response.data.customerOrders)
        })
        //snackMenuGet
        axios.get('/snack').then(response => {
            console.log(response)
            setSnacks(response.data.snacks)
        })
    }, [props.location.state.customer.id]);

    const onOrder = () => {
        axios.get('/order?customer=' + props.location.state.customer.id).then(response =>{
        console.log(props);
        console.log(response);
        if(response.data){
            console.log("get");
          // props 在这里用于页面和页面之间传递内容（也可以组件之间传递，大括号里是要传递的内容
          props.history.push('/order', {customerOrders: response.data.customerOrders});
        }
        else{
          message.error(response.data.error)
        }
      }).catch(error => {
        console.log(error)
      })
    }


    return (
        // <>
        //     <PageHeader title = {"Hi " + props.location.state.customer.givenName + ": Welcome to Snack in Van "}
        //         extra = {[<Menu key='0' snacks={snacks} customer={props.location.state.customer.id} />,
        //             <Button variant = "outline-primary" key="1"
        //                 onClick={handleDrawerShow}>See Orders</Button>
        //         ]}>
        //     </PageHeader>
        //     <Drawer visible = {drawerVisible}
        //         closable = {true}
        //         onClick = {handleDrawerClose}
        //         width = {"60vw"}>
        //         All Orders
        //         <Divider />
        //         <OrderList orders = {orders} />
        //     </Drawer>
        // </>
        <Layout>
            <Header className='header_container'>
                
                <img src={logo} className='logo'/>
                <p className='header_loc'>Current Location: <a className='lc_url'>{}</a></p>
                    
                <div className='mid_nav'>
                    <input type='checkbox' id='n_check'></input>
                    <div class='hamburger'>
                        <label for='n_check'>
                            <MenuOutlined className='icon'/>
                        </label>
                    </div>
                    <div className='links'>
                        <a className='header_text' href=''>HOME</a>
                        <a className='header_text' href=''>MENU</a>
                        <a className='icon' href=''><ShoppingOutlined /></a>
                        <div className='drop'>
                            <a className='icon'><UserOutlined /></a>
                            <div className='u_drop_content'>
                                {/* <a href=''>Log In</a>
                                <a href=''>Sign Up</a> */}

                                {/* after log in */}

                                <Button href=''>Hi {props.location.state.customer.givenName}</Button>
                                <Button href='' key="1" onClick = {onOrder}>My Order</Button>
                                <Button href=''>Log Out</Button>

                            </div>
                        </div>
                    </div>
                </div>

            </Header>
            <Menu key='0' snacks={snacks} customer={props.location.state.customer.id} />
        </Layout>
        
    )
}

export default AfterLoginMain;