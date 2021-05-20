import React , {useState} from 'react'
import {Layout} from 'antd';
import Com from './TestCom'
import SiderDemo from './Preparing'


const { Content } = Layout;

export default function Component(props) {
    console.log(props);
    

    return (
        <Layout>
            <Content >
                {/* <p>Test Component</p>
                <Com type="what"/>
                <Com /> */}

                <SiderDemo >{props}</SiderDemo>
               
             
        
            </Content>
        </Layout>
    )
}