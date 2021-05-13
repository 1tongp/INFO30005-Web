import React from 'react';
import 'antd/dist/antd.css';
import './component.css'
import './FulfilledOrderlist'
import logo from '../images/logo.png';

import { Layout, Menu } from 'antd';

import {
    CoffeeOutlined
} from '@ant-design/icons';





const { Header, Sider, Content } = Layout;

class PrepareNoOrder extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <img src={logo} alt="logo" className="logo"></img>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" >
              PREPARING
            </Menu.Item>
            <Menu.Item key="2" >
              FULFILLED
            </Menu.Item>
            <Menu.Item key="3" >
              FINISHED 
              ORDERS
            </Menu.Item>
            <button className="closevan">
              CLOSE VAN
            </button>
          </Menu>
        </Sider>
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
             
                  <p>HAVE A BREAK</p>
                  <p>THERE IS NO ORDER AT THE MOMENT</p>
              </div>
           

         
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default PrepareNoOrder;