import { Link, useLocation, useHistory } from "react-router-dom";
import { SignInForm, SignUpForm } from "../../molecules";
import './index.scss';
export const Login = () => {
    const location = useLocation();
    const history = useHistory();

    const onLoginSuccess = () => {
        const state = location.state as any;
        if (state && state.redirect) {
            history.push(state.redirect);
        } else {
            history.push('/');
        }
    }

    return (
        <div className="row" >
            <div className="col-md-6 mx-auto p-0">
                <div className="card">
                    <SignInForm onLoginSuccess={onLoginSuccess} />
                </div>
            </div>
        </div>
    );
}
