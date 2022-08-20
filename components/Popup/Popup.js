import React, { useState, useEffect } from "react";
import styles from "./Popup.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Popup = (props) => {
  let color = "transparent";
  if (props.price) color = "white";
  useEffect(() => {
    if (props.trigger) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [props.trigger]);
  return props.trigger ? (
    <div className={styles.popup}>
      <div className={styles.outerLine}>
        <div
          className={
            props.downloadBrochure ? styles.popupInners : styles.popupInner
          }
        >
          {props.downloadBrochure ? (
            <AiOutlineCloseCircle
              className={styles.closeBtn}
              onClick={() => {
                props.setTrigger(false);
              }}
            />
          ) : (
            <AiOutlineCloseCircle
              className={styles.closeBtn}
              onClick={() => {
                props.setTrigger(false);
              }}
            />
          )}

          {props.children}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
