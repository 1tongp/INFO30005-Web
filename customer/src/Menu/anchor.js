//import the functions will be used
import {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap';
import axios from '../API/axios';
import Menu from './Menu.js';
import '../ShoppingCart/styles.css';
import logo from '../images/logo.png';
import { Layout, message } from 'antd';
import {ShoppingOutlined, UserOutlined, MenuOutlined} from '@ant-design/icons';
import '../loginPage/Login.css';
const { Header } = Layout;

//function used to control the data after customer login 
function AfterLoginMain(props){
    console.log(props);
    const [snacks, setSnacks] = useState([]);

    useEffect(() => {
        //snackMenuGet
        axios.get('/snack').then(response => {
            console.log(response)
            setSnacks(response.data.snacks)
        })
    }, [props.location.state.customer.id]);

    //get the current order from the customer
    const onOrder = () => {
        //orderListGet
        axios.get('/order?customer=' + props.location.state.customer.id).then(response =>{
        console.log(props);
        console.log(response);
        if(response.data){
            // props push the useful data
            props.history.push('/customer/order', {customerOrders: response.data.customerOrders});
        }
        else{
          message.error(response.data.error)
        }
      }).catch(error => {
        console.log(error)
      })
    }

    return (
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
                        <a className='header_text' href='../'>HOME</a>
                        <a className='header_text' href=''>MENU</a>
                        <a className='icon' href=''><ShoppingOutlined /></a>
                        <div className='drop'>
                            <a className='icon'><UserOutlined /></a>
                            <div className='u_drop_content'>
                                <Button href=''>Hi {props.location.state.customer.givenName}</Button>
                                <Button href='' key="1" onClick = {onOrder}>My Order</Button>
                                <Button href='../'>Log Out</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </Header>
            {/* return the snacks and customer details */}
            <Menu key='0' snacks={snacks} customer={props.location.state.customer.id} />
        </Layout>
    )
}

export default AfterLoginMain;