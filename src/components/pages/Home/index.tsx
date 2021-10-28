import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router';
import DefaultLayout from "../../templates/DefaultLayout";
import {RootState} from "../../../app/store";
import {BrowserView, MobileView} from 'react-device-detect';
import MobileLayout from 'components/templates/MobileLayout';
import ShopList from 'components/molecules/ShopList';
import { getAllShops } from 'redux/reducers/Home/homeSlice';
import { Carousel } from 'antd';

const Home = () => {
    // let history = useHistory();
    // let location = useLocation();
    // const countData = {count: 0};
    // const onSavePostClicked = async () => {
    //     history.push("/home");
    // }

    const shops = useSelector((state: RootState) => state.homeReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllShops());
    }, [])

    return (
        <React.Fragment>
            <BrowserView>
                <div className="container">
                    <DefaultLayout>
                        <Carousel autoplay>
                            <div>
                                <img src="images/samsung.jpg" width="100%"></img>
                            </div>
                            <div>
                                <img src="images/samsung2.png" width="100%"></img>
                            </div>
                        </Carousel>
                        <hr/>
                        <ShopList shops={shops.shopDataList}></ShopList>
                    </DefaultLayout>
                </div> 
            </BrowserView>
            <MobileView>
                <MobileLayout>
                    <Carousel autoplay>
                        <div>
                            <img src="images/samsung.jpg" width="100%"></img>
                        </div>
                        <div>
                            <img src="images/samsung2.png" width="100%"></img>
                        </div>
                    </Carousel>
                    <hr/>
                    <ShopList shops={shops.shopDataList}></ShopList>
                </MobileLayout>
            </MobileView>
        </React.Fragment>
    )
}
export default Home
