import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { customerLogOut } from 'redux/reducers/Customer/customerSlice';

const Customer = (props: any) => {
    const { isShowLogOutButton } = props;
    const customerState = useSelector((state: RootState) => state.customerReducer);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!(customerState.customer && customerState.customer.customerId)) {
            history.push('/login');
        }
    }, [customerState]);

    const handleClickLogOut = () => {
        dispatch(customerLogOut());
        history.push('/');
    }

    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        <img className="shop-avatar" src={customerState.customer.avatar ? `data:image/png;base64, ${customerState.customer.avatar}` : '/images/no-image.jpg'}/>
                        <span className="shop-name">{customerState.customer.name}</span>
                        { isShowLogOutButton && <button className="btn btn-primary " style={{float: 'right'}} onClick={handleClickLogOut}>Đăng xuất</button> }
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