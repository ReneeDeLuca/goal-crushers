import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/mainApiSlice';
import { logout } from '../slices/authSlice';


export default function HamburgerMenu() {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);

    const handleHamburgerClick = () => {
        if (hamburgerOpen) {
            document.getElementById('menu-btn').classList.remove('open');
            document.getElementById('menu').classList.remove('flex');
            document.getElementById('menu').classList.add('hidden');
        } else {
            document.getElementById('menu-btn').classList.add('open');
            document.getElementById('menu').classList.remove('hidden');
            document.getElementById('menu').classList.add('flex');
        }
        setHamburgerOpen(!hamburgerOpen);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <span className="ml-3">
                {/* Hamburger Icon */}
                <button id="menu-btn" className="block hamburger items-center rounded-md bg-indigo-600 px-6 py-4 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleHamburgerClick}
                >
                    <span className="hamburger-top"></span>
                    <span className="hamburger-middle"></span>
                    <span className="hamburger-bottom"></span>
                </button>
            </span>
            {/* Hamburger Menu */}
            <div>
                <ul id="menu" className="absolute flex-col items-end hidden self-end py-8 mt-10 space-y-2 font-bold sm:self-center right-6 px-8 drop-shadow-md origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <li>
                        {(!userInfo) ? (
                            <a href="/login" className="text-gray-700 hover:text-darkGrayishBlue">Login</a>
                        ) : (
                            <>
                                <li>
                                    <span className="text-gray-700 hover:text-darkGrayishBlue">You are signed in as:</span>
                                </li>
                                <li>
                                    <span className="text-gray-900 hover:text-darkGrayishBlue">{userInfo.email}</span>
                                </li>

                                <li className="divide-y divide-slate-400">
                                    <div className="py-1"></div>
                                    <div className="py-1"></div>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 hover:text-darkGrayishBlue">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-700 hover:text-darkGrayishBlue">Feed</a>
                                </li>
                                <li>
                                    <a href="/profile" className="text-gray-700 hover:text-darkGrayishBlue">Profile</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-700 hover:text-darkGrayishBlue">Settings</a>
                                </li>
                                <li className="divide-y divide-slate-400">
                                    <div className="py-1"></div>
                                    <div className="py-1"></div>
                                </li>
                                <li>
                                    <span className="text-gray-700 hover:text-darkGrayishBlue cursor-pointer" onClick={logoutHandler}>Logout</span>
                                </li>
                            </>
                        )}
                    </li>
                </ul>
            </div>
        </>
    )
}