import { Layout } from 'antd';
import ButtonMenu from 'components/atoms/ButtonMenu';
import { useState } from 'react';
import { useLocation } from 'react-router-dom'

import './index.scss';


const MobileLayout = (props: any) => {
    const { children } = props;
    const { Header, Footer, Sider, Content } = Layout;
    
    const [activeMenuButton, setActiveMenuButton] = useState('home');
    
    return (
        <div className="mobile-layout">
            <div className="head-menu">
                <div className="header-menu-title">
                    <i className="fa fa-shopping-bag"></i>Online Shop
                </div>
            </div>
            <div className="body-content">
                {children}
            </div>
            <div className="foot-menu">
                <ButtonMenu icon="fa-home" path="/">Trang chủ</ButtonMenu>
                <ButtonMenu icon="fa-shopping-cart" path="/cart">Giỏ hàng</ButtonMenu>
                <ButtonMenu icon="fa-user" path="/user">Người dùng</ButtonMenu>
            </div>
        </div>
    )
}
export default MobileLayout;