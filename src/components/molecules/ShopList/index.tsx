import { Collapse} from "antd";
import { ShopItem } from "components/atoms";
import { ShopModel } from "models/shop.model";

const { Panel } = Collapse;

const ShopList = (props: any) => {
    const { shops } = props;

    return (
        <div id="accordion" className="row">
            {
                shops.map((item: ShopModel, index: number) =>  <ShopItem isShow={index == 0} shopData={item}/>)
            }
        </div>
    )
}

export default ShopList;