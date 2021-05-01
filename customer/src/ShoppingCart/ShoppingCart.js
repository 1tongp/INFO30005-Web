import React from 'react';
import '../styles.css';
// import 'antd/dist/antd.css';
import { Layout, Button, Space} from 'antd';
import {
    ShoppingOutlined,
    CaretLeftOutlined,
    CopyrightOutlined
} from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

export default function shoppingCart () {
    return (
        <Layout>
            <Header>

            </Header>
            <Layout>
                <Content className='container'>
                    <h1>MY BASKET</h1>
                    <div className='row'>
                        <div className='item_list'>
                            <div className='item'>
                                sdfwe

                            </div>
                        </div>

                        <div className='summary'>
                            <h2>SUMMARY</h2>
                            
                            
                            

                        </div>

                    </div>
                </Content>
                <Sider>
                    
                </Sider>
            </Layout>

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

