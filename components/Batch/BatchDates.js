import React, { useState, useEffect } from "react";
import styles from "./BatchDates.module.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import Popup from "../Popup/Popup";
import Form from "../Form/Form";

const BatchDates = ({
  batchDetails,
  dataScience,
  redirectDs,
  redirectBa,
  redirectBl,
  redirectDe,
  redirectFs,
  redirectWeb,
}) => {
  const [popups, setPopups] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    let width = window.innerWidth;
    if (width < 641) {
      setMobile(true);
    }
  }, [mobile]);
  const popupShow = () => {
    setPopups(true);
  };

  return (
    <div className={styles.BatchDates}>
      <Popup trigger={popups} setTrigger={setPopups} className="popupModal">
        <div className="leftPopup">
          <div className="whiteP" />
        </div>
        <div className="RightPopup">
          <h5>Apply For Counselling</h5>
          <p>Fill the below Details to get started</p>
          <Form
            popup={true}
            setTrigger={setPopups}
            dataScience={dataScience}
            redirectDs={redirectDs}
            redirectFs={redirectFs}
            redirectBa={redirectBa}
            redirectBl={redirectBl}
            redirectDe={redirectDe}
            redirectWeb={redirectWeb}
          />
        </div>
      </Popup>
      <h4 className={styles.MHeading}>Next cohorts Dates</h4>

      {batchDetails === "" ? (
        <p>Batch Date will be updated soon!</p>
      ) : (
        batchDetails.map((data, i) => {
          const startTime = data.batchStartTime.split(" ");
          const endTime = data.batchEndTime.split(" ");
          return (
            <div
              className={
                data.activeBatch
                  ? styles.batchDateWrapActive
                  : styles.batchDateWrap
              }
              key={i}
            >
              <div className={styles.dateWrap}>
                <div
                  className={data.activeBatch ? styles.dateActive : styles.date}
                >
                  <span className={styles.month}>{data.batchMonth}</span>
                  <p>{data.batchDate}</p>
                  <span className={styles.tag}>{data.batchStatus}</span>
                </div>
              </div>
              <div className={styles.batchDetailsWrap}>
                <div className={styles.batchDetails}>
                  <h5>
                    {data.batchType}
                    {startTime[0]} to {endTime[0]}
                  </h5>
                  {data.activeBatch ? (
                    <p className={styles.desc}>{data.batchDesc} </p>
                  ) : (
                    <p className={styles.desc}>{data.batchDesc} </p>
                  )}

                  <div className={styles.batchDetailsMobile}>
                    <span className={styles.batchTypeMobile}>
                      <AiOutlineCalendar className={styles.spanIcon} />
                      <p className={styles.batchTypeName}>{data.batchWeek}</p>
                    </span>
                    <span className={styles.batchFilledMobile}>
                      <MdDoneAll className={styles.spanIcon} />
                      <p className={styles.status}>{data.batchMsg}</p>
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.batchInfo}>
                <div className={styles.batchStatus}>
                  <span
                    className={
                      data.activeBatch ? styles.activeBatch : styles.batchType
                    }
                  >
                    <AiOutlineCalendar
                      className={
                        data.activeBatch ? styles.spanIconA : styles.spanIcon
                      }
                    />

                    <p className={styles.batchTypeName}>{data.batchWeek}</p>
                  </span>
                </div>
                <div className={styles.batchStatus}>
                  <span
                    className={
                      data.activeBatch ? styles.activeBatch : styles.batchFilled
                    }
                  >
                    <MdDoneAll
                      className={
                        data.activeBatch ? styles.spanIconA : styles.spanIcon
                      }
                    />
                    <p className={styles.status}>{data.batchMsg}</p>
                  </span>
                </div>
              </div>
              <div className={styles.enrollWrap}>
                <div className={styles.batchEnroll}>
                  <button
                    className={
                      data.activeBatch ? styles.activeButton : styles.button
                    }
                    onClick={popupShow}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
      {/* <div className={styles.batchDateWrap}>
        <div className={styles.dateWrap}>
          <div className={styles.date}>
            <span className={styles.month}>AUG</span>
            <p>09</p>
            <span className={styles.tag}>Filled</span>
          </div>
        </div>
        <div className={styles.batchDetailsWrap}>
          <div className={styles.batchDetails}>
            <h5>Morning Batch, 08:00 to 10:00</h5>
            <p className={styles.desc}>
              Enrollment for this batch are no longer accepted
            </p>
            <div className={styles.batchDetailsMobile}>
              <span className={styles.batchTypeMobile}>
                <AiOutlineCalendar className={styles.spanIcon} />
                <p className={styles.batchTypeName}>
                  weekday batch (Mon - Fri)
                </p>
              </span>
              <span className={styles.batchFilledMobile}>
                <MdDoneAll className={styles.spanIcon} />
                <p className={styles.status}>All Seats are filled up</p>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.batchInfo}>
          <div className={styles.batchStatus}>
            <span className={styles.batchType}>
              <AiOutlineCalendar className={styles.spanIcon} />
              <p className={styles.batchTypeName}>weekday batch (Mon - Fri)</p>
            </span>
          </div>
          <div className={styles.batchStatus}>
            <span className={styles.batchFilled}>
              <MdDoneAll className={styles.spanIcon} />
              <p className={styles.status}>All Seats are filled up</p>
            </span>
          </div>
        </div>
        <div className={styles.enrollWrap}>
          <div className={styles.batchEnroll}>
            <button className={styles.button}>Enroll Now</button>
          </div>
        </div>
      </div>
      <div className={styles.batchDateWrapActive}>
        <div className={styles.dateWrap}>
          <div className={styles.dateActive}>
            <span className={styles.month}>AUG</span>
            <p>09</p>
            <span className={styles.tag}>New</span>
          </div>
        </div>
        <div className={styles.batchDetailsWrap}>
          <div className={styles.batchDetails}>
            <h5>Morning Batch, 08:00 to 10:00</h5>
            <p className={styles.desc}>
              Limited seats are available{" "}
              <span className={styles.red}> Hurry!</span>
            </p>
            <div className={styles.batchDetailsMobile}>
              <span className={styles.batchTypeMobile}>
                <AiOutlineCalendar className={styles.spanIcon} />
                <p className={styles.batchTypeName}>
                  weekday batch (Mon - Fri)
                </p>
              </span>
              <span className={styles.batchFilledMobile}>
                <MdDoneAll className={styles.spanIcon} />
                <p className={styles.status}>seats are partially filled</p>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.batchInfo}>
          <div className={styles.batchStatus}>
            <span>
              <AiOutlineCalendar className={styles.spanIconA} />
              <p className={styles.batchTypeName}>weekday batch (Mon - Fri)</p>
            </span>
          </div>
          <div className={styles.batchStatus}>
            <span className={styles.activeBatch}>
              <MdDoneAll className={styles.spanIconA} />
              <p className={styles.status}>Seats are partially filled</p>
            </span>
          </div>
        </div>
        <div className={styles.enrollWrap}>
          <div className={styles.batchEnroll}>
            <button className={styles.activeButton}>Enroll Now</button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BatchDates;
