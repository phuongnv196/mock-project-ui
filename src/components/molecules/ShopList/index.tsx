import { Collapse} from "antd";
import { RootState } from "app/store";
import { ShopItem } from "components/atoms";
import { ShopModel } from "models/shop.model";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllShops,getShopById } from "redux/reducers/Home/homeSlice";

const { Panel } = Collapse;

const ShopList = (props: any) => {
    const dispatch = useDispatch();
    const shops = useSelector((state: RootState) => state.homeReducer);

    useEffect(() => {
        dispatch(getAllShops());
    }, [])
    return (
        <div id="accordion" className="row">
            {
                shops.shopDataList.map((item: ShopModel, index: number) =>  <ShopItem isShow={index == 0} key={item.shopId} shopId={item.shopId}/>)
            }
        </div>
    )
}

export default ShopList;