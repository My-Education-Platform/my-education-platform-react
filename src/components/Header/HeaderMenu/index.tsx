import React, {FC, useContext} from 'react';
import {Link, Popover} from "@geist-ui/react";
import {AuthContext} from "../../../index";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {signOut} from "../../../redux/slices/userSlice/userSlice";
import {routes} from "../../../routes";

interface HeaderMenuProps {
    isAuthor: boolean;
}

const HeaderMenu: FC<HeaderMenuProps> = ({isAuthor}) => {
    const {auth} = useContext(AuthContext);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSignOut = () => {
        auth.signOut().then(() => {
            dispatch(signOut())
        })
    }

    return (
        <>
            {/*<Popover.Item>*/}
            {/*    <span>Дашборд</span>*/}
            {/*</Popover.Item>*/}
            {/*<Popover.Item line />*/}
            <Popover.Item onClick={() => navigate('/account')}>
                <span>Настройки</span>
            </Popover.Item>
            {/*<Popover.Item line />*/}
            {/*<Popover.Item>*/}
            {/*    <Link href="https://t.me/alex_samurai" target="_blank">Написать команде</Link>*/}
            {/*</Popover.Item>*/}
            <Popover.Item line />
            <Popover.Item onClick={handleSignOut}>
                <span>Выйти</span>
            </Popover.Item>
        </>
    );
};

export default HeaderMenu;