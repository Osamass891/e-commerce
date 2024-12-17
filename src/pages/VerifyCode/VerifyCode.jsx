import axios from "axios"
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

export default function VerifyCode() {
  async function codeVerify({resetCode}){
    const toastId= toast.loading("Checking Your Data...")
  try {
    const options={
        url: `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        method: "POST",

        data:{
            resetCode
        }
        
    }

    let {data}=await axios.request(options);
    console.log(data);
    if(data.message=="success"){
        toast.success("All Done");
    }
    
  } catch (error) {
    console.log(error);
    toast.error("Somthing Went Wrong");
    
  }

  finally{
    toast.dismiss(toastId)
  }
   }

   
   const formik = useFormik({
    initialValues: {
        resetCode: ""
    },

    onSubmit: codeVerify
})
  return <>
   <Helmet>
      <title>Code Verification</title>
    </Helmet>
        <h1 className="text-gray-500 font-semibold">Please The Code From Your Email:</h1>

        <form onSubmit={formik.handleSubmit}>
            <input
                value={formik.values.resetCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="resetCode"
                className="form-control w-full mt-3" type="number" />

            <button type="submit" className="btn mt-5 w-full bg-primary-700 hover:bg-primary-800 transition-colors duration-300 text-white ">Check code</button>
        </form>
  
  </>
}
