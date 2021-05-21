import React from 'react';
import './component.css'
import FinishedOrderDetail from './FinishedOrderDetail.js'
import FinishedOrderDetailCancel from './FinishedCancel'

// This is order list component for finished orders page 
class FinishedOrderList extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }
    render() {
        return (
            <div className="cluster container--finishedorderlist">
                {
                    this.props.children.location.state.orders.map((singleOrder) => (
                        <>
                            <div>
                                <p>Order Id: {singleOrder._id}</p>
                                <p>Customer Id: {singleOrder.customer}</p>
                            </div>
                            <div>
                                <p>{singleOrder.createTime.slice(0, 10)} {singleOrder.createTime.slice(11, 19)}</p>
                                <p>Order Status: {singleOrder.status}</p>

                            </div>
                            <div className="container--FinishedOrderDetail">
                                <FinishedOrderDetail>{singleOrder}</FinishedOrderDetail>
                                {/* <FinishedOrderDetailCancel>{singleOrder}</FinishedOrderDetailCancel> */}
                            </div>
                        </>
                    ))
                }
            </div>

        )




    }
}

export default FinishedOrderList;