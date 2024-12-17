import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/cartContext'
import { UserContext } from '../../context/User.context';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Checkout() {

    let { cartInfo } = useContext(CartContext);
    let { token } = useContext(UserContext);
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState(null);



    async function createCashOrder(values) {
        const toastId = toast.loading("We Are Trying To Create Your Order...")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
                method: "POST",
                headers: {
                    token
                },
                data: values
            }

            let { data } = await axios.request(options);
            if (data.status == "success") {
                toast.success("Order Created");
                setTimeout(() => {
                    navigate("/allorders")
                }, 2000)




            }


        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");

        }
        finally {
            toast.dismiss(toastId)
        }



    }


    async function createOnlinePayment() {
        const toastId = toast.loading("Redirecting You To Payment Page...")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
                method: "POST",
                headers: {
                    token
                }
            }

            let { data } = await axios.request(options);
            if (data.status == "success") {
                toast.success("Order Created successfully");
                setTimeout(() => {
                    location.href = data.session.url
                }, 2000)
            }



        } catch (error) {
            console.log(error);
            console.log("Something Went Wrong");


        }

        finally {
            toast.dismiss(toastId)
        }
    }


    const formik = useFormik({
        initialValues: {
            "shippingAddress": {
                "details": "",
                "phone": "",
                "city": ""
            }
        },
        onSubmit: (values) => {
            if (paymentMethod == "cash") {
                createCashOrder(values);
            }
            else {
                createOnlinePayment(values);
            }
        }
    })



    return <>

        <Helmet>
            <title>Checkout</title>
        </Helmet>
        <section>
            <h1 className='mb-4 text-lg font-semibold text-gray-500'>Shipping Information</h1>
            <form className='space-y-3' onSubmit={formik.handleSubmit}>
                <div className="city">
                    <input className='form-control w-full' type="text" placeholder='City'
                        value={formik.values.shippingAddress.city}
                        onChange={formik.handleChange}
                        name='shippingAddress.city' />
                </div>

                <div className="phone">
                    <input className='form-control w-full' type="tel" placeholder='Phone Number'
                        value={formik.values.shippingAddress.phone}
                        onChange={formik.handleChange}
                        name='shippingAddress.phone' />
                </div>

                <div className="phone">
                    <textarea className='form-control w-full' placeholder='Details'
                        value={formik.values.shippingAddress.details}
                        onChange={formik.handleChange}
                        name='shippingAddress.details' />
                </div>

                <div className="buttons space-x-3 flex mt-3">
                    <div className="cashBtn">
                        <button
                            onClick={() => {
                                setPaymentMethod("cash")
                            }}
                            type='submit' className='btn px-7 font-semibold bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white '>Cash Order</button>
                    </div>

                    <div className="onlinePay">
                        <button
                            onClick={() => {
                                setPaymentMethod("online")
                            }}
                            type='submit' className='btn bg-lime-500 font-semibold hover:bg-lime-600 transition-colors duration-300 text-white '>Online Payment</button>
                    </div>
                </div>

            </form>

        </section>
    </>
}
