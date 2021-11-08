import { Table, Tag, Space } from 'antd';
import { RootState } from 'app/store';
import { Item } from 'models/item.model';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cartApi from 'api/cartApi';
import './index.scss';

const CartList = (props: any) => {
  const { cartItems, shopItems, customerId, cartId } = props;
  const user = useSelector((state: RootState) => state.customerReducer);
  const [enableDeleted, setEnableDeleted] = useState(false);

  const getImageUrl = (itemId: string) => {
    var productItem = shopItems.find((item: Item, index: any) => item.itemId === itemId) || new Item();
    return productItem.image ? `data:image/png;base64, ${productItem.image}` : '/images/no-image.jpg'
  }

  useEffect(() => {
    setEnableDeleted(user.customer?.customerId == customerId);
  }, []);

  const handleDeletedCartItem = (e: any) => {
    var itemId = e.currentTarget.getAttribute("data-cart-item-id");
    cartApi.remove(itemId, customerId, cartId);
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
              <img className="product-image" src={getImageUrl(record.itemId)}></img>
              <span className="product-name">{text}</span>
            </div>
          }
        </>
      )
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
    ,
    {
      title: '',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle" className="text-danger cart-action">
          {
            enableDeleted && record.readyToOrder === false?
            <i className="fa fa-trash" title="Xóa" data-cart-item-id={record.itemId} onClick={handleDeletedCartItem}></i>
            : <></>
          }
        </Space>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={cartItems} />
  );
}

export default CartList;