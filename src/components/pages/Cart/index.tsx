import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import CartList from "components/organisms/CartList";
import DefaultLayout from "components/templates/DefaultLayout";
import MobileLayout from "components/templates/MobileLayout";
import React, { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { getHubConnection } from 'app/hubConnection';
import { message, Modal } from 'antd';
import cartApi from 'api/cartApi';
import { CartItemModel } from 'models/cart-item.model';
import { Collapse } from 'antd';
import ShopInfo from 'components/molecules/ShopInfo';
import ProductList from 'components/molecules/ProductList';
import { Item } from 'models/item.model';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import './index.scss';
import CreateOrder from 'components/molecules/CreateOrder';

const { Panel } = Collapse;


const Cart = () => {
    const location = useLocation();
    const history = useHistory();
    const search = queryString.parse(location.search);
    const [cartState, setCartState] = useState({} as any);
    const [shopItems, setShopItems] = useState([] as any);
    const [customerCartState, setCustomerCartState] = useState({} as any);
    const currentCustomer = useSelector((state: RootState) => state.customerReducer);
    const [shopId, setShopId] = useState('');
    const [readyToOrder, setReadyToOrder] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const customerCartGroup = (data: Array<CartItemModel>) => {
        const customerCart: any = {};
        data.forEach((value: CartItemModel, index: number) => {
            var key = JSON.stringify({ customerId: value.customerId, customerName: value.customerName });
            if (!customerCart[key]) {
                customerCart[key] = [value];
            } else {
                customerCart[key].push(value);
            }
        });
        return customerCart;
    }

    const handleOrderCart = (data: any) => {
        var itemIncart = data.itemsInCart as Array<any>;
        var notRedyToOrderItem = itemIncart.findIndex((item) => {
            return item.readyToOrder == false;
        });
        setReadyToOrder(notRedyToOrderItem == -1 && currentCustomer.customer?.customerId == data.customerId);
    }

    useEffect(() => {
        if (search.cartId) {
            cartApi.getCartById(search.cartId as string, true).then((data) => {
                setCartState(data);
                setShopId(data.shopId as string);
                setShopItems(data.shop?.items);
                setCustomerCartState(customerCartGroup(data.itemsInCart));
                handleOrderCart(data);
                startCons(search.cartId as string);
            }).catch(() => {
                message.error('Không tìm thấy giỏ hàng!');
            });
        } else {

        }
    }, [])

    const updateCartData = () => {
        cartApi.getCartById(search.cartId as string, true).then((data) => {
            setShopItems(data.shop?.items);
            setCustomerCartState(customerCartGroup(data.itemsInCart));
            handleOrderCart(data);
        });
    }

    const startCons = async (cartId: string) => {
        const connection = await getHubConnection(`cart?cart=${cartId}`);
        connection.on('SubmitItems', (data) => {
            message.success(`${data.customerId} đã xác nhận`);
            updateCartData();
        });
        connection.on('UnsubmitItems', (data) => {
            message.destroy(`${data.customerId} đã bỏ xác nhận`);
            updateCartData();
        });
        connection.on('AddItemToCart', (data) => {
            message.info(`${data.customerName} đã thêm một sản phẩm vào giỏ hàng`);
            updateCartData();
        });
        connection.on('RemoveItemFromCart', (data) => {
            message.info(`${data.customerId} đã xóa một sản phẩm khỏi giỏ hàng`);
            updateCartData();
        });
        connection.on('RemovedCustomer', (data) => {
            message.info(`${data.customerId} đã xóa một người dùng!`);
        });
    }

    const handleRemoveCustomer = (e: any) => {
        var customerId = e.currentTarget.getAttribute("data-customerid");
        cartApi.removeCustomer(cartState.cartId, currentCustomer.customer?.customerId as string, customerId);
    }

    const handleSubmitCart = (e: any) => {
        var customerKey = e.currentTarget.getAttribute("data-customer");
        var customer = JSON.parse(customerKey);
        var items = customerCartState[customerKey].map((item: any) => {
            return { amount: item.amount, itemId: item.itemId }
        });
        cartApi.submitCart(items, customer.customerId, search.cartId as string).then((data) => {
            message.success('Xác nhận thành công!');
        });
    }

    const handleUnsubmit = (e: any) => {
        var customerKey = e.currentTarget.getAttribute("data-customer");
        var customer = JSON.parse(customerKey);
        cartApi.unSubmitCart(customer.customerId, search.cartId as string).then((data) => {
            message.success('Hủy nhận thành công!');
        });
    }

    const CustomerSubmitData = (customer: any) => {
        var isSubmited = customerCartState[JSON.stringify(customer)][0].readyToOrder;
        return (
            <label>
                {customer.customerName}
                <span style={{ paddingLeft: "10px" }} title={(isSubmited ? 'Đã xác nhận' : '')}>
                    <i className={`fa ${(isSubmited ? 'fa-check-circle' : '')} text-success`}></i>
                </span>
            </label>
        );
    }

    const DeleteCustomer = (customer: any) => {
        if (cartState.customerId === currentCustomer.customer.customerId || currentCustomer.customer.customerId === customer.customerId) {
            return (
                <i className="fa fa-trash text-danger pointer" title="Xóa" data-customerid={customer.customerId} onClick={handleRemoveCustomer}></i>
            )
        }
        return <></>;
    }

    const SubmitCustomer = (customer: any, cartItems: any[]) => {
        if (currentCustomer.customer.customerId === customer.customerId) {
            var submitStatus = cartItems[0].readyToOrder;
            if (submitStatus === false) {
                return (
                    <i className="ml-2 fa fa-check text-success" title="Xác nhận" data-customer={JSON.stringify(customer)} onClick={handleSubmitCart}></i>
                )
            } else {
                return (
                    <i className="ml-2 fa fa-undo text-primary" title="Hủy xác nhận" data-customer={JSON.stringify(customer)} onClick={handleUnsubmit}></i>
                )
            }
        }
        return <></>;
    }

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        message.success('Đã sao chép liên kết đến clipboard!');
    }

    const onSuccessCreateOrder = (data: any) => {
        message.success('Tạo đơn hàng thành công!');
        setTimeout(() => {
            history.push('/user')
        }, 1000);
    }

    return (
        <React.Fragment>
            <CreateOrder isShow={isModalVisible} onHide={() => setIsModalVisible(false)} onSuccess={onSuccessCreateOrder} cartId={search.cartId as string}></CreateOrder>
            <BrowserView>
                <div className="container">
                    <DefaultLayout>
                        {
                            search.cartId ?
                                <>
                                    <ShopInfo shopId={shopId} />
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="card mt-2">
                                                <div className="card-header product-list-header">
                                                    <label className="h5">Danh sách sản phẩm</label>
                                                </div>
                                                <div className="card-body">
                                                    <ProductList products={shopItems} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="card mt-2">
                                                <div className="card-header product-list-header">
                                                    <label className="h5">
                                                        Danh sách đặt hàng
                                                    </label>
                                                    <button className="btn btn-warning" onClick={handleCopyToClipboard}>
                                                        <i className="fa fa-copy"></i> Sao chép
                                                    </button>
                                                    {
                                                        readyToOrder ?
                                                            <button className="btn btn-success" onClick={() => setIsModalVisible(true)}>
                                                                <i className="fa fa-paper-plane"></i> Đặt hàng
                                                            </button>
                                                            : <></>
                                                    }

                                                </div>
                                                <div className="card-body">
                                                    <Collapse>
                                                        {
                                                            Object.keys(customerCartState).map((value: any, index: number) => {
                                                                var customer = JSON.parse(value);
                                                                return <Panel header={CustomerSubmitData(customer)} key={index} extra={
                                                                    <div className="customer-action">
                                                                        {DeleteCustomer(customer)}
                                                                        {SubmitCustomer(customer, customerCartState[value])}
                                                                    </div>
                                                                }>
                                                                    <CartList cartItems={customerCartState[value]} shopItems={shopItems} customerId={customer.customerId} cartId={cartState.cartId}></CartList>
                                                                </Panel>
                                                            })
                                                        }
                                                    </Collapse>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </> : <></>
                        }
                    </DefaultLayout>
                </div>
            </BrowserView>
            <MobileView>
                <MobileLayout>
                    {
                        search.cartId ?
                            <>
                                <ShopInfo shopId={shopId} />
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="card mt-2">
                                            <div className="card-header product-list-header">
                                                <label className="h5">Danh sách sản phẩm</label>
                                            </div>
                                            <div className="card-body">
                                                <ProductList products={shopItems} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card mt-2">
                                            <div className="card-header product-list-header">
                                                <label className="h5">
                                                    Danh sách đặt hàng
                                                </label>
                                                <button className="btn btn-warning" onClick={handleCopyToClipboard}>
                                                    <i className="fa fa-copy"></i> Sao chép
                                                </button>
                                                {
                                                    readyToOrder ?
                                                        <button className="btn btn-success" onClick={() => setIsModalVisible(true)}>
                                                            <i className="fa fa-paper-plane"></i> Đặt hàng
                                                        </button>
                                                        : <></>
                                                }

                                            </div>
                                            <div className="card-body">
                                                <Collapse>
                                                    {
                                                        Object.keys(customerCartState).map((value: any, index: number) => {
                                                            var customer = JSON.parse(value);
                                                            return <Panel header={CustomerSubmitData(customer)} key={index} extra={
                                                                <div className="customer-action">
                                                                    {DeleteCustomer(customer)}
                                                                    {SubmitCustomer(customer, customerCartState[value])}
                                                                </div>
                                                            }>
                                                                <CartList cartItems={customerCartState[value]} shopItems={shopItems} customerId={customer.customerId} cartId={cartState.cartId}></CartList>
                                                            </Panel>
                                                        })
                                                    }
                                                </Collapse>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </> : <></>
                    }
                </MobileLayout>
            </MobileView>
        </React.Fragment>
    )
}

export default Cart;