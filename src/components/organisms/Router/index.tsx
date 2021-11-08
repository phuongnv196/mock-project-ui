import SignUp from 'components/pages/Signup';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, About, Login, Cart, Shop, User, Order } from "../../pages";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route path="/cart"><Cart /></Route>
                <Route path="/login"><Login /></Route>
                <Route path="/signup"><SignUp /></Route>
                <Route path="/shop"><Shop /></Route>
                <Route path="/user"><User /></Route>
                <Route path="/order"><Order/></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router
