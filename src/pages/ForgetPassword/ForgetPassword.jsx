import axios from "axios"
import { useFormik } from "formik"
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const navigate = useNavigate()
    async function sendResetPasswordData({email}) {
        const toastId= toast.loading("Sending Verification Code...")
        try {

            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                method: "POST",

                data: {

                    email

                }
            }

            let { data } = await axios.request(options);
           
            
            if(data.statusMsg=='success'){
                console.log(data);
                toast.success('Code Sent');
                setTimeout(()=>{
                    navigate("/verification")
                  },2000)
                
            }


        } catch (error) {
            console.log(error);
            toast.error('Somthing Went Wrong!')

        }

        finally{
            toast.dismiss(toastId)
        }
    }


    const formik = useFormik({
        initialValues: {
            email: ""
        },

        onSubmit: sendResetPasswordData
    })
    return <>
    <Helmet>
      <title>forget Password</title>
    </Helmet>
        <h1 className="text-gray-500 font-semibold">Please Enter Your Email Address :</h1>

        <form onSubmit={formik.handleSubmit}>
            <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                className="form-control w-full mt-3" type="email" />

            <button type="submit" className="btn mt-5 w-full bg-primary-700 hover:bg-primary-800 transition-colors duration-300 text-white ">Send Verify Code</button>
        </form>
    </>
}
