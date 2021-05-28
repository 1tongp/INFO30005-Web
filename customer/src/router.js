import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import shoppingCart from './ShoppingCart/ShoppingCart.js';
import ShoppingCartEmpty from './ShoppingCart/ShoppingCartEmpty.js';
import LoginPage from './loginPage/Login.js';
import RegistrationPage from './RegistrationPage/Registration.js'
import AfterLoginMain from './Menu/anchor.js';
import OrderList from './myOrderPage/OrderList.js';
import CustomerMain from './HomePage/Main.js';
import MenuPreview from './MenuPreview/anchor.js';
import App from './App.js';
import Component from './VenderPage/TestComponent.js';
import Fulfilled from './VenderPage/Fulfilled.js';
import Finished from './VenderPage/FinishedOrders';
import MyProfile from './MyProfile/MyProfile.js';
import Vendor from './VenderPage/Landing'
import CommentPop from './components/CommentPopup.js'

class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={App}></Route>
                    <Route path="/customer" exact component={CustomerMain}></Route>
                    <Route path="/customer/login" exact component={LoginPage}></Route>
                    <Route path="/customer/order" exact component={OrderList}></Route>
                    <Route path="/customer/menu" exact component={AfterLoginMain}></Route>
                    <Route path="/customer/menupreview" exact component={MenuPreview}></Route>

                    {/* below url haven't use */}
                    <Route path="/customer/shoppingcart/empty" exact component={ShoppingCartEmpty}></Route>
                    <Route path="/customershoppingcart" exact component={shoppingCart}></Route>

                    <Route path="/customer/signup" exact component={RegistrationPage}></Route>
                    <Route path="/customer/myprofile" exact component={MyProfile}></Route>
                    <Route path="/vendor/preparing" exact component={Component}></Route>
                    <Route path="/vendor/fulfilled" exact component={Fulfilled}></Route>
                    <Route path="/vendor/finished" exact component={Finished}></Route>
                    <Route path="/vendor" exact component={Vendor}></Route>
                    <Route path="/customer/comment" exact component={CommentPop}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;