import React from 'react';
import 'antd/dist/antd.css';
import './component.css'
import './FulfilledOrderlist'
import { Layout} from 'antd';
import {CoffeeOutlined} from '@ant-design/icons';

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