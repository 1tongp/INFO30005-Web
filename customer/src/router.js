import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import shoppingCart from './ShoppingCart/ShoppingCart.js';
import shoppingCartEmpty from './ShoppingCart/ShoppingCartEmpty.js';
import loginPage from './loginPage/Login.js';
import registrationPage from './RegistrationPage/Registration.js'

class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    {/* <Route path="/" exact component={App}></Route> */}
                    <Route path="/shoppingcart/empty" exact component={shoppingCartEmpty}></Route>
                    <Route path="/shoppingcart" exact component={shoppingCart}></Route>
                    <Route path="/login" exact component={loginPage}></Route>
                    <Route path="/signup" exact component={registrationPage}></Route>

                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;