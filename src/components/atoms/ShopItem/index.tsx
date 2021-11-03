import { RootState } from 'app/store';
import ProductList from 'components/molecules/ProductList';
import { ShopModel } from 'models/shop.model';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getShopById } from 'redux/reducers/Home/homeSlice';
import './index.scss';

const ShopItem = (props: any) => {
    const {shopData} = props;
    const shopItem = shopData as ShopModel;
    const shop = useSelector((state: RootState) => state.shopReducer);
    
    const [isShow, setIsShow] = useState(props.isShow);
    const [isLoadedData, setIsLoadedData] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(isShow && shopItem.shopId) {
            dispatch(getShopById(shopItem.shopId || ""));
        }
    }, [shop]);

    const handleClickHeader = (): any => {
        setIsShow(!isShow);
        if(!shopItem.items && !isShow) {
            dispatch(getShopById(shopItem.shopId || ""));
            setIsLoadedData(true);
        }
    }

    return (
        <div className="col-12" style={{paddingLeft: "10px", paddingRight: "10px"}}>
            <div className="card">
                <div className="card-header" onClick={handleClickHeader}>
                <Link to={`shop?shopId=${shopItem.shopId}`}>
                    <img className="shop-image" src={shopItem.image ? `data:image/png;base64, ${shopItem.image}` : '/images/no-image.jpg'} alt="" />
                    {shopItem.name}
                </Link>
                </div>
                <div className={`collapse ${isShow ? 'show': 'hide'}`} aria-labelledby="headingOne" data-parent="#accordion" >
                    <div className="card-body">
                        {
                            <ProductList products={shopItem.items}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopItem