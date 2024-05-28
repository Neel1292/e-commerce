import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  EffectFade,
} from "swiper/modules";
import 'swiper/css';
export default function Carousel({ imgSrc }) {

  return (
    <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        // spaceBetween={50}
        slidesPerView={1}
    >
    {imgSrc.map((img, index) => (
        <SwiperSlide key={index}><img src={img} alt='Banner Images' className='w-full h-[50%]'/></SwiperSlide>
    ))}
    </Swiper>
  );
};

