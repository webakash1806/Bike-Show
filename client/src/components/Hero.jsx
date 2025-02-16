import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import { useGetBannerQuery } from "@/Redux/AllApi/BikeApi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const Hero = () => {

    const { data, isLoading } = useGetBannerQuery();
    console.log(data)
    const images = [
        "https://res.cloudinary.com/disdsorfp/image/upload/v1737182762/Hornet2-homepage_1_e3nhoy.webp",
        "https://res.cloudinary.com/disdsorfp/image/upload/v1737182762/Grazia_banner_iwlc3o.webp",
        "https://res.cloudinary.com/disdsorfp/image/upload/v1737182762/Hornet2-homepage_jciv5a.webp",
    ];
    return (
        <div className="relative w-full ">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]} // Using EffectFade for smooth transitions
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                speed={2000}
                loop={true}
                effect="fade"
                className="w-full h-full"
            >
                {data?.banner ? data?.banner?.map((slide) => (
                    <SwiperSlide key={slide.id}>

                        <img src={slide?.image?.url} className="w-full" alt="" />
                    </SwiperSlide>
                )) :

                    images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img src={image} className="w-full" alt="" />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}


export default Hero