import React, { useState, useEffect } from "react";
import styles from "./GetHired.module.css";
import Image from "next/image";

const GetHired = () => {
  const [mobile, setMobile] = useState(false);
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
    <section className={styles.GetHired}>
      <div className={styles.CInner}>
        <h4>Get Hired</h4>
        <p className="pBot">Work on live projects to get hired at:</p>
      </div>
      <div className={styles.imageBox}>
        <div className={styles.left}>
          <div className={styles.top}>
            <p>Maximum Salary Hike</p>
            <h5>350%</h5>
          </div>
          <div className={styles.middle}>
            <p>Average Salary Hike</p>
            <h5>170%</h5>
          </div>
          <div className={styles.bottom}>
            <p>Hiring Partners</p>
            <h5>400+</h5>
          </div>
        </div>
        <div className={styles.right}>
          {mobile ? (
            <Image
              src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Companies_Mobile.webp"
              alt="get Hired at Top MNc's"
              width="800"
              height="700"
              loading="lazy"
            />
          ) : (
            <Image
              src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Hiring-partners-Companies.webp"
              alt="get Hired at Top MNc's"
              width="800"
              height="500"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default GetHired;
