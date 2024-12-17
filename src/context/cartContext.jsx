import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";


export const CartContext = createContext(null);




export default function CartProvider({ children }) {
    const { token } = useContext(UserContext);
    const [cartInfo, setCartInfo] = useState(null)

    async function addProductToCart({ productId }) {
        let toastId = toast.loading("Adding Product...")
        try {

            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                headers: {
                    token
                },

                data: {
                    productId
                }
            }

            let { data } = await axios.request(options);
            getCartProducts()
            if (data.status == "success") {
                toast.success(data.message)
            }


        }

        catch (error) {
            console.log(error);
        }

        finally {
            toast.dismiss(toastId)

        }


    }

    async function getCartProducts() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "GET",
                headers: {
                    token
                },
            }

            let { data } = await axios.request(options);
            setCartInfo(data)
            

        }
        catch (error) {
        

        }

    }

    async function removeProductFromCart({ productId }) {

       const toastId= toast.loading("Deleting Product...")
       try {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            method: "DELETE",
            headers: {
                token,
            },

            
        }

        let {data} =await axios.request(options);
        if(data.status== "success"){
            setCartInfo(data);
            toast.success("Product Deleted Successfully")
        }
        
        
        
        
        
        
       } catch (error) {
        toast.error("Failed To Delete Product")
        
       }

       finally{
        toast.dismiss(toastId)
       }
    }

    async function clearUserCart(){
      const toastId=  toast.loading("Clearing Your Cart...");
      try {
        const options={
            url: "https://ecommerce.routemisr.com/api/v1/cart",
            method: "DELETE",

            headers:{
                token,
            }
        }

        let {data}= await axios.request(options);
        if(data.message == "success"){
            setCartInfo({
                numOfCartItems: 0
            })

            toast.success("Cart Cleared");
          
        }
        
      } catch (error) {
        toast.error("Error Occoured Please Try Again");
        
      }
      finally{
        toast.dismiss(toastId)
      }
    }


    async function updateProductCount({ productId, count }){
       const toastId= toast.loading("Updating Product Quantity...")
       try {
        const options={
            url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            method: "PUT",
            headers:{
                token,
            },

            data:{
                count
            }
        }

        let {data}= await axios.request(options);
        if(data.status== "success"){
            setCartInfo(data)
            toast.success("Done")
            
        }
        
        
       } catch (error) {
        toast.error("Something went Wrong")
        
       }
       finally{
        toast.dismiss(toastId)
       }
    }

    

    return <CartContext.Provider value={{ addProductToCart, getCartProducts, cartInfo, removeProductFromCart, clearUserCart, updateProductCount }}>

        {children}
    </CartContext.Provider>
}



