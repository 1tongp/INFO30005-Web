import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import shoppingCart from './ShoppingCart/ShoppingCart.js';
import shoppingCartEmpty from './ShoppingCart/ShoppingCartEmpty.js';
import LoginPage from './loginPage/Login.js';
import registrationPage from './RegistrationPage/Registration.js'
import AfterLoginMain from './Menu/anchor.js';
import OrderList from './myOrderPage/OrderList.js';
import CustomerMain from './HomePage/Main.js';
import MenuPreview from './MenuPreview/anchor.js';
import App from './App.js';

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
                    <Route path="/customer/shoppingcart/empty" exact component={shoppingCartEmpty}></Route>
                    <Route path="/customershoppingcart" exact component={shoppingCart}></Route>
                    <Route path="/customer/signup" exact component={registrationPage}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;