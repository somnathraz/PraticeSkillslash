import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/aboutUs.module.css";
import Footer from "../components/Footer/Footer";
import CTA from "../components/CTA/CTA";
import { BsPlayCircle } from "react-icons/bs";
import Image from "next/image";
import VideoPopup from "../components/VideoPopup/VideoPopup";
import Navbar from "../components/Navbar/Navbar";

const AboutUs = () => {
  const [video, setVideo] = useState(false);
  const videoSHow = () => {
    setVideo(true);
  };

  return (
    <>
      <Navbar />
      <div className={styles.aboutUs}>
        <Head>
          <title>Skillslash- About Us</title>
          <meta
            name="description"
            content="Being the leading data science training provider, we give you the opportunity to work directly with industry experts on latest projects."
          />
          <link
            rel="icon"
            href="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/favicon.ico"
          />
        </Head>
        <VideoPopup triggers={video} setTriggers={setVideo} ids="9401Q9vFxOY" />
        <div className={styles.aboutHeader}>
          <div className={styles.circle1} />
          <div className={styles.circle2} />
          <div className={styles.circle3} />
          <div className={styles.circle4} />
          <div className={styles.circle5} />
          <div className={styles.leftAbout}>
            <p className={styles.pTop}>
              PROJECT BASED CERTIFICATION PLATFORM FOR PROFESSIONAL
            </p>
            <h5>
              Obtain certification as an <span>industry specialist</span>
            </h5>
            <p className="pBot">
              Old ways of learning, we feel, should be challenged. Besides, we
              intend to debunk myths about the importance of academic
              certifications.
            </p>
            <div className={styles.btn}>
              <BsPlayCircle className={styles.Play} onClick={videoSHow} />{" "}
              <p onClick={videoSHow}>Intro Video</p>
            </div>
          </div>
          <div className={styles.rightAbout}>
            <Image
              src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/about-us_header.webp"
              width="631"
              height="591"
              alt="about-us"
              layout="intrinsic"
            />
          </div>
        </div>
      </div>
      <div className={styles.values}>
        <div className={styles.leftValues}>
          <Image
            src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/core_values.webp"
            width="707"
            height="404"
            alt="our-core-values"
            layout="intrinsic"
          />
        </div>
        <div className={styles.rightValues}>
          <p className="pTop">Industry Experience Certificate</p>
          <h5>Core values of Skillslash</h5>
          <p className="pBot">
            Being the leading data science training provider, we give you the
            opportunity to work directly with industry experts on latest
            projects.
            <br />
            <br />
            Working on relevant industry projects is a necessary part of
            learning. Further, our training allows you to develop your abilities
            and get employed in top businesses. Moreover, we believe our data
            science training can help you upgrade your skillset and get first
            preference in the hiring process.
          </p>
        </div>
      </div>
      <div className={styles.goal}>
        <h5>Our goal is to offer a top-notch education</h5>
        <p className="pBot" style={{ marginBottom: "50px" }}>
          We are committed to make education accessible to all people by keeping
          our courses affordable and transparent. In addition, we provide
          opportunities for students to test out courses for free before
          committing to the complete program.
          <br /> <br />
          Besides, we have tied up with some of India’s most promising AI and
          machine learning businesses to bring domain expertise to our students.
          Also, this prepares them to flourish in their careers. Further, we aim
          that Skillslash will disrupt the e-learning arena for professionals
          with our well-designed curriculum and a strong focus on practical data
          science training.
        </p>
        <Image
          src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Goal_of_skillslash.webp"
          width="1000"
          height="304"
          alt="Goal-of-Skillslash"
          layout="intrinsic"
        />
      </div>
      <div className={styles.Cta}>
        <CTA />
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
