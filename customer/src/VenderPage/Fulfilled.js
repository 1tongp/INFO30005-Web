import React from 'react';
import 'antd/dist/antd.css';
import './component.css'
import './FulfilledOrderlist'

import { Layout} from 'antd';
import FulfilledOrderlist from './FulfilledOrderlist';
import Sidebar from './Sider.js'

const { Header, Content } = Layout;

class Fulfilled extends React.Component {
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
            {/* The fulfilled orders page components(list) */}
            <FulfilledOrderlist>{this.props}</FulfilledOrderlist>        
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Fulfilled;