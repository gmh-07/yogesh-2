import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
  <div className="h-full container mx-auto flex items-center px-4 justify-between">
    {/* Logo */}
    <div className="text-xl font-semibold tracking-wide text-gray-800">
      <Link to="/">Shop</Link>
    </div>

    {/* Search Bar */}
    <div className="hidden lg:flex items-center w-full max-w-sm border border-gray-300 rounded-full focus-within:shadow-md pl-2">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full outline-none bg-transparent px-2 py-1 text-gray-700"
        onChange={handleSearch}
        value={search}
      />
      <div className="text-lg min-w-[50px] h-8 bg-gray-200 flex items-center justify-center rounded-r-full text-gray-600 cursor-pointer hover:bg-gray-300">
        <GrSearch />
      </div>
    </div>

    {/* Right Section */}
    <div className="flex items-center gap-7">
      
      {/* AI Customizer */}
      <Link
  to="/ai-customizer"
  className="relative px-5 py-2 text-sm font-medium text-white bg-gray-600 rounded-full 
             border border-gray-700 shadow-lg transition-all duration-300 
             hover:bg-gray-800 hover:shadow-[0_0_15px_#4f46e5] 
             before:absolute before:-inset-1 before:bg-gradient-to-r 
             before:from-purple-500 before:via-blue-500 before:to-indigo-500 
             before:blur-md before:opacity-20 before:rounded-full"
>
  AI Customizer
</Link>


      {/* User Profile */}
      <div className="relative flex justify-center">
        {user?._id && (
          <div
            className="text-3xl cursor-pointer flex justify-center text-gray-700 hover:text-black"
            onClick={() => setMenuDisplay((prev) => !prev)}
          >
            {user?.profilePic ? (
              <img src={user.profilePic} className="w-10 h-10 rounded-full" alt={user?.name} />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
        )}

        {/* Dropdown Menu */}
        {menuDisplay && (
          <div className="absolute bg-white top-11 h-fit p-2 shadow-lg rounded-md border border-gray-200">
            <nav className="text-gray-700">
              {user?.role === ROLE.ADMIN && (
                <Link
                  to="/admin-panel/all-products"
                  className="whitespace-nowrap block hover:bg-gray-100 p-2 rounded-md"
                  onClick={() => setMenuDisplay((prev) => !prev)}
                >
                  Admin Panel
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Cart */}
      {user?._id && (
        <Link to="/cart" className="text-2xl relative text-gray-700 hover:text-black">
          <FaShoppingCart />
          <div className="bg-gray-900 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3 text-xs">
            {context?.cartProductCount}
          </div>
        </Link>
      )}

      {/* Auth Buttons */}
      <div>
        {user?._id ? (
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-3 py-1.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  </div>
</header>

  )
}

export default Header