import axios from "axios"
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";

export default function Brands() {
    const [brands, setBrands] = useState(null);
    async function getBrands() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/brands`,
                method: "GET"
            }

            let { data } = await axios.request(options);
            console.log(data);
            setBrands(data.data)

        } catch (error) {
            console.log(error);


        }
    }

    useEffect(() => {
        getBrands()
    }, [])


    return <>
        {brands ? (
  <div className="grid grid-cols-12 gap-4">
    {brands.map((order) => (
      <div
        className="brand-item col-span-4 border-4 p-4 rounded-md shadow-md flex flex-col items-center"
        key={order.id} 
      >
        <img
          className="w-full"
          src={order.image}
          alt={order.name}
        />
        <span className="font-bold text-lg">{order.name}</span>
      </div>
    ))}
  </div>
) : (
  <Loading />
)}

    </>


}
