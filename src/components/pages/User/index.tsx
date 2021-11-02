import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import Customer from '../Customer';
import { BrowserView, MobileView } from 'react-device-detect';
import DefaultLayout from 'components/templates/DefaultLayout';
import MobileLayout from 'components/templates/MobileLayout';

const User = () => {
    const customerState = useSelector((state: RootState) => state.customerReducer);
    const shopState = useSelector((state: RootState) => state.shopReducer);
    const history = useHistory();

    useEffect(() => {
        if(!(customerState.customer && customerState.customer.customerId) &&
            !(shopState.shop && shopState.shop.shopId)
        ) {
            history.push('/login');
        }
    });

    const getUserLayout = () => {
        return <React.Fragment>
            {
                (customerState.customer && customerState.customer.customerId) ?
                <Customer/> : ''
            }
            {
                (shopState.shop && shopState.shop.shopId) ?
                <div></div> : ''
            }
        </React.Fragment>
    }

    return (
        <React.Fragment>
            <BrowserView>
                <div className="container">
                    <DefaultLayout>
                    {
                        getUserLayout()
                    }
                    </DefaultLayout>
                </div> 
            </BrowserView>
            <MobileView>
                <MobileLayout>
                {
                    getUserLayout()
                }
                </MobileLayout>
            </MobileView>
        </React.Fragment>
    );
}

export default User;