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
                        <div style={{height: '100px', width: '100%'}}>đ</div>
                        <ShopList shops={shops.shopDataList}></ShopList>
                    </DefaultLayout>
                </div> 
            </BrowserView>
            <MobileView>
                <MobileLayout>
                    <Carousel autoplay>
                        <div>
                        <h3>1</h3>
                        </div>
                        <div>
                        <h3>2</h3>
                        </div>
                        <div>
                        <h3>3</h3>
                        </div>
                        <div>
                        <h3>4</h3>
                        </div>
                    </Carousel>
                    <ShopList shops={shops.shopDataList}></ShopList>
                </MobileLayout>
            </MobileView>
        </React.Fragment>
    )
}
export default Home
