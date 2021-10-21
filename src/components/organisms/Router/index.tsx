import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Home, About, Login} from "../../pages";
import Navigator from "../Navigator";

const Router = () => {
    return (
        <BrowserRouter>
            <Navigator/>
            <Switch>
                <Route exact path="/"><Home/></Route>
                <Route path="/about"><About/></Route>
                <Route path="/login"><Login/></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router
