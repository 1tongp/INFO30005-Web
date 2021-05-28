import React from 'react';
import 'antd/dist/antd.css';
import './component.css'
import './FulfilledOrderlist'
class FinishedEmpty extends React.Component {
  render() {
    return (
      <div className="container--FinishedOrderDetail">
        <div className="container--orderdetail container--empty">
          <p>NO FINISHED ORDERS</p>
        </div>
      </div>
    );
  }
}

export default FinishedEmpty;