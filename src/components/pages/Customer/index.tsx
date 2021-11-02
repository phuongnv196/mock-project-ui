import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const Customer = () => {
    const customerState = useSelector((state: RootState) => state.customerReducer);
    const history = useHistory();

    useEffect(() => {
        if(!(customerState.customer && customerState.customer.customerId)) {
            history.push('/login');
        }
    }, [customerState]);

    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        <img className="shop-avatar" src={customerState.customer.avatar ? `data:image/png;base64, ${customerState.customer.avatar}` : '/images/no-image.jpg'}/>
                        <span className="shop-name">{customerState.customer.name}</span>
                    </h5>
                    <p className="card-text">
                        <label>Số điện thoại: </label> {customerState.customer.phoneNumber}
                    </p>
                </div>
            </div>
            <div className="card mt-2">
                <div className="card-header">
                    Danh sách đặt hàng
                </div>
                <div className="card-body">
                    Không có danh sách đặt hàng
                    {/* <ProductList products={shops.shop.items || []}></ProductList> */}
                </div>
            </div>
        </React.Fragment>
       
    )
}

export default Customer;