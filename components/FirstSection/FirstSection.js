import React, { useState, useEffect } from "react";
import styles from "./FirstSection.module.css";
import Image from "next/image";
import { BsArrowRightShort, BsPlayFill } from "react-icons/bs";
import TextAnimation from "../Animation/TextAnimation";
import VideoPopup from "../VideoPopup/VideoPopup";

const FirstSection = () => {
  const [mobile, setMobile] = useState(false);
  const [video, setVideo] = useState(false);

  const videoSHow = () => {
    setVideo(true);
  };
  useEffect(() => {
    let width = window.innerWidth;
    if (width < 481) {
      setMobile(true);
    }
    if (width > 481) {
      setMobile(false);
    }
  });
  return (
    <div className={styles.FirstWrap}>
      <VideoPopup triggers={video} setTriggers={setVideo} ids="512xWUs9uXs" />
      <div className={styles.leftFirst}>
        <p className="pTop">Get Assured Career Transition From</p>
        <h1>
          India's Best Project Based <span>Experiential Learning Platform</span>
        </h1>

        <p className={styles.pBot}>
          Get real-work experience and certifications. Learn from industry
          experts and get placed in top product companies!
        </p>

        <TextAnimation />

        <div className={styles.btnWrapper}>
          <a href="#explore">
            <button>
              Explore Courses <BsArrowRightShort className="bIcons" />
            </button>
          </a>
          <BsPlayFill className={styles.playIcon} onClick={videoSHow} />
          <p onClick={videoSHow}>Intro Video</p>
        </div>
      </div>
      <div className={styles.rightFirst}>
        <Image
          src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/header image-01.webp"
          height="597"
          width="900"
          layout="intrinsic"
        />
      </div>
    </div>
  );
};

export default FirstSection;
