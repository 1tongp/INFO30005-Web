import React , {useState} from 'react'
import {Layout} from 'antd';
import SiderDemo from './Preparing'

const { Content } = Layout;

export default function Component(props) {
    console.log(props);
    
    return (
        <Layout>
            <Content >
                <SiderDemo >{props}</SiderDemo>       
            </Content>
        </Layout>
    )
}