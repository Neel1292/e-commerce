import { NavLink } from "react-router-dom"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync, logoutUser } from "../../redux/userSlice";
import getUser from "../../utils/getUser";
import selectCartItemCount from "../../utils/selector";

export default function MainNavigation() {
  const dispatch = useDispatch();

  const [user, setUser] = useState({});
  
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Get the total item count from the cart
  const itemCount = useSelector(selectCartItemCount);
  
  const toggleAdminMenu = () => {
    setIsAdminOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setUser(getUser());
  }, [])

  return (
    <div className="bg-white">
      <div className="text-slate-700 relative flex max-w-screen-xl flex-col px-4 py-4 md:mx-auto md:flex-row md:items-center">
        <NavLink>
          <h3 className="flex text-cyan-500 cursor-pointer items-center whitespace-nowrap text-2xl font-black">
          <img src="/logo.png" alt="Website Logo" width={50} height={50}/>
            E-Commerce
          </h3>
        </NavLink>

        <div className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start">
          <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            <li className="font-bold md:mr-12">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-cyan-500" : "text-slate-700"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="font-bold md:mr-12">
              {user !== "undefiend" && user?.role == "admin" ? (
                <div>
                  <button
                    onClick={toggleAdminMenu}
                    className=" flex items-center text-slate-700"
                  >
                    Admin
                    {!isAdminOpen ? (
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 15l-7-7-7 7"
                        ></path>
                      </svg>
                    )}
                  </button>
                  {isAdminOpen && (
                    <ul className="absolute text-blue-500 top-[70%] mt-2 w-48 z-[999] bg-white border border-gray-200 shadow-lg">
                      <li className="px-4 py-2 hover:bg-gray-100">
                        <NavLink
                          to="/admin/products"
                          className={({ isActive }) =>
                            isActive ? "text-cyan-500" : "text-slate-700"
                          }
                          onClick={() => setIsAdminOpen((prev) => !prev)}
                        >
                          Products
                        </NavLink>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        <NavLink
                          to="/admin/users"
                          className={({ isActive }) =>
                            isActive ? "text-cyan-500" : "text-slate-700"
                          }
                          onClick={() => setIsAdminOpen((prev) => !prev)}
                        >
                          Users
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (

                <div className="relative">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive ? "text-cyan-500" : "text-slate-700"
                  }
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                </NavLink>
                {itemCount > 0 && (
                  <span className="absolute top-[-5px] right-[-10px] inline-flex items-center justify-center px-1 py-0.5 text-[10px] font-normal leading-none text-red-100 bg-red-600 rounded-full z-50">
                    {itemCount}
                  </span>
                )}
              </div>
              )}
            </li>
            
              <li className="font-bold md:mr-12">              
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? "text-cyan-500" : "text-slate-700"
                  }
                >
                  Profile
                </NavLink>
              </li>
            
            
            <li className="md:mr-12">
              <NavLink
                to={user  ? '/logout' : '/login'}
                className={({ isActive }) =>
                  isActive ? "bg-cyan-500 text-white" : "text-cyan-600"
                }
              >
                <button
                  onClick={() => user  ? dispatch(logoutUser()) : dispatch(loginUserAsync())  }
                  className="rounded-full border-2 border-cyan-500 px-6 py-1 transition-colors hover:bg-cyan-500 hover:text-white"
                >
                  {user ? 'Logout' : 'Login'}
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}