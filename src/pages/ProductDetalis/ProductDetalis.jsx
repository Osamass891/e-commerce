import axios from "axios"
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import ReactImageGallery from "react-image-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import "Swiper/css"
import ProductCard from "../../components/productCard/productCard";
import useOnline from "../../hooks/useOnline";
import { Helmet } from "react-helmet";

export default function ProductDetalis() {
  const [productDetals, setProductDetails] = useState(null);
  const [realatedProducts, setRealtedProducts] = useState(null)
  let { id } = useParams()
  let { addProductToCart } = useContext(CartContext)



  async function getProductDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET",
      }

      let { data } = await axios.request(options);
      console.log(data);
      setProductDetails(data.data);

    } catch (error) {
      console.log(error);


    }

  }

  async function getRealtedproducts() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetals.category._id}`,
      method: "GET"
    }

    let { data } = await axios.request(options);
    setRealtedProducts(data.data)
  }

  useEffect(() => {
    getProductDetails()
  }, [id])


  useEffect(() => {
    if (productDetals == null) return;
    getRealtedproducts()
  }, [productDetals])

  let isOnline = useOnline()

  return <>

    <Helmet>
      <title>Product Details</title>
    </Helmet>
    {productDetals ?
      <>

        <Helmet>
          <title>{productDetals.title}</title>
        </Helmet>
        <section className="grid grid-cols-12 space-x-10">
          <div className="col-span-3">
            <div>
              <ReactImageGallery
                showFullscreenButton={false}
                showPlayButton={false}
                showNav={false}
                items={productDetals.images.map((image) => {
                  return {
                    original: image,
                    thumbnail: image
                  }
                })}

              />
            </div>
          </div>
          <div className="col-span-9 space-y-5">
            <div className="space-y-2">
              <h2 className="text-gray-600 font-semibold">{productDetals.title}</h2>
              <h4 className="text-primary-800 text-sm font-semibold">{productDetals.category.name}</h4>
            </div>
            <p className="text-gray-400">{productDetals.description}</p>
            <div className="flex justify-between">
              <span>{productDetals.price} L.E</span>
              <div className="rating space-x-2">
                <i className="fa-solid fa-star text-yellow-500"></i>
                <span>{productDetals.ratingsAverage}</span>
              </div>
            </div>

            {isOnline &&
              <button
                onClick={() => {
                  addProductToCart({ productId: id })
                }}
                className="btn bg-primary-800 hover:bg-primary-900 transition-colors duration-300 text-white w-full" type="submit">Add To Cart</button>}

          </div>

        </section>

        <section>
          <h2 className="font-semibold text-gray-500 text-lg my-10">Realted Products</h2>
          {realatedProducts ? <Swiper slidesPerView={6} spaceBetween={15}>
            {realatedProducts.map((product) => <SwiperSlide key={product.id}>
              <ProductCard productInfo={product} />
            </SwiperSlide>)}
          </Swiper> : <Loading />}
        </section>

      </> : <Loading />}

  </>
}
