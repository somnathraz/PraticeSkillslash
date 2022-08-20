import React, { useState, useEffect } from "react";
import { useInterval } from "react-use";
import styles from "./TextAnimation.module.css";

const TextAnimation = () => {
  const reactArray = "4 Millions+ Learners".split("");
  const swiftArray = "100% Job Guarantee".split("");

  const [items, setItems] = useState(reactArray);
  const [count, setCount] = useState(0);
  const [play, setPlay] = useState(false);
  useInterval(
    () => {
      setItems(reactArray);
      setCount(count + 1);

      if (count == 1) {
        setCount(0);
        setItems(swiftArray);
      }
    },
    play ? 6000 : null
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(swiftArray);
      setPlay(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className={styles.span}>
      <span>{items}</span>
    </span>
  );
};

export default TextAnimation;
