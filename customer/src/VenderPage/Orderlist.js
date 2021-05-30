import React from 'react';
import './component.css'
import SingleOrder from './SingleOrder.js'
import PrepareNoOrder from './PrepareNoOrder.js'

// This is the white order list for preparing page
class Orderlist extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            diff: "",
        }
    }

    render(){
        return (
        <div className="cluster">
            
            {
                (this.props.children.children.location.state.orders.length > 0) ? 
                this.props.children.children.location.state.orders.map((order) =>(
                    <SingleOrder>{order}</SingleOrder>
                ))
                : <PrepareNoOrder>{this.props}</PrepareNoOrder>
              
            }
            
        </div>
        )
    }
}

export default Orderlist;