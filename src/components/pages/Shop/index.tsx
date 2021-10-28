import { useLocation } from 'react-router';
import queryString from 'query-string';
import DefaultLayout from "components/templates/DefaultLayout";
import MobileLayout from "components/templates/MobileLayout";
import React, { useEffect } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { getShopById } from "redux/reducers/Shop/shopSlice";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import ProductList from 'components/molecules/ProductList';

const Shop = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const shops = useSelector((state: RootState) => state.shopReducer);

    useEffect(() => {
        var search = queryString.parse(location.search);
        dispatch(getShopById(search.shopId as string));
    }, []);

    return (
        <React.Fragment>
            <BrowserView>
                <div className="container">
                    <DefaultLayout>
                        <ProductList products={shops.shop.items || []}></ProductList>
                    </DefaultLayout>
                </div> 
            </BrowserView>
            <MobileView>
                <MobileLayout>
                    <ProductList products={shops.shop.items || []}></ProductList>
                </MobileLayout>
            </MobileView>
        </React.Fragment>
    );
}

export default Shop;