import React, { useRef, useState, useEffect } from "react";
import styles from "./OurExpert.module.css";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const OurExpert = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    let width = window.innerWidth;
    if (width < 481) {
      setMobile(true);
    }
  });

  return (
    <section className={styles.GetHired}>
      <div className={styles.CInner}>
        <div>
          <Swiper
            spaceBetween={10}
            centeredSlides={true}
            slidesPerView={mobile ? 3 : 5}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            grabCursor={true}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide className={styles.slide}>
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Amazon.png"
                alt="amazon"
                layout="intrinsic"
                width="100"
                height="60"
                objectFit="contain"
              />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Capgemini.png"
                alt="capgemini"
                layout="intrinsic"
                width="150"
                height="60"
              />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Flipkart.png"
                alt="Flipkart"
                quality={100}
                layout="intrinsic"
                width="150"
                height="60"
              />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Google.png"
                alt="Google"
                layout="intrinsic"
                width="150"
                height="60"
              />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Microsoft.png"
                alt="Microsoft"
                layout="intrinsic"
                width="150"
                height="60"
              />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Myntra.png"
                alt="Myntra"
                layout="intrinsic"
                width="150"
                height="60"
              />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/TCS.png"
                alt="Tcs"
                layout="intrinsic"
                width="150"
                height="60"
              />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Wipro.png"
                alt="Wipro"
                layout="intrinsic"
                objectFit="contain"
                width="120"
                height="60"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default OurExpert;
