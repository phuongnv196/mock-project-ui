import { Table, Tag, Space } from 'antd';
import { RootState } from 'app/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import orderApi from 'api/orderApi';
import Moment from 'moment';
import { Link } from 'react-router-dom';

const CustomerOrderList = (props: any) => {
    const customerState = useSelector((state: RootState) => state.customerReducer);
    const [orderListData, setOrderListData] = useState({} as any);

    const getImageUrl = (item: any) => {
        return item.image ? `data:image/png;base64, ${item.image}` : '/images/no-image.jpg'
    }
    useEffect(() => {
        orderApi.getAllOrderCustomer(customerState.customer?.customerId as string).then((data) => {
            setOrderListData(data)
        });
    }, [])

    const columns = [
        {
            title: 'Tên cửa hàng',
            dataIndex: 'shopName',
            key: 'shopName'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Thời gian đặt hàng',
            dataIndex: 'orderTime',
            key: 'orderTime',
            render: (text: any, record: any) => {
                return record.orderTime ? Moment(record.orderTime).format('DD/MM/yyyy HH:mm:ss') : ''
            }
        },
        {
            title: 'Thời gian giao hàng',
            dataIndex: 'deliveryTime',
            key: 'deliveryTime',
            render: (text: any, record: any) => {
                return record.deliveryTime ? Moment(record.deliveryTime).format('DD/MM/yyyy HH:mm:ss') : ''
            }
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text: any, record: any) => {
                return (record.totalPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
            }
        },
        {
            title: 'Thông tin giao hàng',
            dataIndex: 'deliveryInformation',
            key: 'deliveryInformation'
        },
        {
            title: '',
            render: (text: any, record: any) => {
                return <Link to={`/order?orderId=${record.orderId}`}><i style={{cursor: 'pointer'}} className="fa fa-eye text-success" title="Xem chi tiết">{}</i></Link>
            },
        }
    ];

    return (
        <Table columns={columns} dataSource={orderListData.orders}/>
    );
}

export default CustomerOrderList;