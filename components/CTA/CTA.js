import React from "react";
import styles from "./Cta.module.css";
import { IoMdCall } from "react-icons/io";

const CTA = () => {
  return (
    <div className={styles.CtaWrapper}>
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
