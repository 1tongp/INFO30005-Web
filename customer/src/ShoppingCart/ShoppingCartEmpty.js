import { useState, useEffect } from 'react';
import './styles.css';
import '../loginPage/Login.css';
import logo from '../images/logo.png';
// import 'antd/dist/antd.css';
import { Layout, Button } from 'antd';
import { ShoppingOutlined, CaretLeftOutlined, CopyrightOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import axios from '../API/axios.js';
const { Header, Footer, Content } = Layout;

export default function ShoppingCartEmpty(props) {
    let history = useHistory();
    console.log(props);
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [vendors, setVendors] = useState([]);

    const toLogin = () => {
        props.history.push('/');
    }

    useEffect(() => {
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

    const toHome = () => {
        axios.post('/customer/login', { loginEmail: props.location.state.customer.loginEmail, password: props.location.state.customer.password }).then(response => {
            console.log(props);
            console.log(response);
            if (response.data.success) {
                // props 在这里用于页面和页面之间传递内容（也可以组件之间传递，大括号里是要传递的内容
                props.history.push('/customer', {
                    customer: response.data.customer,
                    vendors: vendors,
                    position: [lat, lng]
                });
            }
        })
    }

    return (
        <Layout>
            <Header className='header_container'>

                <img src={logo} className='logo' />
                <div className='mid_nav'>
                    <input type="checkbox" id="n_check"></input>
                    <div class="hamburger">
                        <label for="n_check">
                            <MenuOutlined className='icon' />
                        </label>
                    </div>
                    <div className='links'>
                        {/* <a className='header_text' href=''>HOME</a> */}
                        <Button onClick={toHome} > HOME </Button>
                        <Button onClick={history.goBack} > MENU </Button>
                        <a className='icon' href=''><ShoppingOutlined /></a>
                        <div className='drop'>
                            <a className='icon'><UserOutlined /></a>
                            <div className='u_drop_content'>
                                <Button href='' >Hi {props.location.state.customer.givenName}</Button>
                                <Button href='' onClick={toLogin}>Log Out</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className='right_icons'> */}
                {/* <a className='icon' href=''><ShoppingOutlined /></a> */}
                {/* <a className='icon' href=''><UserOutlined /></a> */}
                {/* </div>  */}

            </Header>

            <Content className="container">
                <h1>MY ORDERS</h1>
                <div className='centre_content'>

                    <ShoppingOutlined className='icon' />
                    <br />
                    <br />
                    <br />
                    <br />

                    <p>
                        YOU DO NOT HAVE ANY ORDERS : (
                    </p>

                    <br />
                    <br />
                    <br />
                    <br />
                    <Button type="primary" onClick={history.goBack}>
                        <CaretLeftOutlined className='left_arrow' />
                        MAKE MY FIRST ORDER
                    </Button>

                </div>

            </Content>

            <Footer>
                <p>
                    <CopyrightOutlined /> SNACKS IN A VAN
                <br />
                All Rights Reserved
                </p>
            </Footer>

        </Layout>
    )
}

