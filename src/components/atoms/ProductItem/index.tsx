import { Item } from "models/item.model";
import NumberFormat from 'react-number-format';
import './index.scss';
import React, { useEffect, useState } from "react";
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { getShopById } from "redux/reducers/Shop/shopSlice";
import { Modal } from 'antd';
import UpdateItem from "../UpdateItem";
import { useLocation } from 'react-router';
import { message } from "antd";

const ProductItem = (props: any) => {

    const { product } = props;
    const productItem = product as Item;
    const location = useLocation();
    const dispatch = useDispatch();
    const shops = useSelector((state: RootState) => state.shopReducer);
    const customer = useSelector((state: RootState) => state.customerReducer);
    const [isEnableEditItem, setIsEnableEditItem] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isShowAddCart, setIsShowAddCart] = useState(true);
    var search = queryString.parse(location.search);

    const getShopData = () => {
        dispatch(getShopById(search.shopId as string));
    }

    useEffect(() => {
        setIsShowAddCart(!(shops.currentShop && shops.currentShop.shopId));
        if (shops.currentShop && shops.currentShop.shopId && shops.currentShop.shopId == search.shopId) {
            setIsEnableEditItem(true);
        }
    })

    const onSaveSuccess = (data: any) => {
        setTimeout(() => {
            getShopData();
        }, 1000);
        setIsModalVisible(false);
    }

    const nameFormated = (name?: string) => {
        return (name && name.length >= 25 ?
            name.substring(0, 24) + '...' : name);
    }

    const addToCart = () => {
        if (customer.customer && customer.customer.customerId) {
            message.success('Đã thêm vào giỏ hàng!');
        } else {
            message.error('Vui lòng đăng nhập để tiếp tục!');
        }
    }

    return (
        <div className="col-lg-3 col-md-4 col-sm-4 col-6 product-item mt-2">
            <Modal title="Chỉnh sửa sản phẩm" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={[]}>
                <UpdateItem onSaveSuccess={onSaveSuccess} shopId={shops.shop.shopId} defaultItem={productItem} />
            </Modal>
            <div className="card product-card">
                <div className="image-container">
                    <img src={productItem.image ? `data:image/png;base64, ${productItem.image}` : '/images/no-image.jpg'} className="img-fluid rounded thumbnail-image" />
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
                        {
                            isShowAddCart ?
                                <span className="buy" title="Thêm vào giỏ hàng">
                                    <button className="btn btn-outline-danger" onClick={addToCart}>
                                        <i className="fa fa-cart-plus"></i>
                                    </button>
                                </span> : ''
                        }

                        {
                            isEnableEditItem ?
                                <>
                                    {/* <span className="edit" title="Xóa">
                                <button className="btn btn-outline-primary" onClick={() => setIsModalVisible(true)}>
                                    <i className="fa fa fa-trash"></i>
                                </button>
                            </span> */}
                                    <span className="edit" title="Chỉnh sửa sản phẩm">
                                        <button className="btn btn-outline-primary" onClick={() => setIsModalVisible(true)}>
                                            <i className="fa fa fa-pen"></i>
                                        </button>
                                    </span>
                                </>
                                : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem;