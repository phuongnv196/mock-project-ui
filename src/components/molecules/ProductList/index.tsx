import ProductItem from "components/atoms/ProductItem";
import { Item } from "models/item.model";
import './index.scss';

const ProductList = (props: any) => {
    const { products } = props;


    return (
        !products || products.length == 0?
        <div>Không có sản phẩm nào</div>: 
        <div className="product-list row">
        {
            products.map((product: Item) => <ProductItem product={product}></ProductItem>)
        }
        </div>
    )
}

export default ProductList