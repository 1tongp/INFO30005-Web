import React from 'react';
import '../styles.css';
import logo from '../images/logo.png';
// import 'antd/dist/antd.css';
import { Layout, Button} from 'antd';
import {
    ShoppingOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
    CopyrightOutlined,
    UserOutlined,
    MenuOutlined
} from '@ant-design/icons';

const { Header, Footer, Content } = Layout;

export default function shoppingCart () {
    return (
        <>
            <Header className='header_container'>
                
                <img src={logo} className='logo'/>
                <p className='header_loc'>Current Location: <a className='lc_url'> Union House</a></p>
                    
                <div className='mid_nav'>
                    <input type="checkbox" id="n_check"></input>
                    <div class="hamburger">
                        <label for="n_check">
                            <MenuOutlined className='icon'/>
                        </label>
                    </div>
                    <div className='links'>
                        <a className='header_text' href=''>HOME</a>
                        <a className='header_text' href=''>MENU</a>
                        <a className='icon' href=''><ShoppingOutlined /></a>
                        <a className='icon' href=''><UserOutlined /></a>
                    </div>
                </div>
                    
                    {/* <div className='right_icons'> */}
                        {/* <a className='icon' href=''><ShoppingOutlined /></a> */}
                        {/* <a className='icon' href=''><UserOutlined /></a> */}
                    {/* </div>  */}

            </Header>
            <Layout>
                <Content className='container'>
                    <h1>MY BASKET</h1>
                    <div className='row'>
                        <div className='col_70'>
                            <div className='item_list'>
                                <div className='item'>
                                    erifnoeri
                                </div>
                                <div className='item'>
                                    erifnoeri
                                </div>
                            </div>
                            <Button className='grey_button'>
                                <CaretLeftOutlined className='left_arrow'/> 
                                CONTINUE ORDERING
                            </Button>
                        </div>

                        <br />
                        <br />

                        <div className='col_30'>
                            <div className='summary'>
                                <h2>SUMMARY <span className='small_grey_text'>qty</span></h2>
                                <p>Item Name <span className='small_grey_text'>qty</span><span className='price'>$ XX.XX</span></p>
                                <p>Item Name <span className='small_grey_text'>qty</span><span className='price'>$ XX.XX</span></p>
                                <br />
                                <p>Total <span className='price'>$ XX.XX</span></p>
                                <p>Pick up at <a href=''><span>Union House</span></a></p>
                                <br />
                                <br />
                                <Button type="primary">
                                    PLACE ORDER
                                    <CaretRightOutlined className='right_arrow'/> 
                                </Button>
                            </div>
                        </div>

                    </div>
                </Content>
            </Layout>

            <Footer>
                <p>
                <CopyrightOutlined /> SNACKS IN A VAN
                <br />
                All Rights Reserved
                </p>
            </Footer>
        </>
    )
}

