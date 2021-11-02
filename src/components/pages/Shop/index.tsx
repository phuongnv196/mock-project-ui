import { useLocation } from 'react-router';
import queryString from 'query-string';
import DefaultLayout from "components/templates/DefaultLayout";
import MobileLayout from "components/templates/MobileLayout";
import React, { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { getShopById } from "redux/reducers/Shop/shopSlice";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import ProductList from 'components/molecules/ProductList';
import ShopInfo from 'components/molecules/ShopInfo';

import './index.scss';
import CreateItem from 'components/atoms/CreateItem';
import { Modal } from 'antd';

const Shop = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const shops = useSelector((state: RootState) => state.shopReducer);
    const [isEnableAddItem, setIsEnableAddItem] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(true);

    useEffect(() => {
        var search = queryString.parse(location.search);
        dispatch(getShopById(search.shopId as string));
        if (shops.shop && shops.shop.shopId == search.shopId) {
            setIsEnableAddItem(true);
        }
    }, []);

    return (
        <React.Fragment>
            <Modal title="Basic Modal" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={[]}>
                <CreateItem /> 
            </Modal>
            <BrowserView>
                <div className="container">
                    <DefaultLayout>
                        <ShopInfo shopData={shops}/>
                        <div className="card mt-2">
                            <div className="card-header product-list-header">
                                <label className="h5">Danh sách sản phẩm</label>
                                {
                                    isEnableAddItem ? 
                                    <button className="btn btn-success">
                                        <i className="fa fa-plus"></i>
                                        Thêm sản phẩm
                                    </button>
                                    : ''
                                }
                            </div>
                            <div className="card-body">
                                <ProductList products={shops.shop.items || []}></ProductList>
                            </div>
                        </div>
                    </DefaultLayout>
                </div> 
            </BrowserView>
            <MobileView>
                <MobileLayout>
                    <ShopInfo shopData={shops}/>
                    <div className="card mt-2">
                        <div className="card-header product-list-header">
                            <label className="h5">Danh sách sản phẩm</label>
                            {
                                isEnableAddItem ? 
                                <button className="btn btn-success">
                                    <i className="fa fa-plus"></i>
                                </button>
                                : ''
                            }
                        </div>
                        <div className="card-body">
                            <ProductList products={shops.shop.items || []}></ProductList>
                        </div>
                    </div>
                </MobileLayout>
            </MobileView>
        </React.Fragment>
    );
}

export default Shop;