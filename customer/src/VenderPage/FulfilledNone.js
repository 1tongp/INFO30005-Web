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
  render() {
    return (
      <div className="container--PrepareNoOrder">
        <CoffeeOutlined className="coffeeIcon" />

        <p>THERE IS NO FULFILLED ORDER AT THE MOMENT</p>
      </div>
    );
  }
}

export default FulfilledNone;