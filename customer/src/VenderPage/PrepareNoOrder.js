import React from 'react';
import 'antd/dist/antd.css';
import './component.css'
import './FulfilledOrderlist'
import {CoffeeOutlined} from '@ant-design/icons';

class PrepareNoOrder extends React.Component {
  render() {
    return (
      <div className="container--PrepareNoOrder">
        <CoffeeOutlined className="coffeeIcon" />
        <p>HAVE A BREAK</p>
        <p>THERE IS NO ORDER AT THE MOMENT</p>
      </div>
    );
  }
}

export default PrepareNoOrder;