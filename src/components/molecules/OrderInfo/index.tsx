import { Table, Tag, Space, Select } from 'antd';
import { RootState } from 'app/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus, cancelOrder, getOrderById } from 'redux/reducers/Order/orderSlice';
import Moment from 'moment';

const { Option } = Select;
const OrderInfo = (props: any) => {
    const { orderId, order } = props;
    const OrderStatus = [ "Confirmed", "Sent To Kitchen", "Ready for Pickup", "Delivered"];
    const currentCustomer = useSelector((state: RootState) => state.customerReducer);
    const currentShop = useSelector((state: RootState) => state.shopReducer);

    const dispatch = useDispatch();

    const handleChangeStatus = (e: any) => {
        dispatch(updateStatus({
            orderId: orderId,
            orderStatus: e.target.value,
            customerId: order.customerId,
            shopId: order.shopId
        }))
    }

    useEffect(() => {

    }, [order])

    const renderItem = (item: any) => {
        if (!(currentShop.currentShop?.shopId == order.shopId))
            return order.status;
        if (order.status && ["Cancelled", "Delivered"].indexOf(order.status) != -1)
            return order.status;

        return (
            <select className="form-control" onChange={handleChangeStatus}>
                {
                     OrderStatus.map((item, index) => order.status == item ? 
                     <option value={item} key={index} selected>{item}</option> :
                     <option value={item} key={index}>{item}</option>
                     )
                }
            </select>
        );
    }

    const renderAction = (item: any) => {
        if (!(currentCustomer.customer?.customerId == order.customerId || currentShop.currentShop?.shopId == order.shopId))
            return '';
        if (order.status && ["Cancelled", "Delivered"].indexOf(order.status) != -1)
            return '';
        return <button className="btn btn-danger" onClick={handleCancelOrder}>Hủy đơn hàng</button>
    }

    const handleCancelOrder = () => {
        dispatch(cancelOrder({
            orderId: orderId,
            customerId: order.customerId
        }));
        dispatch(getOrderById(orderId));
    }

    const dataSource = [
        {
            key: 'customerName',
            name: 'Người đặt hàng',
            value: order.customerName,
        },
        {
            key: 'customerPhoneNumber',
            name: 'Số điện thoại đặt hàng',
            value: order.customerPhoneNumber,
        },
        {
            key: 'orderTime',
            name: 'Ngày đặt hàng',
            value: Moment(order.orderTime).format('DD/MM/yyyy HH:mm:ss'),
        },
        {
            key: 'deliveryTime',
            name: 'Ngày giao hàng',
            value: order.deliveryTime? Moment(order.deliveryTime).format('DD/MM/yyyy HH:mm:ss') : '',
        },
        {
            key: 'deliveryInformation',
            name: 'Thông tin đặt hàng',
            value: order.deliveryInformation,
        },
        {
            key: 'status',
            name: 'Trạng thái đơn hàng',
            value: order.status,
        },
        {
            key: 'action',
            name: '',
            value: order.status,
        }
    ];

    const columns = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => {
                return <b>{text}</b>
            }
        },
        {
            title: '',
            dataIndex: 'value',
            key: 'value',
            render: (text: any, item: any) => {
                if (item.key === 'status') {
                    return renderItem(item);
                }
                if (item.key === 'action') {
                    return renderAction(renderAction);
                }
                return text;
            }
        }
    ];



    return (
        <div className="card">
            <div className="card-body">
                <Table dataSource={dataSource} columns={columns} pagination={false}/>
            </div>
        </div>
    );
}

export default OrderInfo;