import React from 'react';
import Orderlist from './Orderlist.js'
import 'antd/dist/antd.css';
import './component.css'
import './FulfilledOrderlist'
import logo from '../images/logo.png';

import { Layout, Menu } from 'antd';
import FulfilledOrderlist from './FulfilledOrderlist';
import Searchbar from './Searchbar.js'
import FinishedOrderList from './FinishedOrderList.js'
import FinishedOrderDetail from './FinishedOrderDetail.js'




const { Header, Sider, Content } = Layout;

class FinishedEmpty extends React.Component {
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
          <img src={logo} className="logo"></img>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
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
           
            {/* The finished orders page components */}
            <Searchbar></Searchbar>
            <div className="cluster container--FinishedContent">
              <div className="container--FinishedOrderList">
                <FinishedOrderList></FinishedOrderList>
              </div>
              <div className="container--FinishedOrderDetail">
                <div className="container--orderdetail container--empty">
                    <p>CHOOSE AN ORDER FROM THE LEFT</p>
                    <p>TO VIEW DETAILS</p>
                    
                </div>
              </div>

              
              


            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default FinishedEmpty;