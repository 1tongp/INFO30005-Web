import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import RegistrationPage from './RegistrationPage/Registration.js'
import AfterLoginMain from './Menu/anchor.js';
import OrderList from './myOrderPage/OrderList.js';
import CustomerMain from './HomePage/Main.js';
import App from './App.js';
import Component from './VenderPage/TestComponent.js';
import Fulfilled from './VenderPage/Fulfilled.js';
import Finished from './VenderPage/FinishedOrders';
import Vendor from './VenderPage/Landing'
class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={App}></Route>
                    <Route path="/customer" exact component={CustomerMain}></Route>
                    <Route path="/customer/order" exact component={OrderList}></Route>
                    <Route path="/customer/menu" exact component={AfterLoginMain}></Route>
                    <Route path="/customer/signup" exact component={RegistrationPage}></Route>
                    <Route path="/vendor/preparing" exact component={Component}></Route>
                    <Route path="/vendor/fulfilled" exact component={Fulfilled}></Route>
                    <Route path="/vendor/finished" exact component={Finished}></Route>
                    <Route path="/vendor" exact component={Vendor}></Route>
                    
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;