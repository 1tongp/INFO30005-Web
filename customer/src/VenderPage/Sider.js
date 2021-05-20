import React from 'react';
import Orderlist from './Orderlist.js'
import 'antd/dist/antd.css';
import './component.css'
import './FulfilledOrderlist'

import { Layout, Menu, Modal} from 'antd';
import logo from '../images/logo.png';

const { Header, Sider, Content } = Layout;

class Sidebar extends React.Component {
  state = {
    collapsed: false,
    modal1Visible: false,
  };

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
}

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
        <>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <img src={logo} className='logo'/>
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
            <button className="closevan" onClick={() => this.setModal1Visible(true)}>
              CLOSE VAN
            </button>
            <Modal className='popup vendor-popup'
              centered
              closable={false}
              visible={this.state.modal1Visible}
              onOk={() => this.setModal1Visible(false)}
              onCancel={() => this.setModal1Visible(false)}
              okText={'Confirm and Logout'}
              >
              <p>Done for Today?</p>
            </Modal>
          </Menu>
        </Sider>
    </>
    );
  }
}

export default Sidebar;