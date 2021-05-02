import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import shoppingCart from './ShoppingCart/ShoppingCart.js';
import shoppingCartEmpty from './ShoppingCart/ShoppingCartEmpty.js';
import AppStart from './appStartTest.js';
import CustomerMain from './customerMain.js';

class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    {/* <Route path="/" exact component={App}></Route> */}
                    <Route path='/' exact component={AppStart}></Route>
                    <Route path='/customer' exact component={CustomerMain}></Route>
                    <Route path="/shoppingcart/empty" exact component={shoppingCartEmpty}></Route>
                    <Route path="/shoppingcart" exact component={shoppingCart}></Route>

                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;