import { useContext, useState } from "react";
import { CartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../context/WishlistContext";

export default function ProductCard({ productInfo }) {
  const { images, title, price, category, ratingsAverage, id } = productInfo;

  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist } = useContext(WishlistContext);

  const [isLiked, setIsLiked] = useState(false);

  const toggleWishlist = () => {
    addProductToWishlist({ productId: id });
    setIsLiked(!isLiked); 
  };

  return (
    <>
      <div className="col-span-12 sm:col-span-2 md:col-span-6 lg:col-span-2 rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img className="w-full" src={images[0]} alt={title} />
          <div className="layer opacity-0 hover:opacity-100 transition-all duration-300 absolute w-full h-full left-0 top-0 bg-black bg-opacity-15 flex justify-center items-center gap-2">
            
            <div
              onClick={toggleWishlist}
              className={`icon cursor-pointer hover:scale-110 transition-transform duration-300 w-8 h-8 rounded-full ${
                isLiked ? "bg-red-600" : "bg-primary-800"
              } text-white flex justify-center items-center text-sm`}
            >
              <i className={`fa-solid fa-heart ${isLiked ? "text-red-300" : ""}`}></i>
            </div>
            
            <div
              onClick={() => {
                addProductToCart({ productId: id });
              }}
              className="icon cursor-pointer hover:scale-110 transition-transform duration-300 w-8 h-8 rounded-full bg-primary-800 text-white flex justify-center items-center"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            
            <Link
              to={`/product/${id}`}
              className="icon cursor-pointer hover:scale-110 transition-transform duration-300 w-8 h-8 rounded-full bg-primary-800 text-white flex justify-center items-center"
            >
              <i className="fa-solid fa-eye"></i>
            </Link>
          </div>
        </div>
        <div className="card-content px-1 space-y-1 pb-4 py-2">
          <h3 className="text-primary-800 font-semibold">{category.name}</h3>
          <Link to={`/product/${id}`}>
            <h2 className="font-semibold pb-2 line-clamp-2 cursor-pointer mt-2">
              {title}
            </h2>
          </Link>
          <div className="card-footer flex justify-between items-center">
            <span>{price} L.E</span>
            <div className="rating flex">
              <i className="fa-solid fa-star text-yellow-500 mt-1 me-1"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

