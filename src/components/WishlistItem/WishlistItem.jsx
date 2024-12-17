import { useContext, useEffect } from "react"
import { WishlistContext } from "../../context/WishlistContext"
import Loading from "../Loading/Loading";
import { CartContext } from "../../context/cartContext";
import { Helmet } from "react-helmet";

export default function WishlistItem() {
    const { wishlistInfo,getWishlistProducts,removeProductFromWishlist } = useContext(WishlistContext);
    const {addProductToCart} = useContext(CartContext)


      useEffect(() => {
        getWishlistProducts()
      }, [wishlistInfo])
    return <>

    <Helmet>
        <title>Wishlist</title>
    </Helmet>
 {wishlistInfo ? (
    wishlistInfo.data.length > 0 ? (
        wishlistInfo.data.map((item) => (
            <div
                key={item._id}
                className="flex justify-between items-center border-2 border-gray-300 rounded-sm shadow-lg p-4"
            >
                <div className="product-content w-full flex space-x-2 ">
                    <div className="product-img ">
                        <img
                            className="w-32 h-32 object-cover"
                            src={item.imageCover}
                            alt={item.title}
                        />
                    </div>
                    <div className="product-content flex flex-col space-y-2 mt-3">
                        <h2 className="font-bold">{item.title}</h2>
                        <span className="text-primary-700 font-semibold">
                            {item.priceAfterDiscount || item.price} L.E
                        </span>
                        <button 
                        onClick={()=>{
                            removeProductFromWishlist({productId: item._id})
                        }}
                        className="btn bg-red-600 hover:bg-red-700 transition-colors duration-300 text-sm text-white">
                            <i className="fa-solid fa-trash">
                                <span className="ml-2 font-serif">Remove</span>
                            </i>
                        </button>
                    </div>
                </div>

                <button
                onClick={()=>{
                    addProductToCart({productId: item._id})
                }}
                className="btn font-semibold bg-primary-800 hover:bg-primary-900 transition-colors duration-300 text-white font-serif">
                    Add To Cart
                </button>
            </div>
        ))
    ) : (
        <div className="flex justify-center items-center h-64">
            <h3 className="text-lg font-bold text-gray-500">Your wishlist is empty!</h3>
        </div>
    )
) : (
    <Loading />
)}

    
    </>
}
