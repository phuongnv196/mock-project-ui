import React, {useState} from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const DefaultLayout = (props: any) => {

    const { children } = props;
    const [ current, setCurrent ] = useState("mail");

    const handleClick = () => {

    }

    return (
        <React.Fragment>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="mail" icon={<MailOutlined />}>
                    Navigation One
                </Menu.Item>
                <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
                    Navigation Two
                </Menu.Item>
                <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
                    <Menu.ItemGroup title="Item 2">
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
            </Menu>
            <div>{children}</div>
        </React.Fragment>
    );
}

export default DefaultLayout;
