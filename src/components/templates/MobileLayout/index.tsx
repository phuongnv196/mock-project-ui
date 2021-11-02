import { Layout } from 'antd';
import ButtonMenu from 'components/atoms/ButtonMenu';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'

import './index.scss';


const MobileLayout = (props: any) => {
    const { children, isHideFooter } = props;
    const { Header, Footer, Sider, Content } = Layout;
    
    const [activeMenuButton, setActiveMenuButton] = useState('home');
    
    return (
        <div className="mobile-layout">
            <div className="head-menu">
                <div className="header-menu-title">
                    <i className="fa fa-shopping-bag"></i>
                    <Link to='/'>Online Shop</Link>
                </div>
            </div>
            <div className={`body-content ${!isHideFooter ? 'has-footer' : ''}`}>
                {children}
            </div>
            {
                !isHideFooter ? 
                <div className="foot-menu">
                    <ButtonMenu icon="fa-home" path="/">Trang chủ</ButtonMenu>
                    <ButtonMenu icon="fa-shopping-cart" path="/cart">Giỏ hàng</ButtonMenu>
                    <ButtonMenu icon="fa-user" path="/user">Người dùng</ButtonMenu>
                </div>
                : ''
            }
        </div>
    )
}
export default MobileLayout;