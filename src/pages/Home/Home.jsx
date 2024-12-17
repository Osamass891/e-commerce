import ProductCard from "../../components/productCard/productCard";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function Home() {


  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET"
    }

    return axios.request(options);



  }





  let { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 6 * 60 * 60 * 1000
  })


  if(isLoading)
    return <Loading/>
  



  return <>
    <Helmet>
      <title>Home Page</title>
    </Helmet>


    <HomeSlider />
    <CategorySlider />
    <div className="grid grid-cols-12 gap-4 mt-16">
      
        {data.data.data.map((product) => (
          <ProductCard key={product.id} productInfo={product} />
        ))}
    </div>

  </>


}
