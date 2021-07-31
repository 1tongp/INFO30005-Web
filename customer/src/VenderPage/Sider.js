import React from 'react';
import 'antd/dist/antd.css';
import './component.css'
import './FulfilledOrderlist'
import axios from '../API/axios.js';
import { Layout, Menu, Modal} from 'antd';
import logo from '../images/logo.png';

const { Sider } = Layout;

class Sidebar extends React.Component {
  constructor(props){
    super(props);
  }

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

  toPrepar = () => {
    axios.get('/order/' + this.props.children.location.state.vendor.id + '?status=outstanding').then(response =>{
      console.log(response);
      if(!response.data.success){
        this.props.children.history.push('/vendor/preparing', {vendor: this.props.children.location.state.vendor, orders:[], key:'1', position: this.props.children.location.state.position})
      }
      else{
        this.props.children.history.push('/vendor/preparing', {vendor: this.props.children.location.state.vendor, orders: response.data.orders, key:'1', position: this.props.children.location.state.position});
      }
    })
  }

  toFulfilled = () => {
    axios.get('/order/' + this.props.children.location.state.vendor.id + '?status=fulfilled').then(response =>{
      console.log(response);
      console.log(this.props);
      if(!response.data.success){
        this.props.children.history.push('/vendor/fulfilled', {vendor: this.props.children.location.state.vendor, orders:[], key:'2', position: this.props.children.location.state.position})
      }
      else{
        this.props.children.history.push('/vendor/fulfilled', {vendor: this.props.children.location.state.vendor, orders: response.data.orders, key:'2', position: this.props.children.location.state.position});
      }
    })
  }

  toFinished = () => {
    axios.get('/order/' + this.props.children.location.state.vendor.id + '?status=completed').then(response =>{
      console.log(response);
      if(!response.data.success){
        console.log("empty");
        this.props.children.history.push('/vendor/finished', {vendor: this.props.children.location.state.vendor, orders:[], key:'3', position: this.props.children.location.state.position})
      }
      else{
        this.props.children.history.push('/vendor/finished', {vendor: this.props.children.location.state.vendor, orders: response.data.orders, key:'3', position: this.props.children.location.state.position});
      }
    })
  }

  toLocation = () => {
    axios.post('/vendor/park/' + this.props.children.location.state.vendor.id,{
      currentAddress: 'none',
      parked: false,
      readyForOrder: false,
      location: ['0','0']
    }).then(response1 =>{
      console.log(response1);
    })
    this.props.children.history.push('/vendor', {vendor: this.props.children.location.state.vendor, position: this.props.children.location.state.position})
  }

  toClose = () =>{
    alert("You've closed the snack van!")
    axios.post('/vendor/park/' + this.props.children.location.state.vendor.id,{
      currentAddress: 'none',
      parked: false,
      readyForOrder: false,
      location: ['0','0']
    }).then(response1 =>{
      console.log(response1);
    })
    this.props.children.history.push('../');
  }
  render() {
    return (
        <>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <img src={logo} className='logo'/>
          <Menu
          selectedKeys={[this.props.children.location.state.key]}
          mode="inline"
          theme="dark"
        >
            <Menu.Item key="1" onClick={this.toPrepar} selectedKeys={['1']}>
              PREPARING
            </Menu.Item>
            <Menu.Item key="2" onClick={this.toFulfilled} selectedKeys={['2']}>
              FULFILLED
            </Menu.Item>
            <Menu.Item key="3" onClick={this.toFinished} selectedKeys={['3']} >
              FINISHED 
              ORDERS
            </Menu.Item>
            <div className='sider-btn'>
            <button className="change-btn" onClick={() => this.props.children.history.push('/vendor', {vendor: this.props.children.location.state.vendor, position: this.props.children.location.state.position})}>
              CHANGE LOCATION
            </button>
            <button className="closevan" onClick={() => this.setModal1Visible(true)}>
              CLOSE VAN
            </button>
            </div>
            <Modal className='popup vendor-popup'
              centered
              closable={false}
              visible={this.state.modal1Visible}
              onOk={() => this.setModal1Visible(false), this.toClose}
              onCancel={() => this.setModal1Visible(false)}
              okText={'Logout'}
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