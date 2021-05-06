import {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap';
import axios from '../API/axios';
import MenuPre from './Menu.js';
import '../ShoppingCart/styles.css';
import logo from '../images/logo.png';
import { Layout,Card } from 'antd';
import {ShoppingOutlined, UserOutlined, MenuOutlined} from '@ant-design/icons';
import '../loginPage/Login.css';
const { Header} = Layout;


function MenuPreview(props){
    console.log(props);
    const [snacks, setSnacks] = useState([]);
    useEffect(() => {
        //snackMenuGet
        axios.get('/snack').then(response => {
            console.log(response)
            setSnacks(response.data.snacks)
        })
    }, [props.location.state.customer]);

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
                        <a className='header_text' href=''>HOME</a>
                        <a className='header_text' href=''>MENU</a>
                        <a className='icon' href=''><ShoppingOutlined /></a>
                        <div className='drop'>
                            <a className='icon'><UserOutlined /></a>
                            <div className='u_drop_content'>
                                <Button href='../'>Log In</Button>
                                <Button href=''>Sign Up</Button>

                            </div>
                        </div>
                    </div>
                </div>

            </Header>
            <MenuPre key='0' snacks={snacks} />
        </Layout>  
    )
}

export default MenuPreview;