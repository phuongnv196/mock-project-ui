import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router';
import DefaultLayout from "../../templates/DefaultLayout";
import {RootState} from "../../../app/store";
<<<<<<< Updated upstream
import SignInForm from "components/molecules/SignInForm";
import SignUpForm from "components/molecules/SignUpForm";
=======
import {BrowserView, MobileView} from 'react-device-detect';
import MobileLayout from 'components/templates/MobileLayout';
import ShopList from 'components/molecules/ShopList';
import { getAllShop, getAllShops } from 'redux/reducers/Shop/shopSlice';
>>>>>>> Stashed changes

const Home = () => {
    // let history = useHistory();
    // let location = useLocation();
    // const countData = {count: 0};
    // const onSavePostClicked = async () => {
    //     history.push("/home");
    // }

    const shops = useSelector((state: RootState) => state.shopReducer);

<<<<<<< Updated upstream
    if(!authentication) {
        return (
            <div>Home</div>
        );
    } else {
        return (
            <SignUpForm></SignUpForm>
        )
    }
=======
    const dispatch = useDispatch();
>>>>>>> Stashed changes

    useEffect(() => {
        dispatch(getAllShops());
    }, [])
    // if(!authentication) {
    //     return (
    //         <div>Home</div>
    //     );
    // } else {
    //     return <Router></Router>
    // }
    return (
        <React.Fragment>
            <BrowserView>
                <DefaultLayout>
                    <ShopList shops={shops.shopDataList}></ShopList>
                </DefaultLayout>
            </BrowserView>
            <MobileView>
                <MobileLayout>
                    sdhfkjsdhf
                </MobileLayout>
            </MobileView>
        </React.Fragment>
    )
}
export default Home
