import { Link, NavLink } from "react-router-dom"
import siteLogo from "../../assets/images/freshcart-logo.svg"
import { useContext, useEffect } from "react"
import { UserContext } from "../../context/User.context"
import { CartContext } from "../../context/cartContext";
export default function Navbar() {

  const { token, logOut } = useContext(UserContext);
  const { cartInfo, getCartProducts } = useContext(CartContext);

  useEffect(()=>{

    getCartProducts()
  },[])

  return <>
    <nav className="bg-slate-100 py-3 shadow-sm fixed left-0 top-0 right-0 z-50 ">
      <div className="container flex items-center gap-12   ">
        <a className="flex" href="">

          <img src={siteLogo} alt="Freshcart logo" />
        </a>

        {token && <>

          <ul className="flex items-center gap-3">
            <li><NavLink className={({ isActive }) => {
              return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-all duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
            }} to="/">Home</NavLink></li>
            <li><NavLink className={({ isActive }) => {
              return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-all duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
            }} to="/brands">Brands</NavLink></li>
            <li><NavLink className={({ isActive }) => {
              return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-all duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
            }} to="/categories">Categories</NavLink></li>
            <li><NavLink className={({ isActive }) => {
              return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-all duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
            }} to="/wishlist">Wishlist</NavLink></li>
            <li><NavLink className={({ isActive }) => {
              return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-all duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
            }} to="/allorders">Orders</NavLink></li>
          </ul>

          <Link to="/cart" className="cart ml-auto cursor-pointer text-lg relative">
            <i className="fa-solid fa-cart-shopping"></i>
            <div className="cart-counter w-5 flex justify-center items-center h-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-800 text-white absolute top-0 right-0 text-sm">
              {cartInfo == null ? (<i className="fa-solid fa-spinner fa-spin text-sm "></i>) :
              (
                <span className="text-sm font-semibold">
                  {cartInfo.numOfCartItems}
                </span>
              )
              }
            </div>
          </Link>
        </>}

        <ul className={`flex items-center gap-3 ${!token && "ms-auto"}`}>
          <li><a href="https://instagram.com" target="_blank">
            <i className="fa-brands fa-instagram"></i>
          </a>
          </li>
          <li><a href="https://facebook.com" target="_blank">
            <i className="fa-brands fa-facebook"></i>
          </a>
          </li>
          <li><a href="https://tiktok.com" target="_blank">
            <i className="fa-brands fa-tiktok"></i>
          </a>
          </li>
          <li><a href="https://twitter.com" target="_blank">
            <i className="fa-brands fa-twitter"></i>
          </a>
          </li>
          <li><a href="https://linkedin.com" target="_blank">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          </li>
          <li><a href="https://youtube.com" target="_blank">
            <i className="fa-brands fa-youtube"></i>
          </a>
          </li>
        </ul>


        <ul className="flex items-center gap-2 ">
          {!token && <>
            <li className="text-[0.875rem]"><NavLink className={({ isActive }) => {
              return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-all duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
            }} to="/signup">Sign Up</NavLink></li>
            <li className="ps-1 text-[0.885rem]"><NavLink className={({ isActive }) => {
              return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-all duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
            }} to="login">Login</NavLink></li>

          </>}
          {token && <>
            <li onClick={logOut}><NavLink
              href="/logout">
              <i className="fa-solid fa-right-from-bracket text-lg"></i>
            </NavLink>
            </li>
          </>}

        </ul>
      </div>
    </nav>

  </>


}



