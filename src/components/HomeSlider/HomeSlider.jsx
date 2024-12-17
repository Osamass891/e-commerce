import images1 from '../../assets/images/slider-image-1.jpeg'
import images2 from '../../assets/images/slider-image-2.jpeg'
import images3 from '../../assets/images/slider-image-3.jpeg'


export default function HomeSlider() {
    return <>
<h3 className='font-semibold ms-1 '>New Releases</h3>
        <div className="grid  grid-cols-12 mb-12">
            
            <div className="col-span-8">
                <swiper-container style={{ height: "100%" }} loop= {true}>
                    <swiper-slide style={{ height: "100%" }}>
                    <img src={images1} className='w-full h-full object-cover' alt="" />
                    </swiper-slide>
                    <swiper-slide style={{ height: "100%" }}>
                    <img src={images2} className='w-full h-full object-cover' alt="" />
                    </swiper-slide>
                    <swiper-slide style={{ height: "100%" }}>
                    <img src={images3} className='w-full h-full object-cover' alt="" />
                    </swiper-slide>
                </swiper-container>
            </div>

            <div className='col-span-4'>
                <div className='h-1/2'>
                    <img src={images2} className='w-full h-full object-cover' alt="" />
                </div>
                <div className='h-1/2'>
                    <img src={images1} className='w-full h-full object-cover' alt="" />
                </div>
            </div>


        </div>

    </>
}
