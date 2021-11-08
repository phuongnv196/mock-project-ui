import { Table, Tag, Space } from 'antd';
import { RootState } from 'app/store';
import { Item } from 'models/item.model';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cartApi from 'api/cartApi';
import './index.scss';

const OrderList = (props: any) => {
  const orderState = useSelector((state: RootState) => state.orderReducer);
  const [enableDeleted, setEnableDeleted] = useState(false);

  const getImageUrl = (item: any) => {
    return item.image ? `data:image/png;base64, ${item.image}` : '/images/no-image.jpg'
  }

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'itemName',
      key: 'itemName',
      render: (text: any, record: any) => (
        <>
          {
            <div className="product-container">
              <img className="product-image" src={getImageUrl(record)}></img>
              <span className="product-name">{text}</span>
            </div>
          }
        </>
      )
    },
    {
        title: 'Người đặt',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Đơn giá',
      render: (text: any, record: any) => (
        <>
          {
            (record.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          }
        </>
      )
    },
    {
      'title': 'Thành tiền',
      render: (text: any, record: any) => (
        <>
          {
            (record.price * record.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          }
        </>
      )
    }
  ];

  return (
    <Table columns={columns} dataSource={orderState.order.itemsInCart}/>
  );
}

export default OrderList;