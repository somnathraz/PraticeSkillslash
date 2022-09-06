import React, { useState, useEffect } from "react";

import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

import Link from "next/link";
import TabData from "./TabData";
import styles from "./Tabs.module.css";
import { AiOutlineCheck } from "react-icons/ai";
import { MdOutlineLocalFireDepartment, MdDataSaverOff } from "react-icons/md";
import { BsLaptop } from "react-icons/bs";
import { SiChainlink } from "react-icons/si";

const Tabs = () => {
  const [viewAll, setViewAll] = useState(true);
  const [oneYear, setOneYear] = useState(false);
  const [nonTech, setNonTech] = useState(false);
  const [manager, setManager] = useState(false);
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
    <div className={styles.wrapper}>
      <div className={styles.MenuTabs}>
        <div className={styles.leftPanel}>
          <>
            {mobile ? (
              <span
                key={TabData[0].id}
                id="0"
                onClick={() => {
                  setViewAll(true);
                  setOneYear(false);
                  setManager(false);
                  setNonTech(false);
                }}
                className={viewAll ? styles.spanActive : styles.span}
              >
                <span>
                  <MdOutlineLocalFireDepartment
                    className={
                      viewAll ? styles.ActiveSpanIcon : styles.spanIcon
                    }
                  />
                  {TabData[0].title}
                </span>

                <IoIosArrowDown />
              </span>
            ) : (
              <span
                key={TabData[0].id}
                id="0"
                onClick={() => {
                  setViewAll(true);
                  setOneYear(false);
                  setManager(false);
                  setNonTech(false);
                }}
                className={viewAll ? styles.spanActive : styles.span}
              >
                <span>
                  <MdOutlineLocalFireDepartment
                    className={
                      viewAll ? styles.ActiveSpanIcon : styles.spanIcon
                    }
                  />
                  {TabData[0].title}
                </span>
                <IoIosArrowForward />
              </span>
            )}

            {viewAll ? (
              <div className={styles.gridWrap}>
                <Link href="/advanced-data-science-and-ai-course-with-real-work-experience">
                  <div className={styles.gridBox}>
                    <div className={styles.gridImg}>
                      <img
                        src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/data_science_banner.webp"
                        className={styles.gridBanner}
                        alt="data-science-course"
                      />
                    </div>

                    <div className={styles.gridInnerBox}>
                      <h4>Advanced Data Science and AI Course</h4>
                      <div className={styles.lines}></div>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />9 Months
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        15+ Industry Projects
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        EMI @INR 5801/month
                      </span>
                      <div className={styles.line}></div>
                      <Link href="/advanced-data-science-and-ai-course-with-real-work-experience">
                        <button className={styles.gridBtn}>View Program</button>
                      </Link>
                    </div>
                  </div>
                </Link>
                <Link href="/business-analytics-course">
                  <div className={styles.gridBox}>
                    <div className={styles.gridImg}>
                      <img
                        src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Business_analytics_course_banner.webp"
                        className={styles.gridBanner}
                        loading="lazy"
                        alt="Business-analytics-course"
                      />
                    </div>
                    <div className={styles.gridInnerBox}>
                      <h4>Business Analytics Program For Professionals</h4>
                      <div className={styles.lines}></div>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />8 Months
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        10+ Industry Projects
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        EMI @INR 5408/month
                      </span>
                      <div className={styles.line}></div>
                      <Link href="/business-analytics-course">
                        <button className={styles.gridBtn}>View Program</button>
                      </Link>
                    </div>
                  </div>
                </Link>
                <Link href="/full-stack-developer-course">
                  <div className={styles.gridBox}>
                    <div className={styles.gridImg}>
                      <img
                        src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Full_stack_banner.webp"
                        className={styles.gridBanner}
                        loading="lazy"
                        alt="Full-stack-course"
                      />
                    </div>
                    <div className={styles.gridInnerBox}>
                      <h4>Full Stack Developer Course With Certification</h4>
                      <div className={styles.lines}></div>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />8 Months
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        5+ Industry Projects
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        EMI @INR 7916/month
                      </span>
                      <div className={styles.line}></div>
                      <Link href="/full-stack-developer-course">
                        <button className={styles.gridBtn}>View Program</button>
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              ""
            )}
            {mobile ? (
              <span
                key={TabData[1].id}
                id="1"
                onClick={() => {
                  setOneYear(true);
                  setViewAll(false);
                  setManager(false);
                  setNonTech(false);
                }}
                className={oneYear ? styles.spanActive : styles.span}
              >
                <span>
                  <MdOutlineLocalFireDepartment
                    className={
                      oneYear ? styles.ActiveSpanIcon : styles.spanIcon
                    }
                  />
                  {TabData[1].title}
                </span>
                <IoIosArrowDown />
              </span>
            ) : (
              <span
                key={TabData[1].id}
                id="1"
                onClick={() => {
                  setOneYear(true);
                  setViewAll(false);
                  setManager(false);
                  setNonTech(false);
                }}
                className={oneYear ? styles.spanActive : styles.span}
              >
                <span>
                  <MdDataSaverOff
                    className={
                      oneYear ? styles.ActiveSpanIcon : styles.spanIcon
                    }
                  />
                  {TabData[1].title}
                </span>

                <IoIosArrowForward />
              </span>
            )}
            {oneYear ? (
              <div className={styles.gridWrap}>
                <Link href="/advanced-data-science-and-ai-course-with-real-work-experience">
                  <div className={styles.gridBox}>
                    <div className={styles.gridImg}>
                      <img
                        src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/data_science_banner.webp"
                        className={styles.gridBanner}
                        alt="Data-science-course"
                      />
                    </div>

                    <div className={styles.gridInnerBox}>
                      <h4>Advanced Data Science and AI Course</h4>
                      <div className={styles.lines}></div>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />9 Months
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        15+ Industry Projects
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        EMI @INR 5801/month
                      </span>
                      <div className={styles.line}></div>
                      <Link href="/advanced-data-science-and-ai-course-with-real-work-experience">
                        <button className={styles.gridBtn}>View Program</button>
                      </Link>
                    </div>
                  </div>
                </Link>
                <Link href="/business-analytics-course">
                  <div className={styles.gridBox}>
                    <div className={styles.gridImg}>
                      <img
                        src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Business_analytics_course_banner.webp"
                        className={styles.gridBanner}
                        loading="lazy"
                        alt="Business-analytics-course"
                      />
                    </div>
                    <div className={styles.gridInnerBox}>
                      <h4>Business Analytics Program For Professionals</h4>
                      <div className={styles.lines}></div>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />8 Months
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        10+ Industry Projects
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        EMI @INR 5408/month
                      </span>
                      <div className={styles.line}></div>
                      <Link href="/business-analytics-course">
                        <button className={styles.gridBtn}>View Program</button>
                      </Link>
                    </div>
                  </div>
                </Link>
                <Link href="/full-stack-developer-course">
                  <div className={styles.gridBox}>
                    <div className={styles.gridImg}>
                      <img
                        src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Full_stack_banner.webp"
                        loading="lazy"
                        className={styles.gridBanner}
                        alt="Full-stack-course"
                      />
                    </div>
                    <div className={styles.gridInnerBox}>
                      <h4>Full Stack Developer Course With Certification</h4>
                      <div className={styles.lines}></div>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />8 Months
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        5+ Industry Projects
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        EMI @INR 7916/month
                      </span>
                      <div className={styles.line}></div>
                      <Link href="/full-stack-developer-course">
                        <button className={styles.gridBtn}>View Program</button>
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              ""
            )}
            {mobile ? (
              <span
                key={TabData[2].id}
                id="2"
                onClick={() => {
                  setOneYear(false);
                  setViewAll(false);
                  setManager(false);
                  setNonTech(true);
                }}
                className={nonTech ? styles.spanActive : styles.span}
              >
                <span>
                  <BsLaptop
                    className={
                      nonTech ? styles.ActiveSpanIcon : styles.spanIcon
                    }
                  />
                  {TabData[2].title}
                </span>
                <IoIosArrowDown />
              </span>
            ) : (
              <span
                key={TabData[2].id}
                id="2"
                onClick={() => {
                  setOneYear(false);
                  setViewAll(false);
                  setManager(false);
                  setNonTech(true);
                }}
                className={nonTech ? styles.spanActive : styles.span}
              >
                <span>
                  <BsLaptop
                    className={
                      nonTech ? styles.ActiveSpanIcon : styles.spanIcon
                    }
                  />
                  {TabData[2].title}
                </span>

                <IoIosArrowForward />
              </span>
            )}

            {nonTech ? (
              <div className={styles.gridWrap}>
                <Link href="/full-stack-developer-course">
                  <div className={styles.gridBox}>
                    <div className={styles.gridImg}>
                      <img
                        src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Full_stack_banner.webp"
                        className={styles.gridBanner}
                        loading="lazy"
                        alt="Full-stack-course"
                      />
                    </div>
                    <div className={styles.gridInnerBox}>
                      <h4>Full Stack Developer Course With Certification</h4>
                      <div className={styles.lines}></div>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />8 Months
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        5+ Industry Projects
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        EMI @INR 7916/month
                      </span>
                      <div className={styles.line}></div>
                      <Link href="/full-stack-developer-course">
                        <button className={styles.gridBtn}>View Program</button>
                      </Link>
                    </div>
                  </div>
                </Link>
                <div className={styles.gridBox}></div>
                <div className={styles.gridBox}></div>
              </div>
            ) : (
              ""
            )}
            {mobile ? (
              <span
                key={TabData[3].id}
                id="2"
                onClick={() => {
                  setOneYear(false);
                  setViewAll(false);
                  setManager(true);
                  setNonTech(false);
                }}
                className={manager ? styles.spanActive : styles.span}
              >
                <span>
                  <SiChainlink
                    className={
                      manager ? styles.ActiveSpanIcon : styles.spanIcon
                    }
                  />
                  {TabData[3].title}
                </span>

                <IoIosArrowDown />
              </span>
            ) : (
              <span
                key={TabData[3].id}
                id="2"
                onClick={() => {
                  setOneYear(false);
                  setViewAll(false);
                  setManager(true);
                  setNonTech(false);
                }}
                className={manager ? styles.spanActive : styles.span}
              >
                <span>
                  <SiChainlink
                    className={
                      manager ? styles.ActiveSpanIcon : styles.spanIcon
                    }
                  />
                  {TabData[3].title}
                </span>
                <IoIosArrowForward />
              </span>
            )}
            {manager ? (
              <div className={styles.gridWrap}>
                <Link href="/block-chain-course">
                  <div className={styles.gridBox}>
                    <div className={styles.gridImg}>
                      <img
                        src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Block_chain_course-Banner.webp"
                        className={styles.gridBanner}
                        alt="Block-chain-course"
                      />
                    </div>
                    <div className={styles.gridInnerBox}>
                      <h4>Blockchain program and certification</h4>
                      <div className={styles.lines}></div>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />5 Months
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        8+ Industry Projects
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        EMI @INR 5801/month
                      </span>
                      <div className={styles.line}></div>
                      <Link href="/block-chain-course">
                        <button className={styles.gridBtn}>View Program</button>
                      </Link>
                    </div>
                  </div>
                </Link>
                <div className={styles.gridBox}></div>
                <div className={styles.gridBox}></div>
              </div>
            ) : (
              ""
            )}
          </>
        </div>
        {mobile ? (
          ""
        ) : (
          <div className={styles.middlePanel}>
            {viewAll ? (
              <div className={styles.gridWrap}>
                <Link href="/advanced-data-science-and-ai-course-with-real-work-experience">
                  <div className={styles.gridBox}>
                    <div className={styles.gridImg}>
                      <img
                        src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/data_science_banner.webp"
                        className={styles.gridBanner}
                        alt="data-science-course"
                      />
                    </div>

                    <div className={styles.gridInnerBox}>
                      <h4>Advanced Data Science and AI Course</h4>
                      <div className={styles.lines}></div>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />9 Months
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        15+ Industry Projects
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        EMI @INR 5801/month
                      </span>
                      <div className={styles.line}></div>
                      <Link href="/advanced-data-science-and-ai-course-with-real-work-experience">
                        <button className={styles.gridBtn}>View Program</button>
                      </Link>
                    </div>
                  </div>
                </Link>
                <Link href="/business-analytics-course">
                  <div className={styles.gridBox}>
                    <div className={styles.gridImg}>
                      <img
                        src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Business_analytics_course_banner.webp"
                        className={styles.gridBanner}
                        loading="lazy"
                        alt="Business-analytics-course"
                      />
                    </div>
                    <div className={styles.gridInnerBox}>
                      <h4>Business Analytics Program For Professionals</h4>
                      <div className={styles.lines}></div>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />8 Months
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        10+ Industry Projects
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        EMI @INR 5408/month
                      </span>
                      <div className={styles.line}></div>
                      <Link href="/business-analytics-course">
                        <button className={styles.gridBtn}>View Program</button>
                      </Link>
                    </div>
                  </div>
                </Link>
                <Link href="/full-stack-developer-course">
                  <div className={styles.gridBox}>
                    <div className={styles.gridImg}>
                      <img
                        src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Full_stack_banner.webp"
                        className={styles.gridBanner}
                        loading="lazy"
                        alt="Full-stack-course"
                      />
                    </div>
                    <div className={styles.gridInnerBox}>
                      <h4>Full Stack Developer Course With Certification</h4>
                      <div className={styles.lines}></div>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />8 Months
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        5+ Industry Projects
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        EMI @INR 7916/month
                      </span>
                      <div className={styles.line}></div>
                      <Link href="/full-stack-developer-course">
                        <button className={styles.gridBtn}>View Program</button>
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              ""
            )}
            {oneYear ? (
              <div className={styles.gridWrap}>
                <Link href="/advanced-data-science-and-ai-course-with-real-work-experience">
                  <div className={styles.gridBox}>
                    <div className={styles.gridImg}>
                      <img
                        src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/data_science_banner.webp"
                        className={styles.gridBanner}
                        alt="Data-science-course"
                      />
                    </div>

                    <div className={styles.gridInnerBox}>
                      <h4>Advanced Data Science and AI Course</h4>
                      <div className={styles.lines}></div>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />9 Months
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        15+ Industry Projects
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        EMI @INR 5801/month
                      </span>
                      <div className={styles.line}></div>
                      <Link href="/advanced-data-science-and-ai-course-with-real-work-experience">
                        <button className={styles.gridBtn}>View Program</button>
                      </Link>
                    </div>
                  </div>
                </Link>
                <Link href="/business-analytics-course">
                  <div className={styles.gridBox}>
                    <div className={styles.gridImg}>
                      <img
                        src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Business_analytics_course_banner.webp"
                        className={styles.gridBanner}
                        loading="lazy"
                        alt="Business-analytics-course"
                      />
                    </div>
                    <div className={styles.gridInnerBox}>
                      <h4>Business Analytics Program For Professionals</h4>
                      <div className={styles.lines}></div>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />8 Months
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        10+ Industry Projects
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        EMI @INR 5408/month
                      </span>
                      <div className={styles.line}></div>
                      <Link href="/business-analytics-course">
                        <button className={styles.gridBtn}>View Program</button>
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              ""
            )}
            {nonTech ? (
              <div className={styles.gridWrap}>
                <Link href="/full-stack-developer-course">
                  <div className={styles.gridBox}>
                    <div className={styles.gridImg}>
                      <img
                        src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Full_stack_banner.webp"
                        className={styles.gridBanner}
                        loading="lazy"
                        alt="Full-stack-course"
                      />
                    </div>
                    <div className={styles.gridInnerBox}>
                      <h4>Full Stack Developer Course With Certification</h4>
                      <div className={styles.lines}></div>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />8 Months
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        5+ Industry Projects
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        EMI @INR 7916/month
                      </span>
                      <div className={styles.line}></div>
                      <Link href="/full-stack-developer-course">
                        <button className={styles.gridBtn}>View Program</button>
                      </Link>
                    </div>
                  </div>
                </Link>
                <div className={styles.gridBox}></div>
                <div className={styles.gridBox}></div>
              </div>
            ) : (
              ""
            )}
            {manager ? (
              <div className={styles.gridWrap}>
                <Link href="/block-chain-course">
                  <div className={styles.gridBox}>
                    <div className={styles.gridImg}>
                      <img
                        src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Block_chain_course-Banner.webp"
                        className={styles.gridBanner}
                        alt="Block-chain-course"
                      />
                    </div>
                    <div className={styles.gridInnerBox}>
                      <h4>Blockchain program and certification</h4>
                      <div className={styles.lines}></div>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />5 Months
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        8+ Industry Projects
                      </span>
                      <span>
                        <AiOutlineCheck className={styles.gridIcon} />
                        EMI @INR 5801/month
                      </span>
                      <div className={styles.line}></div>
                      <Link href="/block-chain-course">
                        <button className={styles.gridBtn}>View Program</button>
                      </Link>
                    </div>
                  </div>
                </Link>
                <div className={styles.gridBox}></div>
                <div className={styles.gridBox}></div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
