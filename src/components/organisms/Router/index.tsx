import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Home, About, Login, Cart} from "../../pages";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/"><Home/></Route>
                <Route path="/cart"><Cart/></Route>
                <Route path="/login"><Login/></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router
