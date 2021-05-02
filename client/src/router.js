import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './cutomerPages/App.js';
import customerMain from './cutomerPages/CustomerMain.js';
import loginPage from './loginPage/Login.js';

class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={App}></Route>
                    <Route path="/customer" exact component={customerMain}></Route>
                    <Route path="/login" exact component={loginPage}></Route>

                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;