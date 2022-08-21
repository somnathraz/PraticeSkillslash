import React, { useState, useEffect } from "react";
import styles from "./MegaMenu.module.css";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { MdOutlineLocalFireDepartment, MdDataSaverOff } from "react-icons/md";
import Image from "next/image";
import { BsLaptop, BsDot } from "react-icons/bs";

import { SiChainlink } from "react-icons/si";

const MegaMenu = ({ handleIcon }) => {
  const [popular, setPopular] = useState(true);
  const [DataScience, setDataScience] = useState(false);
  const [software, setSoftware] = useState(false);
  const [blockchain, setBlockchain] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    let width = window.innerWidth;

    if (width < 481) {
      setMobile(true);
    }
    if (width > 481) {
      setMobile(false);
    }
  }, [mobile]);
  return (
    <div className={styles.MegaMenu}>
      <div className={styles.leftSideMenu}>
        <h6>Browse by Domain</h6>
        {mobile ? (
          <>
            <span
              className={popular ? styles.activeSpan : styles.normalSpan}
              onClick={() => {
                setPopular(true);
                setDataScience(false);
                setSoftware(false);
                setBlockchain(false);
              }}
            >
              <div className={styles.innerSpan}>
                <MdOutlineLocalFireDepartment className={styles.MenuIcon} />
                Popular Courses
              </div>
              <IoIosArrowDown />
            </span>
            {popular ? (
              <div className={styles.gridPanel}>
                <div
                  className={styles.mInnerBox}
                  onClick={() => handleIcon(false)}
                >
                  <a href="http://skillslash.com/advanced-data-science-and-ai-course-with-real-work-experience">
                    <div className={styles.mInnerBoxDiv}>
                      <h5>Advance Data science and AI course</h5>
                      <span>
                        <div>9 Months</div>
                        <BsDot className={styles.dot} />
                        <div>Live Classes</div>
                      </span>
                    </div>
                  </a>
                </div>
                <a href="http://skillslash.com/full-stack-developer-course">
                  <div
                    className={styles.mInnerBox}
                    onClick={() => handleIcon(false)}
                  >
                    <div className={styles.mInnerBoxDiv}>
                      <h5>Full Stack Developer course with certification</h5>
                      <span>
                        <div>8 Months</div>
                        <BsDot className={styles.dot} />
                        <div>Live Classes</div>
                      </span>
                    </div>
                  </div>
                </a>
                <a href="http://skillslash.com/business-analytics-course">
                  <div
                    className={styles.mInnerBox}
                    onClick={() => handleIcon(false)}
                  >
                    <div className={styles.mInnerBoxDiv}>
                      <h5>Business Analytics program for professionals</h5>
                      <span>
                        <div>8 Months</div>
                        <BsDot className={styles.dot} />
                        <div>Live Classes</div>
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <span
            className={popular ? styles.activeSpan : styles.normalSpan}
            onClick={() => {
              setPopular(true);
              setDataScience(false);
              setSoftware(false);
              setBlockchain(false);
            }}
          >
            <div className={styles.innerSpan}>
              <MdOutlineLocalFireDepartment className={styles.MenuIcon} />
              Popular Courses
            </div>
            <IoIosArrowForward />
          </span>
        )}
        {mobile ? (
          <>
            <span
              className={DataScience ? styles.activeSpan : styles.normalSpan}
              onClick={() => {
                setPopular(false);
                setDataScience(true);
                setSoftware(false);
                setBlockchain(false);
              }}
            >
              <div className={styles.innerSpan}>
                <MdDataSaverOff className={styles.MenuIcon} />
                <div>Data science and AI</div>
              </div>
              <IoIosArrowDown />
            </span>
            {DataScience ? (
              <div className={styles.gridPanel}>
                <a
                  href="http://skillslash.com/advanced-data-science-and-ai-course-with-real-work-experience"
                  onClick={() => handleIcon(false)}
                >
                  <div className={styles.mInnerBox}>
                    <div className={styles.mInnerBoxDiv}>
                      <h5>Advance Data science and AI course</h5>
                      <span>
                        <div>9 Months</div>
                        <BsDot className={styles.dot} />
                        <div>Live Classes</div>
                      </span>
                    </div>
                  </div>
                </a>
                <a
                  href="http://skillslash.com/business-analytics-course"
                  onClick={() => handleIcon(false)}
                >
                  <div className={styles.mInnerBox}>
                    <div className={styles.mInnerBoxDiv}>
                      <h5>Business Analytics program for professionals</h5>
                      <span>
                        <div>8 Months</div>
                        <BsDot className={styles.dot} />
                        <div>Live Classes</div>
                      </span>
                    </div>
                  </div>
                </a>
                <a
                  href="http://skillslash.com/data-engineering-course"
                  onClick={() => handleIcon(false)}
                >
                  <div className={styles.mInnerBox}>
                    <div className={styles.mInnerBoxDiv}>
                      <h5>Data Engineering Course with Industry Experience</h5>
                      <span>
                        <div>8 Months</div>
                        <BsDot className={styles.dot} />
                        <div>Live Classes</div>
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <span
            className={DataScience ? styles.activeSpan : styles.normalSpan}
            onClick={() => {
              setPopular(false);
              setDataScience(true);
              setSoftware(false);
              setBlockchain(false);
            }}
          >
            <div className={styles.innerSpan}>
              <MdDataSaverOff className={styles.MenuIcon} />
              <div>Data science and AI</div>
            </div>
            <IoIosArrowForward />
          </span>
        )}
        {mobile ? (
          <>
            <span
              className={software ? styles.activeSpan : styles.normalSpan}
              onClick={() => {
                setPopular(false);
                setDataScience(false);
                setSoftware(true);
                setBlockchain(false);
              }}
            >
              <div className={styles.innerSpan}>
                <BsLaptop className={styles.MenuIcon} />
                Software Development
              </div>
              <IoIosArrowDown />
            </span>
            {software ? (
              <div className={styles.gridPanel}>
                <a href="http://skillslash.com/full-stack-developer-course">
                  <div
                    className={styles.mInnerBox}
                    onClick={() => handleIcon(false)}
                  >
                    <div className={styles.mInnerBoxDiv}>
                      <h5>Full Stack Developer course with certification</h5>
                      <span>
                        <div>9 Months</div>
                        <BsDot className={styles.dot} />
                        <div>Live Classes</div>
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <span
            className={software ? styles.activeSpan : styles.normalSpan}
            onClick={() => {
              setPopular(false);
              setDataScience(false);
              setSoftware(true);
              setBlockchain(false);
            }}
          >
            <div className={styles.innerSpan}>
              <BsLaptop className={styles.MenuIcon} />
              Software Development
            </div>
            <IoIosArrowForward />
          </span>
        )}
        {mobile ? (
          <>
            <span
              className={blockchain ? styles.activeSpan : styles.normalSpan}
              onClick={() => {
                setPopular(false);
                setDataScience(false);
                setSoftware(false);
                setBlockchain(true);
              }}
            >
              <div className={styles.innerSpan}>
                <SiChainlink className={styles.MenuIcon} />
                Block Chain
              </div>
              <IoIosArrowDown />
            </span>
            {blockchain ? (
              <div className={styles.gridPanel}>
                <a href="http://skillslash.com/block-chain-course">
                  <div
                    className={styles.mInnerBox}
                    onClick={() => handleIcon(false)}
                  >
                    <div className={styles.mInnerBoxDiv}>
                      <h5>Blockchain program and certification</h5>
                      <span>
                        <div>9 Months</div>
                        <BsDot className={styles.dot} />
                        <div>Live Classes</div>
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <span
            className={blockchain ? styles.activeSpan : styles.normalSpan}
            onClick={() => {
              setPopular(false);
              setDataScience(false);
              setSoftware(false);
              setBlockchain(true);
            }}
          >
            <div className={styles.innerSpan}>
              <SiChainlink className={styles.MenuIcon} />
              Block Chain
            </div>
            <IoIosArrowForward />
          </span>
        )}
      </div>
      <div className={styles.MiddleMenu}>
        <h6>Learn from top experts</h6>
        {popular ? (
          <div className={styles.gridPanel}>
            <a href="http://skillslash.com/advanced-data-science-and-ai-course-with-real-work-experience">
              <div
                className={styles.mInnerBox}
                onClick={() => handleIcon(false)}
              >
                <div className={styles.mInnerBoxDiv}>
                  <h5>Advance Data science and AI course</h5>
                  <span>
                    <div>9 Months</div>
                    <BsDot className={styles.dot} />
                    <div>Live Classes</div>
                  </span>
                </div>
              </div>
            </a>
            <a href="http://skillslash.com/full-stack-developer-course">
              <div
                className={styles.mInnerBox}
                onClick={() => handleIcon(false)}
              >
                <div className={styles.mInnerBoxDiv}>
                  <h5>Full Stack Developer course with certification</h5>
                  <span>
                    <div>8 Months</div>
                    <BsDot className={styles.dot} />
                    <div>Live Classes</div>
                  </span>
                </div>
              </div>
            </a>
            <a href="http://skillslash.com/business-analytics-course">
              <div
                className={styles.mInnerBox}
                onClick={() => handleIcon(false)}
              >
                <div className={styles.mInnerBoxDiv}>
                  <h5>Business Analytics program for professionals</h5>
                  <span>
                    <div>8 Months</div>
                    <BsDot className={styles.dot} />
                    <div>Live Classes</div>
                  </span>
                </div>
              </div>
            </a>
          </div>
        ) : (
          ""
        )}
        {DataScience ? (
          <div className={styles.gridPanel}>
            <a href="http://skillslash.com/advanced-data-science-and-ai-course-with-real-work-experience">
              <div className={styles.mInnerBox}>
                <div
                  className={styles.mInnerBoxDiv}
                  onClick={() => handleIcon(false)}
                >
                  <h5>Advance Data science and AI course</h5>
                  <span>
                    <div>9 Months</div>
                    <BsDot className={styles.dot} />
                    <div>Live Classes</div>
                  </span>
                </div>
              </div>
            </a>
            <a href="http://skillslash.com/business-analytics-course">
              <div
                className={styles.mInnerBox}
                onClick={() => handleIcon(false)}
              >
                <div className={styles.mInnerBoxDiv}>
                  <h5>Business Analytics program for professionals</h5>
                  <span>
                    <div>8 Months</div>
                    <BsDot className={styles.dot} />
                    <div>Live Classes</div>
                  </span>
                </div>
              </div>
            </a>
            <a href="http://skillslash.com/data-engineering-course">
              <div
                className={styles.mInnerBox}
                onClick={() => handleIcon(false)}
              >
                <div className={styles.mInnerBoxDiv}>
                  <h5>Data Engineering Course with Industry Experience</h5>
                  <span>
                    <div>8 Months</div>
                    <BsDot className={styles.dot} />
                    <div>Live Classes</div>
                  </span>
                </div>
              </div>
            </a>
          </div>
        ) : (
          ""
        )}
        {software ? (
          <div className={styles.gridPanel}>
            <a href="http://skillslash.com/full-stack-developer-course">
              <div
                className={styles.mInnerBox}
                onClick={() => handleIcon(false)}
              >
                <div className={styles.mInnerBoxDiv}>
                  <h5>Full Stack Developer course with certification</h5>
                  <span>
                    <div>9 Months</div>
                    <BsDot className={styles.dot} />
                    <div>Live Classes</div>
                  </span>
                </div>
              </div>
            </a>
          </div>
        ) : (
          ""
        )}
        {blockchain ? (
          <div className={styles.gridPanel}>
            <a href="http://skillslash.com/block-chain-course">
              <div
                className={styles.mInnerBox}
                onClick={() => handleIcon(false)}
              >
                <div className={styles.mInnerBoxDiv}>
                  <h5>Blockchain program and certification</h5>
                  <span>
                    <div>9 Months</div>
                    <BsDot className={styles.dot} />
                    <div>Live Classes</div>
                  </span>
                </div>
              </div>
            </a>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className={styles.rightSideMenu}>
        <h6>Our Flagship Program</h6>
        <a href="http://skillslash.com/advanced-data-science-and-ai-course-with-real-work-experience">
          <div className={styles.flagB} onClick={() => handleIcon(false)}>
            <div className={styles.left}>
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Reward_icon.svg"
                width="30"
                height="30"
                layout="intrinsic"
                loading="lazy"
                alt="reward"
              />
            </div>
            <div className={styles.right}>
              <h5>AI and ML program</h5>
              <p>Get a detailed overview</p>
            </div>
          </div>
        </a>
        <div className={styles.banner} onClick={() => handleIcon(false)}>
          <Image
            src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Nav_banner.webp"
            width="234"
            height="248"
            layout="intrinsic"
            loading="lazy"
            alt="data-science-course"
          />

          <button className={styles.NavBtn}>START FOR FREE</button>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
