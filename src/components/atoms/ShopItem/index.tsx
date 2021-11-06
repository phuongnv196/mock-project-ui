import { RootState } from 'app/store';
import ProductList from 'components/molecules/ProductList';
import { ShopModel } from 'models/shop.model';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getShopById } from 'redux/reducers/Shop/shopSlice';
import './index.scss';

const ShopItem = (props: any) => {
    const {shopId} = props;
    const shop = useSelector((state: RootState) => state.shopReducer);
    
    const [isShow, setIsShow] = useState(props.isShow);
    const [isLoadedData, setIsLoadedData] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(isShow && !!shopId) {
            dispatch(getShopById(shopId || ""));
        }
    }, []);

    const handleClickHeader = (): any => {
        setIsShow(!isShow);
        if(!shopId && !isShow) {
            dispatch(getShopById(shopId || ""));
            setIsLoadedData(true);
        }
    }

    return (
        <div className="col-12" style={{paddingLeft: "10px", paddingRight: "10px"}}>
            <div className="card">
                <div className="card-header" onClick={handleClickHeader}>
                <Link to={`shop?shopId=${shop.shop.shopId}`}>
                    <img className="shop-image" src={shop.shop.image ? `data:image/png;base64, ${shop.shop.image}` : '/images/no-image.jpg'} alt="" />
                    {shop.shop.name}
                </Link>
                </div>
                <div className={`collapse ${isShow ? 'show': 'hide'}`} aria-labelledby="headingOne" data-parent="#accordion" >
                    <div className="card-body">
                        {
                            <ProductList products={shop.shop.items}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopItem