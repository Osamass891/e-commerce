import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";

export default function CartItem({ productInfo }) {
  const { count, price, product } = productInfo;
  const { title, imageCover, category, id } = product;
  const { removeProductFromCart, updateProductCount } = useContext(CartContext);
  return <>
    <div className="flex gap-x-3" >
      <div className="cartItem grow bg-gray-100 py-4 px-6 rounded-lg flex justify-between items-center ">
        <img className="w-24 h-24 rounded-full object-cover bg-white border-4 border-white" src={imageCover} alt={title} />
        <Link to={`/product/${id}`}>
        <h2 className="font-semibold text-lg cursor-pointer text-gray-700">{title}</h2>
        </Link>
        <h4 className="font-semibold  text-gray-500" >{category.name}</h4>
        <div className="count flex items-center gap-5 ">
          <span className="text-lg text-gray-600">{count}</span>
          <div className="icons flex flex-col gap-y-2 ">
            <div
            onClick={()=>{
              updateProductCount({productId: id , count: count + 1})
            }}
             className="w-6 h-6 rounded-full bg-gray-700 hover:bg-slate-900 transition-colors duration-300  text-white flex justify-center items-center cursor-pointer"> <i className="fa-solid fa-plus"></i></div>
            <div 
             onClick={()=>{
              updateProductCount({productId: id , count: count - 1})
            }}
            className="w-6 h-6 rounded-full bg-gray-700 hover:bg-slate-900 transition-colors duration-300 text-white flex justify-center items-center cursor-pointer"> <i className="fa-solid fa-minus"></i></div>
          </div>
        </div>
        <span className="font-bold">{price} L.E</span>
      </div>


      <button 
      onClick={()=>{
        removeProductFromCart({productId: id})
      }}
      className="closeMark flex justify-center items-center p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300 ">
        <i className="fa-solid fa-xmark"></i>
      </button>

    </div>


  </>
}
