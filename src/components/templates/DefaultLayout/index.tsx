import React, { useEffect, useState } from 'react';
import { Drawer, Menu, Modal } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import './index.scss';
import { SignInForm } from 'components/molecules';
import { useHistory, useLocation } from 'react-router';
const { SubMenu } = Menu;
const DefaultLayout = (props: any) => {

    const { children } = props;
    const [current, setCurrent] = useState("/");
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        setCurrent(location.pathname as string);
    });

    const handleClick = (e: any) => {
        history.push(e.key as string);
    }

    return (
        <React.Fragment>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="/" icon={<i className="fa fa-home"> </i>}>
                    Trang chủ
                </Menu.Item>
                <Menu.Item key="/cart" icon={<i className="fa fa-shopping-cart"> </i>}>
                    Giỏ hàng
                </Menu.Item>
                <Menu.Item key="/user" icon={<i className="fa fa-user"> </i>}>
                    Cá nhân
                </Menu.Item>
            </Menu>
            <div className="content">{children}</div>
        </React.Fragment>
    );
}

export default DefaultLayout;
