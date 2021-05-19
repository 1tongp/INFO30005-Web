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
    console.log(this.props)
    var children;
  }

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