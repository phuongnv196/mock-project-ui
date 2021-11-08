import orderApi from 'api/orderApi';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import DefaultLayout from "components/templates/DefaultLayout";
import MobileLayout from "components/templates/MobileLayout";
import { BrowserView, MobileView } from 'react-device-detect';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { getOrderById } from 'redux/reducers/Order/orderSlice';
import ShopInfo from 'components/molecules/ShopInfo';
import OrderInfo from 'components/molecules/OrderInfo';
import OrderList from 'components/organisms/OrderList';
import { getHubConnection } from 'app/hubConnection';
import { message } from 'antd';

const Order = () => {
    const location = useLocation();
    const search = queryString.parse(location.search);
    const orderId = search.orderId as string;
    const [order, setOrder] = useState({} as any);
    const orderState = useSelector((state: RootState) => state.orderReducer);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getOrderById(orderId));
        startCons();
    }, []);

    const startCons = async () => {
        const connection = await getHubConnection(`order?order=${orderId}`);
        connection.on('ChangeOrderStatus', (data) => {
            message.success(`Trạng thái đơn hàng đã thay đổi: ${data.newStatus}`);
            dispatch(getOrderById(orderId));
        });

        connection.on('CancelOrder', (data) => {
            message.success(`Đơn hàng đã bị hủy`);
            dispatch(getOrderById(orderId));
        });
    }
    
    return (
        <>
            <BrowserView>
                <div className="container">
                    <DefaultLayout>
                        <div className="row">
                            <ShopInfo shopId={orderState.order.shopId} />
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6 col-12">
                                <OrderInfo order={orderState.order} orderId={orderId}></OrderInfo>
                            </div>
                            <div className="col-md-6 col-12">
                                <OrderList/>
                            </div>
                        </div>
                    
                    </DefaultLayout>
                </div>
            </BrowserView>
            <MobileView>
                <MobileLayout>
                    <div className="row">
                                <ShopInfo shopId={orderState.order.shopId} />
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6 col-12">
                                    <OrderInfo order={orderState.order} orderId={orderId}></OrderInfo>
                                </div>
                                <div className="col-md-6 col-12">
                                    <OrderList/>
                                </div>
                            </div>
                    </MobileLayout>
            </MobileView>
        </>
    )
}

export default Order