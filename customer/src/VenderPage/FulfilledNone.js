import React from 'react';
import 'antd/dist/antd.css';
import './component.css'
import './FulfilledOrderlist'
import logo from '../images/logo.png';
import Sidebar from './Sider.js'
import { Layout, Menu } from 'antd';

import {
    CoffeeOutlined
} from '@ant-design/icons';





const { Header, Sider, Content } = Layout;

class FulfilledNone extends React.Component {

  constructor(props){
    super(props);
    console.log(this.props);
    this.state = {
      children: [],
    }
    this.setState({children: [this.props]});
  }
  

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  
// z这里的props传进去的type是： children。location。state。。。。
// 但是当vendor login进来时候传的数据是 children。children。location。state。。。
// 并且sider也是按照第二行这个结构写的，所以导致goback时候 找了两遍children， undefined，就会报错
// 所以现在 登陆近vendor， 直接看到preparing， 然后点击fulfilled或者finished orders其中一页是可以的
// eg： 上一步中如果从prepare 点去fulfilled，n那么这时候你如果想back to prepare或点去finished， 则会报错


  render() {
    return (
      <Layout>
        <Sidebar>{this.props}</Sidebar>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <p>SNACK IN A VAN</p>
          </Header>
          <Content
            className="site-layout-background-content"
            style={{
              margin: '0px 0px',
              padding: 24,
              minHeight: 280,
            }}
          >

              <div className="container--PrepareNoOrder">
                <CoffeeOutlined className="coffeeIcon"/>

                  <p>THERE IS NO FULFILLED ORDER AT THE MOMENT</p>
              </div>
           

         
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default FulfilledNone;