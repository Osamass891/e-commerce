import axios from "axios"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string, } from "yup"
import { UserContext } from "../../context/User.context";
import { Helmet } from "react-helmet";

export default function Login() {

  let { setToken, } = useContext(UserContext)

  const [incorrectEmail, setIncorrectEmail] = useState(null);

  const navigate = useNavigate()


  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = object({
    email: string().required("Email Is Required").email("Please Enter A Valid Email"),
    password: string().required("Password Is required").matches(passwordRegex, "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),

  })

  async function sendLoginData(values) {
    const loadingToastId = toast.loading("Please Wait...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values
      }

      let { data } = await axios.request(options);
      if (data.message == "success") {
        localStorage.setItem("token", data.token)
        setToken(data.token)
        toast.success("Welcome Back");

        setTimeout(() => {
          navigate("/")
        }, 2000)
      }


    }

    catch (error) {
      toast.error(error.response.data.message)
      setIncorrectEmail(error.response.data.message)


    }

    finally {
      toast.dismiss(loadingToastId)

    }

  }



  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",

    },

    validationSchema,

    onSubmit: sendLoginData


  })
  return <>
    <Helmet>
      <title>Login</title>
    </Helmet>



    <h1 className="text-xl text-slate-700 font-semibold "><i className="fa-solid fa-circle-user me-2"></i> Login :</h1>
    <form className="pt-4 space-y-3" onSubmit={formik.handleSubmit}>

      <div className="email">
        <input className="form-control w-full" type="email" placeholder="Enter Your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email" />


        {formik.errors.email && formik.touched.email && (
          <p className="text-red-600 text-sm mt-1 ">*{formik.errors.email}</p>
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

        {incorrectEmail && (
          <p className="text-red-600 text-sm mt-1 ">*{incorrectEmail}</p>
        )}

       
      </div>

      <Link className="text-xs text-blue-600 font-semibold hover:underline " to={"/passwordReset"}>Forget password? Click Here</Link>


      <button className=" btn bg-primary-800 text-white hover:bg-primary-900 transition-all duration-300 w-full" type="submit">Login</button>

    </form>
  </>


}
