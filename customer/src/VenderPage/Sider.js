import React from 'react';
import Orderlist from './Orderlist.js'
import 'antd/dist/antd.css';
import './component.css'
import './FulfilledOrderlist'
import axios from '../API/axios.js';
import { Layout, Menu, Modal} from 'antd';
import logo from '../images/logo.png';

const { Header, Sider, Content } = Layout;

class Sidebar extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props)
  }

  state = {
    collapsed: false,
    modal1Visible: false,
  };

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
}

  // toggle = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed,
  //   });
  // };

  toPrepar = () => {
    axios.get('/order/' + this.props.children.location.state.vendor.id + '?status=outstanding').then(response =>{
      console.log(response);
      if(!response.data.success){
        this.props.children.history.push('/vendor/preparing/noorder', {vendor: this.propschildren.location.state.vendor})
      }
      else{
        this.props.children.history.push('/vendor/preparing', {vendor: this.props.children.location.state.vendor, orders: response.data.orders});
      }
    })
  }

  toFulfilled = () => {
    axios.get('/order/' + this.props.children.location.state.vendor.id + '?status=fulfilled').then(response =>{
      console.log(response);
      console.log(this.props);
      if(!response.data.success){
        this.props.children.history.push('/vendor/fulfilledNone', {vendor: this.props.children.location.state.vendor})
      }
      else{
        this.props.children.history.push('/vendor/fulfilled', {vendor: this.props.children.location.state.vendor, orders: response.data.orders});
      }
    })
  }

  toFinished = () => {
    axios.get('/order/' + this.props.children.location.state.vendor.id + '?status=finished').then(response =>{
      console.log(response);
      if(!response.data.success){
        this.props.children.history.push('/vendor/finished/empty', {vendor: this.props.children.location.state.vendor})
      }
      else{
        this.props.children.history.push('/vendor/finished', {vendor: this.props.children.location.state.vendor, orders: response.data.orders});
      }
    })
  }

  toClose = () =>{
    alert("You've closed the snack van!")
    this.props.children.history.push('../');
  }
  render() {
    return (
        <>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <img src={logo} className='logo'/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" onClick={this.toPrepar}>
              PREPARING
            </Menu.Item>
            <Menu.Item key="2" onClick={this.toFulfilled}>
              FULFILLED
            </Menu.Item>
            <Menu.Item key="3" onClick={this.toFinished} >
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
              onOk={() => this.setModal1Visible(false), this.toClose}
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