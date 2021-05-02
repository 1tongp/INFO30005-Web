import React from 'react';
import '../styles.css';
// import 'antd/dist/antd.css';
import { Layout, Button, Space} from 'antd';
import {
    ShoppingOutlined,
    CaretLeftOutlined,
    CopyrightOutlined
} from '@ant-design/icons';

const { Header, Footer, Content } = Layout;

export default function shoppingCartEmpty () {
    return (
        <Layout>
            <Header>

            </Header>
            
            <Content className="container">
                <h1>MY BASKET</h1>
                <div className='centre_content'>
                    
                    <ShoppingOutlined className='icon'/>
                    <br />
                    <br />
                    <br />
                    <br />

                    <p>
                        YOUR BASKET IS EMPTY : (
                    </p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button type="primary">
                        <CaretLeftOutlined className='left_arrow'/> 
                        CONTINUE ORDERING
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

