import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './cutomerPages/App.js';
import customerMain from './cutomerPages/CustomerMain.js';

class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={App}></Route>
                    <Route path="/customer" exact component={customerMain}></Route>

                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;