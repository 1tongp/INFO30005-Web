import React from 'react';
import Orderlist from './Orderlist.js'
import 'antd/dist/antd.css';
import './component.css'
import './FulfilledOrderlist'

import { Layout, Menu } from 'antd';
import FulfilledOrderlist from './FulfilledOrderlist';
import Searchbar from './Searchbar.js'
import FinishedOrderList from './FinishedOrderList.js'
import FinishedOrderDetail from './FinishedOrderDetail.js'
import FinishedOrderDetailCancel from './FinishedCancel'
import Sidebar from './Sider.js'




const { Header, Sider, Content } = Layout;

class Finished extends React.Component {
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
           
            {/* The finished orders page components */}
            <Searchbar></Searchbar>
            <div className="cluster container--FinishedContent">
              <div className="container--FinishedOrderList">
                <FinishedOrderList></FinishedOrderList>
              </div>
              <div className="container--FinishedOrderDetail">
                <FinishedOrderDetail>{this.props}</FinishedOrderDetail>
                <FinishedOrderDetailCancel>{this.props}</FinishedOrderDetailCancel>
              </div>

              
              


            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Finished;