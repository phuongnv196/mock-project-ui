import { Link } from "react-router-dom";
import {SignInForm, SignUpForm} from "../../molecules";
import './index.scss';
export const Login = () => {
    return (
        <div className="row" >
            <div className="col-md-6 mx-auto p-0">
                <div className="card">
                    <SignInForm />
                </div>
            </div>
        </div>
    );
}
