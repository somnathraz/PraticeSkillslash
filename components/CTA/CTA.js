import React, { useState, useEffect } from "react";
import styles from "./Cta.module.css";
import { IoMdCall } from "react-icons/io";
import Image from "next/image";

const CTA = () => {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    let width = window.innerWidth;
    if (width < 481) {
      setMobile(true);
    }
    if (width > 481) {
      setMobile(false);
    }
  }, []);
  return (
    <div className={styles.CtaWrapper}>
      <div className="bgWrap">
        {mobile ? (
          <Image
            alt="software"
            src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Mobile_CTA.webp"
            layout="fill"
            objectFit="contain"
            quality={100}
            loading="lazy"
          />
        ) : (
          <Image
            alt="software"
            src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Cta_Skillslash.webp"
            layout="fill"
            objectFit="cover"
            quality={100}
            loading="lazy"
          />
        )}
      </div>
      <div className={styles.leftCta}>
        <p className={styles.pTop}>For queries, feedback & assistance</p>
        <h4>Get Free Career Counselling</h4>
        <p className={styles.smallCTA}>(7AM -12 AM)</p>
        <p className={styles.desc}>For Working Professionals & Freshers</p>
        <a href="tel:+91-8391-911-911">
          <button>
            <IoMdCall className={styles.cIcon} />
            8391-911-911
          </button>
        </a>
      </div>
      <div className={styles.rightCta}></div>
    </div>
  );
};

export default CTA;
