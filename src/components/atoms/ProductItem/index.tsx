import { Item } from "models/item.model";
import './index.scss';

const ProductItem = (props: any) => {

    const { product } = props;
    const productItem = product as Item;

    return (
        <div className="product-item">
            <div className="product-image">
                <img src={`data:image/png;base64, ${productItem.image}`} alt="" />
            </div>
            {productItem.name}
        </div>
    )
}

export default ProductItem;