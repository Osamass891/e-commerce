import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import axios from "axios";

export default function Categories() {

  const [categories, setCategories] = useState(null);
  async function getCategories() {
      try {
          const options = {
              url: `https://ecommerce.routemisr.com/api/v1/categories`,
              method: "GET"
          }

          let { data } = await axios.request(options);
          console.log(data);
          setCategories(data.data)

      } catch (error) {
          console.log(error);


      }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return <>
          {categories ? (
  <div className="grid grid-cols-12 gap-4">
    {categories.map((category) => (
      <div
        className="brand-item col-span-4 border-4  rounded-md shadow-md flex flex-col items-center"
        key={category.id} 
      >
        <img
          className="w-full"
          src={category.image}
          alt={category.name}
        />
        <span className="font-bold  text-primary-700 text-2xl mt-8 py-3 ">{category.name}</span>
      </div>
    ))}
  </div>
) : (
  <Loading />
)}
  </>
}
