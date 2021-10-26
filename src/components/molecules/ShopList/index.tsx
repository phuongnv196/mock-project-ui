import { Collapse} from "antd";
import { ShopItem } from "components/atoms";
import { ShopModel } from "models/shop.model";

const { Panel } = Collapse;

const ShopList = (props: any) => {
    const { shops } = props;

    return (
        // <div>
            
        //     <Collapse
        //         defaultActiveKey={['1']}>
        //             {
        //                 shops.map((item: any) =>  
        //                 <Panel header="This is panel header 1" key="1">
        //                     <ShopItem/>
        //                 </Panel>)
        //             }
        // </Collapse>
        // </div>
        <div id="accordion" className="row">
            {
                shops.map((item: ShopModel, index: number) =>  <ShopItem isShow={false} shopData={item}/>)
            }
            
        </div>
    )
}

export default ShopList;