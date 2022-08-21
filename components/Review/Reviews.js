import React, { useEffect, useState } from "react";

import styles from "./Reviews.module.css";
import { MdPlayCircleFilled } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiFillStar } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper";
import Image from "next/image";
import VideoPopup from "../VideoPopup/VideoPopup";

const Reviews = ({
  title,
  desc,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectBl,
  dataScience,
  home,
}) => {
  const [hover, setHover] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [spaceBetween, setSpaceBetween] = useState(60);
  const [slidePerView, setSlidePerView] = useState(3);

  useEffect(() => {
    let width = window.innerWidth;
    if (width < 481) {
      setMobile(true);
    }
    if (width < 1281) {
      setSpaceBetween(20);
      setSlidePerView(2);
    }
    if (width > 1281) {
      setSpaceBetween(60);
    }
  }, [mobile]);
  const [video, setVideo] = useState(false);
  const videoSHow = () => {
    setVideo(true);
  };

  return (
    <>
      <div className={styles.ReviewSlider}>
        <p className="pTop">What Our Learners Think</p>
        <h4>Student Reviews</h4>
        <Swiper
          slidesPerView={mobile ? 1 : slidePerView}
          spaceBetween={mobile ? 10 : spaceBetween}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          <>
            {dataScience ? (
              <>
                <SwiperSlide
                  className={hover ? styles.ReviewBoxS : styles.ReviewBox}
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Pragyan_Prakash.webp"
                    width="100"
                    height="100"
                    alt="Pragyan_prakash_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Pragyan Prakash</h5>
                  <div className={styles.rating}>
                    <Image
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      layout="intrinsic"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    Thanks a ton Skillslash Family. As a part of the Full stack
                    course in Data Science i had a great learning experience. I
                    was able to successfully move into a data science role in 7
                    months , which was amazing.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  key="1"
                  id="1"
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Mirnal_sahay_review.webp"
                    width="100"
                    height="100"
                    alt="Mirnal_sahay_review"
                    loading="lazy"
                    layout="intrinsic"
                  />
                  <h5>Mrinal Sahay</h5>
                  <div className={styles.rating}>
                    <Image
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/orange_star.webp"
                      width="80px"
                      height="20px"
                      layout="intrinsic"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    One of the best course providers is Skillslash, their data
                    science course has helped me become the data scientist I am
                    today. There are tons of differences between studying data
                    science and working as a data scientist.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="2"
                  id="2"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Gautum_skillslash_review.webp"
                    width="100"
                    height="100"
                    alt="Gautum_Skillslash_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Gautam</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    One of the best platform for working professionals. Although
                    a new startup but training quality is really good. For our
                    batch, instructor is Rahul (and co-founder) and he teaches
                    statistics and ML concepts in depth.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="3"
                  id="3"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/sameer-ahemed-skillslash-review.webp"
                    width="100"
                    height="100"
                    alt="Sameer-ahemed_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Sammer Ahmed</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    Skillslash is truly one of the best institutes to study
                    machine learning, I thank my brother for suggesting me this
                    course. The course has amazing perks for working
                    professionals like live classes, faculty of industry
                    professionals
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="4"
                  id="4"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Tilak-rao-skillslash-review.webp"
                    width="100"
                    height="100"
                    alt="Tilak_rao_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Tilak Rao</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    AI and ML full stack program is too good and helpful for
                    working professionals, I have done BCA so I was well versed
                    in Java, C, basic SQL and C++. At Skillslash I learnt
                    Python, core SQL, R, math - stats, ML and More.
                  </p>
                </SwiperSlide>
              </>
            ) : (
              ""
            )}
            {redirectDs ? (
              <>
                <SwiperSlide
                  className={hover ? styles.ReviewBoxS : styles.ReviewBox}
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Pragyan_Prakash.webp"
                    width="100"
                    height="100"
                    alt="Pragyan_prakash_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Pragyan Prakash</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    Thanks a ton Skillslash Family. As a part of the Full stack
                    course in Data Science i had a great learning experience. I
                    was able to successfully move into a data science role in 7
                    months , which was amazing.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  key="1"
                  id="1"
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Mirnal_sahay_review.webp"
                    width="100"
                    height="100"
                    alt="Mirnal_sahay_review"
                    loading="lazy"
                    layout="intrinsic"
                  />
                  <h5>Mrinal Sahay</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/orange_star.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    One of the best course providers is Skillslash, their data
                    science course has helped me become the data scientist I am
                    today. There are tons of differences between studying data
                    science and working as a data scientist.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="2"
                  id="2"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Gautum_skillslash_review.webp"
                    width="100"
                    height="100"
                    alt="Gautum_Skillslash_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Gautam</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    One of the best platform for working professionals. Although
                    a new startup but training quality is really good. For our
                    batch, instructor is Rahul (and co-founder) and he teaches
                    statistics and ML concepts in depth.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="3"
                  id="3"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/sameer-ahemed-skillslash-review.webp"
                    width="100"
                    height="100"
                    alt="Sameer-ahemed_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Sammer Ahmed</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    Skillslash is truly one of the best institutes to study
                    machine learning, I thank my brother for suggesting me this
                    course. The course has amazing perks for working
                    professionals like live classes, faculty of industry
                    professionals
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="4"
                  id="4"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Tilak-rao-skillslash-review.webp"
                    width="100"
                    height="100"
                    alt="Tilak_rao_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Tilak Rao</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    AI and ML full stack program is too good and helpful for
                    working professionals, I have done BCA so I was well versed
                    in Java, C, basic SQL and C++. At Skillslash I learnt
                    Python, core SQL, R, math - stats, ML and More.
                  </p>
                </SwiperSlide>
              </>
            ) : (
              ""
            )}
            {redirectFs ? (
              <>
                <SwiperSlide
                  className={hover ? styles.ReviewBoxS : styles.ReviewBox}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="5"
                  id="5"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/PANKAJ_CHOWDHURY.webp"
                    layout="intrinsic"
                    width="100"
                    height="100"
                    alt="PANKAJ_CHOWDHURY"
                    loading="lazy"
                  />
                  <h5>Pankaj Chowdhury</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>
                  <p>
                    The trainers at Skillslash are quite amazing. The teaching
                    style was simple yet effective. I was able to get into my
                    dream company IBM within 7 months of joining the full stack
                    program. The best part in the program was when they assigned
                    an IBM mentor to help me crack my interview which really
                    gave my preparation a solid boost.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="4"
                  id="4"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Manisha_singh.webp"
                    layout="intrinsic"
                    width="100"
                    height="100"
                    alt="Manisha_singh"
                  />
                  <h5>Manisha singh</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/orange_star.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>
                  <p>
                    I wanted to brush up my full stack skills when I joined
                    Skillslash program. I had been in a software role and this
                    course helped me improve my weak areas significantly.
                    Mentors were amazing and the interview prep module really
                    helped me become more confident in interviews. Got multiple
                    offers in a period of 3 months, thanks to Skillslash.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="13"
                  id="13"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Muralikrishna_Alichetty.webp"
                    layout="intrinsic"
                    width="100"
                    height="100"
                    alt="Muralikrishna_Alichetty"
                    loading="lazy"
                  />
                  <h5>Muralikrishna Alichetty</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>
                  <p>
                    The reason I joined Skillslash was because of the Data
                    engineering and Cloud specialisation. The course was quite
                    helpful as I was able to get a Senior DBA role at the end of
                    the program. Interview preparation module was also very
                    helpful as I was able to build a strong portfolio as a
                    result of this.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="7"
                  id="7"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/GIRISH_BALLAMPALLI.webp"
                    layout="intrinsic"
                    width="100"
                    height="100"
                    alt="GIRISH_BALLAMPALLI"
                    loading="lazy"
                  />
                  <h5>GIRISH BALLAMPALLI</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>
                  <p>
                    I think Dhaval has clear understanding of whatever he teach,
                    wheher it is Data Structures, Algorithms, Dynamic
                    Programming, he explains with such ease that even hard
                    problem seems easy. Hats off to his teaching and Dhaval keep
                    on motivating and helping others
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="8"
                  id="8"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Anukalp_Desai.webp"
                    layout="intrinsic"
                    width="100"
                    height="100"
                    alt="Anukalp_Desai"
                  />
                  <h5>Anukalp Desai</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/orange_star.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>
                  <p>
                    I have taken data structures and algorithms course taught by
                    Dhaval, he is very accessible and does an amazing job at
                    making difficult concepts easily understandable.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="9"
                  id="9"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Anurag_Sinha.webp"
                    layout="intrinsic"
                    width="100"
                    height="100"
                    alt="Anurag_Sinha"
                    loading="lazy"
                  />
                  <h5> Anurag Sinha</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>
                  <p>
                    Dhawal Sir is a really great mentor. He helped me identify
                    my weak areas and work on it consistently. He was always
                    supportive and his style of teaching kept hinged to my
                    goals. I was able to crack a senior software role as a
                    result of that and I will always be thankful for all his
                    support and guidance.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="10"
                  id="10"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Ankur_Singh.webp"
                    layout="intrinsic"
                    width="100"
                    height="100"
                    alt="Ankur_Singh"
                    loading="lazy"
                  />
                  <h5>Ankur Singh</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>
                  <p>
                    The course structure was really good and covered most of the
                    topics like Linked list, trees , graphs, recursion, dynamic
                    programming etc. Dhaval Sir did a great job taking each
                    topic to a great clarity level. Rather than remembering the
                    solution to the problem, he taught me how to approach
                    problem and solve it.
                  </p>
                </SwiperSlide>
              </>
            ) : (
              ""
            )}
            {home ? (
              <>
                <SwiperSlide
                  className={hover ? styles.ReviewBoxS : styles.ReviewBox}
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Pragyan_Prakash.webp"
                    width="100"
                    height="100"
                    alt="Pragyan_prakash_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Pragyan Prakash</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    Thanks a ton Skillslash Family. As a part of the Full stack
                    course in Data Science i had a great learning experience. I
                    was able to successfully move into a data science role in 7
                    months , which was amazing.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="5"
                  id="5"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/PANKAJ_CHOWDHURY.webp"
                    layout="intrinsic"
                    width="100"
                    height="100"
                    alt="PANKAJ_CHOWDHURY"
                    loading="lazy"
                  />
                  <h5>Pankaj Chowdhury</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>
                  <p>
                    The trainers at Skillslash are quite amazing. The teaching
                    style was simple yet effective. I was able to get into my
                    dream company IBM within 7 months of joining the full stack
                    program. The best part in the program was when they assigned
                    an IBM mentor to help me crack my interview which really
                    gave my preparation a solid boost.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="4"
                  id="4"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Manisha_singh.webp"
                    layout="intrinsic"
                    width="100"
                    height="100"
                    alt="Manisha_singh"
                  />
                  <h5>Manisha singh</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>
                  <p>
                    I wanted to brush up my full stack skills when I joined
                    Skillslash program. I had been in a software role and this
                    course helped me improve my weak areas significantly.
                    Mentors were amazing and the interview prep module really
                    helped me become more confident in interviews. Got multiple
                    offers in a period of 3 months, thanks to Skillslash.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="11"
                  id="11"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Muralikrishna_Alichetty.webp"
                    layout="intrinsic"
                    width="100"
                    height="100"
                    alt="Muralikrishna_Alichetty"
                    loading="lazy"
                  />
                  <h5>Muralikrishna Alichetty</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>
                  <p>
                    The reason I joined Skillslash was because of the Data
                    engineering and Cloud specialisation. The course was quite
                    helpful as I was able to get a Senior DBA role at the end of
                    the program. Interview preparation module was also very
                    helpful as I was able to build a strong portfolio as a
                    result of this.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="7"
                  id="7"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/GIRISH_BALLAMPALLI.webp"
                    layout="intrinsic"
                    width="100"
                    height="100"
                    alt="GIRISH_BALLAMPALLI"
                    loading="lazy"
                  />
                  <h5>GIRISH BALLAMPALLI</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>
                  <p>
                    I think Dhaval has clear understanding of whatever he teach,
                    wheher it is Data Structures, Algorithms, Dynamic
                    Programming, he explains with such ease that even hard
                    problem seems easy. Hats off to his teaching and Dhaval keep
                    on motivating and helping others
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="8"
                  id="8"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Anukalp_Desai.webp"
                    layout="intrinsic"
                    width="100"
                    height="100"
                    alt="Anukalp_Desai"
                  />
                  <h5>Anukalp Desai</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>
                  <p>
                    I have taken data structures and algorithms course taught by
                    Dhaval, he is very accessible and does an amazing job at
                    making difficult concepts easily understandable.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="9"
                  id="9"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Anurag_Sinha.webp"
                    layout="intrinsic"
                    width="100"
                    height="100"
                    alt="Anurag_Sinha"
                    loading="lazy"
                  />
                  <h5> Anurag Sinha</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>
                  <p>
                    Dhawal Sir is a really great mentor. He helped me identify
                    my weak areas and work on it consistently. He was always
                    supportive and his style of teaching kept hinged to my
                    goals. I was able to crack a senior software role as a
                    result of that and I will always be thankful for all his
                    support and guidance.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="10"
                  id="10"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Ankur_Singh.webp"
                    layout="intrinsic"
                    width="100"
                    height="100"
                    alt="Ankur_Singh"
                    loading="lazy"
                  />
                  <h5>Ankur Singh</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>
                  <p>
                    The course structure was really good and covered most of the
                    topics like Linked list, trees , graphs, recursion, dynamic
                    programming etc. Dhaval Sir did a great job taking each
                    topic to a great clarity level. Rather than remembering the
                    solution to the problem, he taught me how to approach
                    problem and solve it.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  key="1"
                  id="1"
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Mirnal_sahay_review.webp"
                    width="100"
                    height="100"
                    alt="Mirnal_sahay_review"
                    loading="lazy"
                    layout="intrinsic"
                  />
                  <h5>Mrinal Sahay</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/orange_star.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    One of the best course providers is Skillslash, their data
                    science course has helped me become the data scientist I am
                    today. There are tons of differences between studying data
                    science and working as a data scientist.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="2"
                  id="2"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Gautum_skillslash_review.webp"
                    width="100"
                    height="100"
                    alt="Gautum_Skillslash_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Gautam</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    One of the best platform for working professionals. Although
                    a new startup but training quality is really good. For our
                    batch, instructor is Rahul (and co-founder) and he teaches
                    statistics and ML concepts in depth.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="3"
                  id="3"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/sameer-ahemed-skillslash-review.webp"
                    width="100"
                    height="100"
                    alt="Sameer-ahemed_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Sammer Ahmed</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    Skillslash is truly one of the best institutes to study
                    machine learning, I thank my brother for suggesting me this
                    course. The course has amazing perks for working
                    professionals like live classes, faculty of industry
                    professionals
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="12"
                  id="12"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Tilak-rao-skillslash-review.webp"
                    width="100"
                    height="100"
                    alt="Tilak_rao_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Tilak Rao</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    AI and ML full stack program is too good and helpful for
                    working professionals, I have done BCA so I was well versed
                    in Java, C, basic SQL and C++. At Skillslash I learnt
                    Python, core SQL, R, math - stats, ML and More.
                  </p>
                </SwiperSlide>
              </>
            ) : (
              ""
            )}
            {redirectBa ? (
              <>
                <SwiperSlide
                  className={hover ? styles.ReviewBoxS : styles.ReviewBox}
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Pragyan_Prakash.webp"
                    width="100"
                    height="100"
                    alt="Pragyan_prakash_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Pragyan Prakash</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    Thanks a ton Skillslash Family. As a part of the Full stack
                    course in Data Science i had a great learning experience. I
                    was able to successfully move into a data science role in 7
                    months , which was amazing.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  key="1"
                  id="1"
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Mirnal_sahay_review.webp"
                    width="100"
                    height="100"
                    alt="Mirnal_sahay_review"
                    loading="lazy"
                    layout="intrinsic"
                  />
                  <h5>Mrinal Sahay</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/orange_star.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    One of the best course providers is Skillslash, their data
                    science course has helped me become the data scientist I am
                    today. There are tons of differences between studying data
                    science and working as a data scientist.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="2"
                  id="2"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Gautum_skillslash_review.webp"
                    width="100"
                    height="100"
                    alt="Gautum_Skillslash_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Gautam</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    One of the best platform for working professionals. Although
                    a new startup but training quality is really good. For our
                    batch, instructor is Rahul (and co-founder) and he teaches
                    statistics and ML concepts in depth.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="3"
                  id="3"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/sameer-ahemed-skillslash-review.webp"
                    width="100"
                    height="100"
                    alt="Sameer-ahemed_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Sammer Ahmed</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    Skillslash is truly one of the best institutes to study
                    machine learning, I thank my brother for suggesting me this
                    course. The course has amazing perks for working
                    professionals like live classes, faculty of industry
                    professionals
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="4"
                  id="4"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Tilak-rao-skillslash-review.webp"
                    width="100"
                    height="100"
                    alt="Tilak_rao_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Tilak Rao</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    AI and ML full stack program is too good and helpful for
                    working professionals, I have done BCA so I was well versed
                    in Java, C, basic SQL and C++. At Skillslash I learnt
                    Python, core SQL, R, math - stats, ML and More.
                  </p>
                </SwiperSlide>
              </>
            ) : (
              ""
            )}
            {redirectDe ? (
              <>
                <SwiperSlide
                  className={hover ? styles.ReviewBoxS : styles.ReviewBox}
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Pragyan_Prakash.webp"
                    width="100"
                    height="100"
                    alt="Pragyan_prakash_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Pragyan Prakash</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    Thanks a ton Skillslash Family. As a part of the Full stack
                    course in Data Science i had a great learning experience. I
                    was able to successfully move into a data science role in 7
                    months , which was amazing.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  key="1"
                  id="1"
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Mirnal_sahay_review.webp"
                    width="100"
                    height="100"
                    alt="Mirnal_sahay_review"
                    loading="lazy"
                    layout="intrinsic"
                  />
                  <h5>Mrinal Sahay</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/orange_star.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    One of the best course providers is Skillslash, their data
                    science course has helped me become the data scientist I am
                    today. There are tons of differences between studying data
                    science and working as a data scientist.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="2"
                  id="2"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Gautum_skillslash_review.webp"
                    width="100"
                    height="100"
                    alt="Gautum_Skillslash_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Gautam</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    One of the best platform for working professionals. Although
                    a new startup but training quality is really good. For our
                    batch, instructor is Rahul (and co-founder) and he teaches
                    statistics and ML concepts in depth.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="3"
                  id="3"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/sameer-ahemed-skillslash-review.webp"
                    width="100"
                    height="100"
                    alt="Sameer-ahemed_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Sammer Ahmed</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    Skillslash is truly one of the best institutes to study
                    machine learning, I thank my brother for suggesting me this
                    course. The course has amazing perks for working
                    professionals like live classes, faculty of industry
                    professionals
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="4"
                  id="4"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Tilak-rao-skillslash-review.webp"
                    width="100"
                    height="100"
                    alt="Tilak_rao_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Tilak Rao</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    AI and ML full stack program is too good and helpful for
                    working professionals, I have done BCA so I was well versed
                    in Java, C, basic SQL and C++. At Skillslash I learnt
                    Python, core SQL, R, math - stats, ML and More.
                  </p>
                </SwiperSlide>
              </>
            ) : (
              ""
            )}
            {redirectBl ? (
              <>
                <SwiperSlide
                  className={hover ? styles.ReviewBoxS : styles.ReviewBox}
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Pragyan_Prakash.webp"
                    width="100"
                    height="100"
                    alt="Pragyan_prakash_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Pragyan Prakash</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    Thanks a ton Skillslash Family. As a part of the Full stack
                    course in Data Science i had a great learning experience. I
                    was able to successfully move into a data science role in 7
                    months , which was amazing.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  key="1"
                  id="1"
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Mirnal_sahay_review.webp"
                    width="100"
                    height="100"
                    alt="Mirnal_sahay_review"
                    loading="lazy"
                    layout="intrinsic"
                  />
                  <h5>Mrinal Sahay</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/orange_star.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    One of the best course providers is Skillslash, their data
                    science course has helped me become the data scientist I am
                    today. There are tons of differences between studying data
                    science and working as a data scientist.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="2"
                  id="2"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Gautum_skillslash_review.webp"
                    width="100"
                    height="100"
                    alt="Gautum_Skillslash_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Gautam</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    One of the best platform for working professionals. Although
                    a new startup but training quality is really good. For our
                    batch, instructor is Rahul (and co-founder) and he teaches
                    statistics and ML concepts in depth.
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox1}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="3"
                  id="3"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/sameer-ahemed-skillslash-review.webp"
                    width="100"
                    height="100"
                    alt="Sameer-ahemed_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Sammer Ahmed</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    Skillslash is truly one of the best institutes to study
                    machine learning, I thank my brother for suggesting me this
                    course. The course has amazing perks for working
                    professionals like live classes, faculty of industry
                    professionals
                  </p>
                </SwiperSlide>
                <SwiperSlide
                  className={styles.ReviewBox2}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  key="4"
                  id="4"
                >
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Tilak-rao-skillslash-review.webp"
                    width="100"
                    height="100"
                    alt="Tilak_rao_review"
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <h5>Tilak Rao</h5>
                  <div className={styles.rating}>
                    <Image
                      layout="intrinsic"
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Star_review_icon.webp"
                      width="80px"
                      height="20px"
                      alt="5 Star Rating"
                    />
                  </div>

                  <p>
                    AI and ML full stack program is too good and helpful for
                    working professionals, I have done BCA so I was well versed
                    in Java, C, basic SQL and C++. At Skillslash I learnt
                    Python, core SQL, R, math - stats, ML and More.
                  </p>
                </SwiperSlide>
              </>
            ) : (
              ""
            )}
          </>
        </Swiper>
      </div>
      <div className={styles.ReviewTop}>
        <VideoPopup triggers={video} setTriggers={setVideo} ids="iT54dOHPQpU" />
        <div className={styles.ReviewLeft}>
          <Image
            src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Reviews_of_Skillslash.webp"
            width="595"
            height="356"
            loading="lazy"
            layout="intrinsic"
            alt="review-of-skillslasj"
          />
          <MdPlayCircleFilled className={styles.pIcon} onClick={videoSHow} />
        </div>
        <div className={styles.ReviewRight}>
          <p className="pTop">What Our Learners Think</p>
          <h4>{title}</h4>
          <p className="pBotS">{desc}</p>
          <div className={styles.points}>
            <div className={styles.leftPoints}>
              <p>
                <AiFillCheckCircle className="bIcon" />
                Get interactive training with 1:1 mentorship
              </p>
              <p>
                <AiFillCheckCircle className="bIcon" />
                Work in real-time projects and get exposure
              </p>
              <p>
                <AiFillCheckCircle className="bIcon" />
                Get assured job referrals and land in top firms
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
