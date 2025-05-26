import { NavLink, Outlet } from 'react-router-dom';

export default function GatewayLayout() {
    return (
        <>
            <div className="subtabs">
                <NavLink
                    to="marketplaces"
                    className={({ isActive }) => isActive ? 'subtab active' : 'subtab'}
                >
                    Маркетплейсы
                </NavLink>
                <NavLink
                    to="rules"
                    className={({ isActive }) => isActive ? 'subtab active' : 'subtab'}
                >
                    Правила
                </NavLink>
            </div>
            <Outlet />
        </>
    );
}