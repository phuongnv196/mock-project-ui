import ProductItem from "components/atoms/ProductItem";
import { Item } from "models/item.model";
import { useEffect } from "react";
import './index.scss';

const ProductList = (props: any) => {
    const { products } = props;

    useEffect(() => {
        console.log(products);
    }, [products]);

    return (
        !products || products.length == 0 ?
            <div>Không có sản phẩm nào</div> :
            <div className="product-list row">
                {
                    products.map((product: Item) => <ProductItem key={product.itemId} product={product}></ProductItem>)
                }
            </div>
    )
}

export default ProductList