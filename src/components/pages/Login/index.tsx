import MobileLayout from 'components/templates/MobileLayout';
import React from 'react';
import { Login as LoginForm } from "../../organisms/Login";

const Login = () => {
    return (
        <MobileLayout isHideFooter="true">
            <LoginForm />
        </MobileLayout>
    );
}
export default Login;
