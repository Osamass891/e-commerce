import { useContext, useEffect } from "react"
import { CartContext } from "../../context/cartContext"
import Loading from "../../components/Loading/Loading"
import CartItem from "../../components/CartItem/CartItem"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function Cart() {
  const { getCartProducts, cartInfo, clearUserCart } = useContext(CartContext)


  useEffect(() => {
    getCartProducts()
  }, [])


  return <>
    <Helmet>
      <title>Cart</title>
    </Helmet>
    {cartInfo == null ? <Loading /> : <section>
      <div className="flex items-center gap-8 pb-3 mt-10">
        <i className="fa-brands fa-opencart text-3xl"></i>
        <h2 className="text-lg text-slate-700 pl-5 font-semibold relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-700 before:-left-1 before:top-1/2 before:-translate-y-1/2">Your Shopping cart</h2>
      </div>
      {cartInfo.numOfCartItems == 0 ? <div className="flex flex-col items-center justify-center gap-3 p-8 mt-6 bg-gray-100 rounded-md shadow-lg">
        <h2>Oops! Your Cart Is Empty Start Shopping Now By Clicking The Button Below!</h2>
        <Link to="/" className="btn bg-primary-700 text-white hover:bg-primary-800 text-sm ">Back To Home </Link>
      </div> :
        <>
          <div className="space-y-5">
            {cartInfo.data.products.map((product) => <CartItem key={product._id} productInfo={product} />)}

          </div >
          <div className="flex justify-between items-center mt-4">
            <p> <i class="fa-solid fa-sack-dollar me-3 text-primary-800"></i>Your Total Cart Price {cartInfo.data.totalCartPrice}</p>
            <button
              onClick={() => {
                clearUserCart()
              }}
              className="btn bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 text-sm"> Clear Cart</button>
          </div>

          <Link to={"/checkout"}>
            <button type="submit" className="btn my-6 bg-primary-700 hover:bg-primary-800 transition-colors duration-300 text-white w-full ">Next Step (PAYMENT)</button>
          </Link>
        </>
      }
    </section>}

  </>

}
