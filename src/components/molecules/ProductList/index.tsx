import ProductItem from "components/atoms/ProductItem";
import { Item } from "models/item.model";

const ProductList = (props: any) => {
    const { products } = props;


    return (
        <div className="product-list">
        {
            products.map((product: Item) => <ProductItem product={product}></ProductItem>)
        }
        </div>
    )
}

export default ProductList