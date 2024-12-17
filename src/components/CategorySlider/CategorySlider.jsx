import axios from "axios";
import { useEffect, useState } from "react"
import Loading from "../Loading/Loading";
import { SwiperSlide } from "swiper/react";
import toast from "react-hot-toast";

export default function CategorySlider() {

    const [categories, setcategories] = useState(null);

    async function getCategories() {
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/categories",
            method: "GET"
        }

        const {data} = await axios.request(options);

        setcategories(data.data)
    }

    useEffect(() => {
        getCategories()
    }, [])
    return <>
       {categories ? (
  <section>
    <h2 className="font-semibold mb-2">Shop Popular Categories</h2>
    <swiper-container loop={true}  slides-per-view={6}>
      {categories.map((category) => (
        <swiper-slide key={category._id}>
          <img
            src={category.image}
            className="w-full h-72 object-cover"
            alt=""
          />
          <h3>{category.name}</h3>
        </swiper-slide>
      ))}
    </swiper-container>
  </section>
) : (
  null
)}

    </>
}
