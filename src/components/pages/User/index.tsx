import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import Customer from '../Customer';
import { BrowserView, MobileView } from 'react-device-detect';
import DefaultLayout from 'components/templates/DefaultLayout';
import MobileLayout from 'components/templates/MobileLayout';
import ShopInfo from 'components/molecules/ShopInfo';

const User = () => {
    const customerState = useSelector((state: RootState) => state.customerReducer);
    const shopState = useSelector((state: RootState) => state.shopReducer);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (!(customerState.customer && customerState.customer.customerId) &&
            !(shopState.currentShop && shopState.currentShop.shopId)
        ) {
            history.push('/login', { redirect: location.pathname });
        }
    });

    const getUserLayout = () => {
        return <React.Fragment>
            {
                (customerState.customer && customerState.customer.customerId) ?
                    <Customer /> : ''
            }
            {
                (shopState.currentShop && shopState.currentShop.shopId) ?
                    <ShopInfo shopId={shopState.currentShop.shopId} isShowLogOutButton="true" /> : ''
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