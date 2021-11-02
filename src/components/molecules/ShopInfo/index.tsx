import { ShopModel } from 'models/shop.model';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { useEffect } from 'react';
import { getShopById } from 'redux/reducers/Shop/shopSlice';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import './index.scss';

const ShopInfo = (props: any) => {
    const {shopId} = props; 
    const location = useLocation();
    const dispatch = useDispatch();
    const shops = useSelector((state: RootState) => state.shopReducer);

    useEffect(() => {
        dispatch(getShopById(shopId));
    }, []);

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    <img className="shop-avatar" src={shops.shop.image ? `data:image/png;base64, ${shops.shop.image}` : '/images/no-image.jpg'}/>
                    <span className="shop-name">{shops.shop.name}</span>
                </h5>
                <p className="card-text">
                    <label>Số điện thoại: </label> {shops.shop.phoneNumber}
                </p>
            </div>
        </div>
    );
}

export default ShopInfo;