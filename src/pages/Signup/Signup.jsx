import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string, } from "yup"

export default function Signup() {
const [accountExisterror, setAccountExistError] =useState(null);

const navigate = useNavigate()


  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/

  const validationSchema = object({
    name: string().required("Name Is Required").min(3, "Name Must be At Least 3 Characters").max(25, "Name Can Not Be More Then 25 Characters"),
    email: string().required("Email Is Required").email("Please Enter A Valid Email"),
    password: string().required("Password Is required").matches(passwordRegex, "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    rePassword: string().required().oneOf([ref("password"),"Password And Repassword Must Be The Same"]),
    phone: string().required("Phone Is Required").matches(phoneRegex, "Sorry We Accept Egyptian Numbers Only")


  })

  async function sendRegisterData(values) {
   const loadingToastId= toast.loading("Please Wait...");
  try {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
      method: "POST",
      data: values
    }

    let {data}= await axios.request(options);

    if(data.message == "success"){
      console.log(data.message);
      
      toast.success("User Created Successfully")
      setTimeout(()=>{
        navigate("/login")
      },2000)
     
    }
  }

  catch(error) {
    toast.error(error.response.data.message)
    setAccountExistError(error.response.data.message)
  }

  finally{
    toast.dismiss(loadingToastId)

  }
    
  }

 

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },

    validationSchema,

    onSubmit: sendRegisterData


  })
  return <>
    <Helmet>
      <title>SignUp</title>
    </Helmet>


    <h1 className="text-xl text-slate-700 font-semibold"><i className="fa-solid fa-circle-user me-2"></i> Register Now :</h1>
    <form className="pt-4 space-y-3" onSubmit={formik.handleSubmit}>
      <div className="name">
        <input className="form-control w-full" type="text" placeholder="Enter Your Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="name" />

        {formik.errors.name && formik.touched.name && (
          <p className="text-red-600 text-sm mt-1 ">*{formik.errors.name}</p>
        )}
      </div>

      <div className="email">
        <input className="form-control w-full" type="email" placeholder="Enter Your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email" />


        {formik.errors.email && formik.touched.email && (
          <p className="text-red-600 text-sm mt-1 ">*{formik.errors.email}</p>
        )}

        {accountExisterror && (
          <p className="text-red-600 text-sm mt-1 ">*{accountExisterror}</p>
        )}
      </div>

      <div className="password">
        <input className="form-control w-full" type="password" placeholder="Enter Your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password" />

        {formik.errors.password && formik.touched.password && (
          <p className="text-red-600 text-sm mt-1 ">*{formik.errors.password}</p>
        )}
      </div>

      <div className="rePassword">
        <input className="form-control w-full" type="password" placeholder="Confirm  Password"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="rePassword" />

        {formik.errors.rePassword && formik.touched.rePassword && (
          <p className="text-red-600 text-sm mt-1 ">*{formik.errors.rePassword}</p>
        )}
      </div>

      <div className="phone">
        <input className="form-control w-full" type="tel" placeholder="Enter Your Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="phone" />

        {formik.errors.phone && formik.touched.phone && (
          <p className="text-red-600 text-sm mt-1 ">*{formik.errors.phone}</p>
        )}
      </div>

      <button className=" btn bg-primary-800 text-white hover:bg-primary-900 transition-all duration-300 w-full" type="submit">Sign Up</button>

    </form>
  </>


}
