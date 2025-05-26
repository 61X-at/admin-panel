import { NavLink, Outlet } from 'react-router-dom';
import DemoErrorButton from '../DemoErrorButton/DemoErrorButton';

export default function Layout() {
    return (
        <div className="container">
            <h1>Admin panel</h1>
            <div className="tabs">
                <NavLink
                    to="/gateway"
                    className={({ isActive }) => isActive ? 'tab active' : 'tab'}
                >
                    Gateway
                </NavLink>
                <NavLink
                    to="/scraper"
                    className={({ isActive }) => isActive ? 'tab active' : 'tab'}
                >
                    Scraper
                </NavLink>
                <NavLink
                    to="/bot"
                    className={({ isActive }) => isActive ? 'tab active' : 'tab'}
                >
                    Bot
                </NavLink>
            </div>

            <Outlet />
        </div>
    );
}