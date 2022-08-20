import React, { useState } from "react";
import styles from "./RealWork.module.css";

import { AiOutlineCheck } from "react-icons/ai";
import Image from "next/image";
import Popup from "../Popup/Popup";

import VideoPopup from "../VideoPopup/VideoPopup";
import { FiPhone } from "react-icons/fi";
import ContactForm from "../ContactusForm/ContactusForm";

const RealWork = ({ desc }) => {
  const [popups, setPopups] = useState(false);
  const [video, setVideo] = useState(false);
  const videoSHow = () => {
    setVideo(true);
  };

  const popupShow = () => {
    setPopups(true);
  };
  return (
    <div className={styles.realWrapper}>
      <Popup trigger={popups} setTrigger={setPopups} className="popupModal">
        <div className="leftPopup">
          <div className="whiteP" />
        </div>
        <div className="RightPopup">
          <h5>Apply For Counselling</h5>
          <p>Fill the below Details to get started</p>

          <ContactForm popup={true} setTrigger={setPopups} />
        </div>
      </Popup>
      <VideoPopup triggers={video} setTriggers={setVideo} ids="9401Q9vFxOY" />
      <div className={styles.left}>
        <p className="pTop">Get Certified Directly From Companies</p>
        <h4>Why Real Work Experience?</h4>
        <p className="pBot">
          We believe in application-based learning approach that is focused on
          helping learners build relevant experience in the technologies they
          upskill to demonstrate expertise.
        </p>
        <span>
          <AiOutlineCheck className="bIcon" />
          <div className={styles.pWrapper}>
            <p>
              {" "}
              <b>Implement</b> what you learn
            </p>
          </div>
        </span>

        <span>
          <AiOutlineCheck className="bIcon" />
          <div className={styles.pWrapper}>
            <p>
              {" "}
              <b>Get</b> ready as per the industry level
            </p>
          </div>
        </span>
        <span>
          <AiOutlineCheck className="bIcon" />
          <div className={styles.pWrapper}>
            <p>
              <b>Learn</b> the skills that companies want
            </p>
          </div>
        </span>
        <div className={styles.btnWrappper}>
          <button className={styles.button} onClick={popupShow}>
            <FiPhone className={styles.btnIcon} /> Talk To Expert
          </button>
        </div>
      </div>
      <div className={styles.right}>
        <Image
          src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Real_work_experience.webp"
          layout="intrinsic"
          alt="Real work experience"
          width="530"
          height="383"
          loading="lazy"
        />
        <div className={styles.vBlur}>
          <img
            src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Video_icon.svg"
            alt="Why real work Experience"
            width="88"
            height="88"
            className={styles.vIcon}
            onClick={videoSHow}
          />
        </div>
      </div>
    </div>
  );
};

export default RealWork;
