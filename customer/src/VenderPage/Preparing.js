import React from 'react';
import Orderlist from './Orderlist.js'
import 'antd/dist/antd.css';
import './component.css';
import './FulfilledOrderlist';
import { Layout} from 'antd';
import Sidebar from './Sider.js'

const { Header, Content } = Layout;

class SiderDemo extends React.Component {
  constructor(props){
    super(props);
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
      <Layout className="reset-height">
        <Sidebar>{this.props.children}</Sidebar>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <p>SNACK IN A VAN</p>
          </Header>
          <Content
            className="site-layout-background-content"
            style={{
              margin: '0px 0px',
              padding: 24,
              minHeight: 300,
              maxHeight: 720,
            }}
          >
            <Orderlist>{this.props}</Orderlist>        
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;