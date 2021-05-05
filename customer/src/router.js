import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import shoppingCart from './ShoppingCart/ShoppingCart.js';
import shoppingCartEmpty from './ShoppingCart/ShoppingCartEmpty.js';
import LoginPage from './loginPage/Login.js';
import registrationPage from './RegistrationPage/Registration.js'
import CustomerMain from './customerMain.js';
import MyOrder from './myOrderPage/MyOrder.js'

class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    {/* <Route path="/" exact component={App}></Route> */}

                    {/* Routes should be same as the backend routes, /shoppingcart/empty, 
                    /shoppingcart, /signup are not connected to the backend interaction*/}
                    <Route path="/shoppingcart/empty" exact component={shoppingCartEmpty}></Route>
                    <Route path="/shoppingcart" exact component={shoppingCart}></Route>
                    <Route path="/customer/login" exact component={LoginPage}></Route>
                    <Route path="/customer" exact component={CustomerMain}></Route>
                    <Route path="/signup" exact component={registrationPage}></Route>
                    <Route path="/order" exact component={MyOrder}></Route>

                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;