import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  EffectFade,
} from "swiper/modules";

export default function Carousel({ imgSrc }) {
  return (
    <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay, EffectFade]}
        navigation
        autoplay={{ delay: 2000 }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
    >
    {imgSrc.map((img, index) => (
        <SwiperSlide key={index}><img src={img} alt='Banner Images' className='w-full object-contain'/></SwiperSlide>
    ))}
    </Swiper>
  );
};

