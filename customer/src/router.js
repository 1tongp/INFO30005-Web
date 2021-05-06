import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import shoppingCart from './ShoppingCart/ShoppingCart.js';
import shoppingCartEmpty from './ShoppingCart/ShoppingCartEmpty.js';
import LoginPage from './loginPage/Login.js';
import registrationPage from './RegistrationPage/Registration.js'
// import CustomerMain from './customerMain.js';
import AfterLoginMain from './Menu/anchor.js';
import MyOrder from './myOrderPage/MyOrder.js';
import Menu from './Menu/Menu.js';
import OrderList from './myOrderPage/OrderList.js';
class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    {/* <Route path="/" exact component={App}></Route> */}

                    
                    <Route path="/shoppingcart/empty" exact component={shoppingCartEmpty}></Route>
                    <Route path="/shoppingcart" exact component={shoppingCart}></Route>
                    <Route path="/customer/login" exact component={LoginPage}></Route>
                    {/* <Route path="/customer" exact component={CustomerMain}></Route> */}
                    <Route path="/signup" exact component={registrationPage}></Route>
                    <Route path="/order" exact component={OrderList}></Route>
                    <Route path="/snack" exact component={Menu}></Route>
                    <Route path="/customer" exact component={AfterLoginMain}></Route>
                    

                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;