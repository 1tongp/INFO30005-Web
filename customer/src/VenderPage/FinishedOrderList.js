import React from 'react';
import './component.css'
import DetailButton from './ViewDetail.js'
import FinishedEmpty from './FinishedEmpty.js'

// This is order list component for finished orders page 
class FinishedOrderList extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }
    render() {
        return (
            <div className="cluster">
                {
                    (this.props.children.location.state.orders.length > 0) ? 
                    this.props.children.location.state.orders.map((singleOrder) => (
                        <>  
                            <div className="container--finishedorderlist"> 
                                <div className="container--basicinfo">
                                    <p>Order Id: {singleOrder._id}</p>
                                    <p>Customer Given Name: {singleOrder.customerName}</p>
                                    <p>{singleOrder.createTime.slice(0, 10)}  || {singleOrder.createTime.slice(11, 19)}</p>
                                    <p>Order Status: {singleOrder.status}</p>
                                </div>
                                <DetailButton> View Order Detail{singleOrder}</DetailButton>
                            </div>
                            
                        </>
                    ))
                : <FinishedEmpty></FinishedEmpty>
                }
            </div>
        )
    }
}

export default FinishedOrderList;