import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './index.scss';

const ButtonMenu = (props: any) => {
    const { icon, children, path } = props;
    const location = useLocation();

    return (
        <Link to={path} onClick={props.onClick} className={`button-menu ${location.pathname === path ? 'active' : ''}`}>
            <i className={`fa ${icon}`}></i>
            <span>{children}</span>
            <hr style={{ height: "5px", color: "blue" }} />
        </Link>
    )
}

export default ButtonMenu