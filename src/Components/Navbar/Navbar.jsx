
import { NavLink, useNavigate } from 'react-router-dom';
import plantCareLogo from '../../assets/gradMaterial/logo.png';
import { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';

export default function Navbar() {
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function LogOut() {
    localStorage.removeItem('userToken');
    setUserLogin(null);
    navigate('/login');
  }

  return (
    <>
      <div className="navdiv flex items-center justify-center shadow-2xl px-2 sm:px-6 lg:px-28 pb-4">
        <nav className="navIn shadow-2xl bg-gray-100 rounded-full flex items-center justify-between ps-4 lg:w-auto relative">
          {/* Logo */}
          <div className="flex items-center">
            <img className="h-12 lg:h-16 w-auto" src={plantCareLogo} alt="plantCareLogo"/>
          </div>

          {/* Toggle Button */}
          <button
            className="block lg:hidden text-green-900 text-2xl ml-auto pe-6"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>

          {/* Navbar Links */}
          <ul
            className={`absolute lg:static top-0 left-0 w-full lg:w-auto bg-gray-50 lg:bg-transparent lg:flex lg:space-x-3 lg:mx-32 rounded-xl lg:rounded-none p-6 lg:p-0 z-10 transition-all ${
              isMenuOpen ? 'block' : 'hidden'
            }`}
          >
            {userLogin !== null ? (
              <>
                {/* Links */}
                <li className="text-center my-2">
                  <NavLink to="home" onClick={() => setIsMenuOpen(false)}>
                    Home
                  </NavLink>
                </li>
                <li className="text-center my-2">
                  <NavLink to="library" onClick={() => setIsMenuOpen(false)}>
                    Library
                  </NavLink>
                </li>
                <li className="text-center my-2">
                  <NavLink to="eviroAnalysis" onClick={() => setIsMenuOpen(false)}>
                    EviroAnalysis
                  </NavLink>
                </li>
                <li className="text-center my-2">
                  <NavLink to="floraCheck" onClick={() => setIsMenuOpen(false)}>
                    FloraCheck
                  </NavLink>
                </li>
                <li className="text-center my-2">
                  <NavLink to="chatbot" onClick={() => setIsMenuOpen(false)}>
                    Chatbot
                  </NavLink>
                </li>
                <li className="text-center my-2">
                  <NavLink to="aboutUs" onClick={() => setIsMenuOpen(false)}>
                    AboutUs
                  </NavLink>
                </li>
                <li className="text-center my-2">
                  <NavLink to="contactUs" onClick={() => setIsMenuOpen(false)}>
                    ContactUs
                  </NavLink>
                </li>

                {/* Logout Icon */}
                <li
                  className="text-center my-2 lg:hidden cursor-pointer text-red-900 text-lg "
                  onClick={LogOut}
                >
                  <i className="fa-solid fa-right-from-bracket "></i>
                </li>
              </>
            ) : (
              <>
                {/* Auth Buttons for Small Screens */}
                <li className="text-center my-2">
                  <NavLink to="login" onClick={() => setIsMenuOpen(false)}>
                    <button className="border border-green-900 text-green-900 px-4 py-2 rounded-full hover:bg-green-50 text-sm lg:text-base">
                      SignIn
                    </button>
                  </NavLink>
                </li>
                <li className="text-center my-2 ">
                  <NavLink to="register" onClick={() => setIsMenuOpen(false)}>
                    <button className="bg-green-900 text-white px-5 py-2 rounded-full hover:bg-green-700 text-sm lg:text-base">
                      SignUp
                    </button>
                  </NavLink>
                </li>
              </>
            )}

            {/* Close Button for Mobile */}
            <li className="absolute top-3 right-3 lg:hidden cursor-pointer" onClick={() => setIsMenuOpen(false)}>
              <i className="fa-solid fa-times text-2xl"></i>
            </li>
          </ul>

          {/* Logout Icon for Large Screens */}
          {userLogin !== null && (
            <div className="hidden lg:block cursor-pointer text-red-900 text-lg pe-6" onClick={LogOut}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}