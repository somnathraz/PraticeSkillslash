import React from "react";
import styles from "./Steps.module.css";
import Image from "next/image";

const Steps = () => {
  return (
    <div className={styles.StepsWrap}>
      <div className={styles.leftStep}>
        <Image
          src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Get_Hired_Skillslash.webp"
          width="559"
          height="388"
          layout="intrinsic"
          loading="lazy"
          alt="Get-hired-skillslash"
        />
      </div>
      <div className={styles.rightStep}>
        <div className={styles.DivIcon}>
          <div className={styles.leftIcon}>
            <Image
              src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Acquire_icon.svg"
              width="85"
              height="85"
              layout="intrinsic"
              loading="lazy"
              alt="quire certificate"
            />
            <Image
              layout="intrinsic"
              src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Line_icon.svg"
              alt="getHired_steps_in_Skillslash"
              className={styles.line}
              width="4px"
              height="60px"
              loading="lazy"
            />
          </div>
          <div className={styles.rightIcon}>
            <h6>Acquire Expertise</h6>
            <p>
              Attend our live interactive sessions led by industry veterans to
              enjoy an immersive learning experience
            </p>
          </div>
        </div>

        <div className={styles.DivIcon}>
          <div className={styles.leftIcon}>
            <Image
              src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Build_experience.svg"
              width="85"
              height="85"
              alt="Build_experience"
              layout="intrinsic"
              loading="lazy"
            />
            <Image
              layout="intrinsic"
              src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Line_icon.svg"
              alt="getHired_steps_in_Skillslash"
              className={styles.line2}
              width="4px"
              height="60px"
              loading="lazy"
            />
          </div>

          <div className={styles.rightIcon}>
            <h6 style={{ color: "#f28705" }}>Build Relevant Experience</h6>
            <p>
              Our mentors will guide you to select relevant domains based on
              your prior experience and work on live projects to build expertise
            </p>
          </div>
        </div>
        <div className={styles.DivIcon}>
          <div className={styles.leftIcon}>
            <Image
              src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/GetHired.svg"
              width="85"
              height="85"
              layout="intrinsic"
              loading="lazy"
              alt="GetHired"
            />
          </div>
          <div className={styles.rightIcon}>
            <h6>Get Hired</h6>
            <p>
              Leverage the acquired expertise and experience to interview for
              your targeted roles and clear them with confidence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
