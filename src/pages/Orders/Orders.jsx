import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/User.context"
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Orders() {

  const[orders,setOrders]= useState(null);

  const {token}= useContext(UserContext);

  let{id}= jwtDecode(token)

 
  async function getUserOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET"
    }

    let {data}= await axios.request(options);
    setOrders(data)
    
    
    
  }

  useEffect(()=>{
    getUserOrders()
  },[])


  return <>
    <Helmet>
      <title>Orders</title>
    </Helmet>

    {orders ? (
      <section className="space-y-4">
     {orders.map((order)=> 
     <div key={order.id} className="order p-4 border-2 border-gray-500 rounded-lg border-opacity-25">
     <header className="flex justify-between items-center">
       <div>
         <h2 className="text-gray-500 text-lg font-semibold">Order ID</h2>
         <span className="text-gray-400">#{order.id}</span>
       </div>
       <div>
     {order.isPaid? 
         <span
         className="font-cairo inline-block py-1 px-4  bg-lime-500 hover:bg-lime-600 text-white transition-colors duration-300 rounded-full"> مدفوع</span>:
         <span
         className="font-cairo inline-block py-1 px-4  bg-red-500 hover:bg-red-600 text-white transition-colors duration-300 rounded-full">  غير مدفوع</span>}

         {order.isDelivered? 
         <span 
         className="font-cairo inline-block py-1 px-4  bg-lime-500 hover:bg-lime-600 text-white transition-colors duration-300 rounded-full ml-3">تم التوصيل</span>:
         <span 
         className="font-cairo inline-block py-1 px-4  bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300 rounded-full ml-3">قيدالتوصيل</span>}
       </div>
     </header>

     <div className="grid md:gap-4 md:grid-cols-3 lg:grid-cols-6 ">
       {order.cartItems.map((product)=>
      <div key={product._id} className="product-item mt-4 space-y-3 border-2 border-gray-500 border-opacity-25 rounded-md overflow-hidden ">
      <img
        className="w-full"
        src={product.product.imageCover} alt="" />
      <h3 className="text-md font-semibold px-1 line-clamp-2">
        <Link to={`/product/${product.product.id}`}>{product.product.title}</Link>
      </h3>
      <div className="flex justify-between items-center p-1 ">
        <p>
          <span className="text-gray-500 font-semibold underline text-md mr-1">Count:</span>
          {product.count}
        </p>
        <span className="font-semibold">{product.price} L.E</span>
      </div>
    </div>)}

     </div>

     <div>
      <p className="mt-5 text-gray-800  ">Total Order Price : <span className="text-primary-800 text-lg font-semibold">{order.totalOrderPrice} </span> L.E</p>
     </div>

   </div>)}
    </section>
    ): <Loading/>}

  </>
}



