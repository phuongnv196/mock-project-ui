import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router';
import DefaultLayout from "../../templates/DefaultLayout";
import {RootState} from "../../../app/store";
import SignInForm from "components/molecules/SignInForm";
import SignUpForm from "components/molecules/SignUpForm";

const Home = () => {
    // let history = useHistory();
    // let location = useLocation();
    // const countData = {count: 0};
    // const onSavePostClicked = async () => {
    //     history.push("/home");
    // }

    const authentication = useSelector((state: RootState) => state.userReducer);

    if(!authentication) {
        return (
            <div>Home</div>
        );
    } else {
        return (
            <SignUpForm></SignUpForm>
        )
    }

}
export default Home
