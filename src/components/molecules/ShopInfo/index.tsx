import { ShopModel } from 'models/shop.model';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { useEffect } from 'react';
import { getShopById, shopLogOut } from 'redux/reducers/Shop/shopSlice';
import { useHistory, Link } from 'react-router-dom';
import queryString from 'query-string';

import './index.scss';

const ShopInfo = (props: any) => {
    const { shopId, isShowLogOutButton } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const shops = useSelector((state: RootState) => state.shopReducer);

    useEffect(() => {
        dispatch(getShopById(shopId));
    }, [shopId]);

    const handleClickLogOut = () => {
        dispatch(shopLogOut());
        history.push('/');
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    <img className="shop-avatar" src={shops.shop.image ? `data:image/png;base64, ${shops.shop.image}` : '/images/no-image.jpg'} />
                    <span className="shop-name">{shops.shop.name}</span>
                    {isShowLogOutButton && <button className="btn btn-primary " style={{ float: 'right' }} onClick={handleClickLogOut}>Đăng xuất</button>}
                    {
                        isShowLogOutButton &&
                        <Link to={`/shop?shopId=${shopId}`} style={{ float: 'right', marginRight: "5px" }}>
                            <button className="btn btn-primary">Quản lý</button>
                        </Link>
                    }
                </h5>
                <p className="card-text">
                    <label>Số điện thoại: </label> {shops.shop.phoneNumber}
                </p>
            </div>
        </div>
    );
}

export default ShopInfo;