import { Item } from "models/item.model";
import NumberFormat from 'react-number-format';
import './index.scss';

const ProductItem = (props: any) => {

    const { product } = props;
    const productItem = product as Item;


    const nameFormated = (name?: string) => {
        return (name && name.length >= 25 ?
            name.substring(0, 24) + '...' : name);
    }

    return (
        // <div className="product-item">
        //     <div className="product-image">
        //         <img src={`data:image/png;base64, ${productItem.image}`} alt="" />
        //     </div>
        //     {productItem.name}
        // </div>
        <div className="col-lg-2 col-md-3 col-sm-4 col-6 product-item mt-2">
            <div className="card product-card">
                <div className="image-container">
                    <img src={productItem.image ? `data:image/png;base64, ${productItem.image}` : '/images/no-image.jpg'} className="img-fluid rounded thumbnail-image"/>
                </div>
                <div className="product-detail-container p-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="dress-name" title={productItem.name}>{nameFormated(productItem.name)}</h5>
                    </div>
                    <div className="d-flex justify-content-between align-items-center pt-1">
                    <div> 
                        <NumberFormat
                            value={productItem.price}
                            className="new-price"
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'₫'}
                        />
                    </div> 
                    <span className="buy" title="Thêm vào giỏ hàng">
                        <button className="btn btn-outline-danger">
                        <i className="fa fa-cart-plus"></i>
                        </button>
                    </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem;