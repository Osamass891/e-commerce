import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GeustRoute from "./components/GeustRoute/GeustRoute";
import UserProvider from "./context/User.context";
import CartProvider from "./context/cartContext";
import Cart from "./pages/Cart/Cart";
import ProductDetalis from "./pages/ProductDetalis/ProductDetalis";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Offline from "./components/Offline/Offline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Brands from "./pages/Brands/Brands";
import Categories from "./pages/Categories/Categories";
import Wishlist from "./pages/Wishlist/Wishlist";
import VerifyCode from "./pages/VerifyCode/VerifyCode";
import WishlistProvider from "./context/WishlistContext";


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute>
        <Layout />
      </ProtectedRoute>,
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "product/:id", element: <ProductDetalis /> },
        { path: "checkout", element: <Checkout /> },
        { path: "allorders", element: <Orders /> },
        { path: "brands", element: <Brands /> },
        { path: "categories", element: <Categories /> },
        { path: "wishlist", element: <Wishlist /> },
        



      ]
    },
    {
      path: "/",
      element: <GeustRoute>
        <Layout />
      </GeustRoute>,
      children: [
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "passwordReset", element: <ForgetPassword /> },
        { path: "verification", element: <VerifyCode /> },

      ],
    },


  ]);

  const myClient= new QueryClient();

  return <>


    <QueryClientProvider client={myClient}>
      <UserProvider>
       <WishlistProvider>
       <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
       </WishlistProvider>
      </UserProvider>
      <Toaster position="top-right" />
    </QueryClientProvider>





    {/* <Offline>
   <div className="p-4 fixed bottom-8 right-8 z-50 bg-white font-semibold rounded-lg shadow-md ">

    <i className="fa-solid fa-wifi mr-2"></i>
    <span>Check Your Internet Connection</span>
   </div>
   </Offline> */}
  </>

}
