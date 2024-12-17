import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";


export const WishlistContext = createContext(null);




export default function WishlistProvider({ children }) {
    const { token } = useContext(UserContext);
    const [wishlistInfo, setWishlistInfo] = useState(null)

    async function addProductToWishlist({ productId }) {
        let toastId = toast.loading("Adding Product To Wishlist...")
        try {

            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/wishlist",
                method: "POST",
                headers: {
                    token
                },

                data: {
                    productId
                }
            }

            let { data } = await axios.request(options);
            getWishlistProducts()
            if (data.status == "success") {
                toast.success(data.message)
                console.log(data);

            }


        }

        catch (error) {
            console.log(error);
        }

        finally {
            toast.dismiss(toastId)

        }


    }

    async function getWishlistProducts() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/wishlist",
                method: "GET",
                headers: {
                    token
                },
            }

            let { data } = await axios.request(options);
            setWishlistInfo(data)
            console.log(data);
            console.log(wishlistInfo);
            
            


        }
        catch (error) {


        }

    }

    async function removeProductFromWishlist({ productId }) {

       const toastId= toast.loading("Deleting Product...")
       try {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            method: "DELETE",
            headers: {
                token,
            },


        }

        let {data} =await axios.request(options);
        if(data.status== "success"){
            setWishlistInfo(data);
            toast.success("Product Deleted Successfully")
        }






       } catch (error) {
        toast.error("Failed To Delete Product")

       }

       finally{
        toast.dismiss(toastId)
       }
    }







    return <WishlistContext.Provider value={{ addProductToWishlist, getWishlistProducts,wishlistInfo,removeProductFromWishlist }}>
        {children}
    </WishlistContext.Provider>;

}



