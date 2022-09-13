import React, { useState, useEffect } from "react";
import styles from "./Toast.module.css";
import { AiFillCheckCircle, AiOutlineClose } from "react-icons/ai";
const Toast = ({ content }) => {
  const [show, setShow] = useState(true);
  const [redirectSeconds, setRedirectSeconds] = useState(4);
  useEffect(() => {
    setTimeout(() => {
      const interval = setInterval(() => {
        console.log(redirectSeconds);
        if (redirectSeconds > 0) {
          setRedirectSeconds(redirectSeconds - 1);
        } else {
          clearInterval(interval);
          setShow(false);
        }
      }, 1000);
    }, 1000);
  }, [redirectSeconds]);
  return show ? (
    <div className={styles.Toast}>
      <div className={styles.toastInner}>
        <div className={styles.IconBack}>
          <AiFillCheckCircle className={styles.icon} />
        </div>
        <p>{content}</p>
        <AiOutlineClose
          className={styles.cross}
          onClick={() => setShow(false)}
        />
      </div>
    </div>
  ) : (
    ""
  );
};

export default Toast;
