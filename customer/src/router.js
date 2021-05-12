import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import shoppingCart from './ShoppingCart/ShoppingCart.js';
import shoppingCartEmpty from './ShoppingCart/ShoppingCartEmpty.js';
import LoginPage from './loginPage/Login.js';
import registrationPage from './RegistrationPage/Registration.js'
import AfterLoginMain from './Menu/anchor.js';
import OrderList from './myOrderPage/OrderList.js';
import Main from './HomePage/Main.js';
import MenuPreview from './MenuPreview/anchor.js';
import Component from './VenderPage/TestComponent.js'
import Fulfilled from './VenderPage/Fulfilled.js'
import Finished from './VenderPage/FinishedOrders'
import PrepareNoOrder from './VenderPage/PrepareNoOrder'
import FinishedEmpty from './VenderPage/FinishedEmpty'

class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Main}></Route>
                    <Route path="/customer/login" exact component={LoginPage}></Route>
                    <Route path="/customer/order" exact component={OrderList}></Route>
                    <Route path="/customer/menu" exact component={AfterLoginMain}></Route>
                    <Route path="/customer/menupreview" exact component={MenuPreview}></Route>

                    {/* below url haven't use */}
                    <Route path="/customer/shoppingcart/empty" exact component={shoppingCartEmpty}></Route>
                    <Route path="/customershoppingcart" exact component={shoppingCart}></Route>
                    <Route path="/customer/signup" exact component={registrationPage}></Route>
                    <Route path="/preparing" exact component={Component}></Route>
                    <Route path="/fulfilled" exact component={Fulfilled}></Route>
                    <Route path="/finished" exact component={Finished}></Route>
                    <Route path="/preparing/noorder" exact component={PrepareNoOrder}></Route>
                    <Route path="/finished/empty" exact component={FinishedEmpty}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;