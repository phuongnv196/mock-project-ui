import MobileLayout from 'components/templates/MobileLayout';
import React from 'react';
import SignUpForm from "../../molecules/SignUpForm";

const SignUp = () => {
    return (
        <MobileLayout isHideFooter="true">
            <SignUpForm/>
        </MobileLayout>
    );
}
export default SignUp;
