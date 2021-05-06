import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import shoppingCart from './ShoppingCart/ShoppingCart.js';
import shoppingCartEmpty from './ShoppingCart/ShoppingCartEmpty.js';
import LoginPage from './loginPage/Login.js';
import registrationPage from './RegistrationPage/Registration.js'
import AfterLoginMain from './Menu/anchor.js';
import Menu from './Menu/Menu.js';
import OrderList from './myOrderPage/OrderList.js';
import Main from './HomePage/Main.js';
import MenuPreview from './MenuPreview/anchor.js';
import MenuPre from './MenuPreview/Menu.js';

class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Main}></Route>
                    <Route path="/shoppingcart/empty" exact component={shoppingCartEmpty}></Route>
                    <Route path="/shoppingcart" exact component={shoppingCart}></Route>
                    <Route path="/customer/login" exact component={LoginPage}></Route>
                    <Route path="/signup" exact component={registrationPage}></Route>
                    <Route path="/order" exact component={OrderList}></Route>
                    <Route path="/snack" exact component={Menu}></Route>
                    <Route path="/customer" exact component={AfterLoginMain}></Route>
                    <Route path="/menupreview" exact component={MenuPreview}></Route>
                    <Route path="/menupre" exact component={MenuPre}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;