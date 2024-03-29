import React, { useState } from "react";
import styles from "./Syllabus.module.css";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineLiveTv,
  MdOutlineLaptopMac,
} from "react-icons/md";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineFieldTime,
} from "react-icons/ai";
import Form from "../../Form/Form";
import { BsFillCircleFill } from "react-icons/bs";

import { AiOutlineDownload } from "react-icons/ai";
import Popup from "../../Popup/Popup";

function DataScienceSyllabus({
  syllabus,
  syllabusDesc,
  popupHead,
  dataScience,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectBl,
}) {
  const [popups, setPopups] = useState(false);

  const popupShow = () => {
    setPopups(true);
  };
  const [state, setState] = useState(syllabus);

  const handleChange = (index) => {
    setState(
      state.map((faq, i) => {
        if (i === index) {
          faq.Module0.open = !faq.Module0.open;
        } else {
          faq.Module0.open = false;
        }
        return faq;
      })
    );
  };

  return (
    <section className={styles.Syllabus}>
      <Popup
        trigger={popups}
        setTrigger={setPopups}
        className="popupModal"
        downloadBrochure
      >
        <div className="leftPopup">
          <div
            className="whiteP"
            style={{ width: "350px", height: "400px" }}
          ></div>
        </div>
        <div className="RightPopup">
          <h5>{popupHead}</h5>
          <p>Please enter the following details to initiate your download</p>
          <Form
            setTrigger={setPopups}
            downloadBrochure
            dataScience={dataScience}
            redirectDs={redirectDs}
            redirectFs={redirectFs}
            redirectBa={redirectBa}
            redirectBl={redirectBl}
            redirectDe={redirectDe}
          />
        </div>
      </Popup>
      <div className={styles.syllabusLeft}>
        <div className={styles.Syllabusbutton}>
          <div>
            <h4>Syllabus</h4>
          </div>
          <div>
            <button className={styles.Button} onClick={popupShow}>
              {" "}
              <AiOutlineDownload className="bIcons" />
              Download Brochure
            </button>
          </div>
        </div>
        <p>{syllabusDesc}</p>

        {state.map((syllabusData, i) => {
          const { Module0 } = syllabusData;

          return (
            <div key={Module0.title}>
              <div className={styles.QOuter}>
                <div className={styles.QInner}>
                  <div className={styles.line}>
                    <BsFillCircleFill className={styles.bIcons} />
                  </div>
                  <div
                    className={styles.FaqWrapper}
                    onClick={() => {
                      let id = i;
                      handleChange(id);
                    }}
                    key={Module0.title}
                  >
                    {Module0.open ? (
                      <div className={styles.quesO}>
                        <h2>{Module0.title}</h2>

                        <span>
                          {Module0.open ? (
                            <MdKeyboardArrowUp className="icon" />
                          ) : (
                            <MdKeyboardArrowDown className="icon" />
                          )}
                        </span>
                      </div>
                    ) : (
                      <div className={styles.ques}>
                        <h2>{Module0.title}</h2>
                        <span>
                          {Module0.open ? (
                            <MdKeyboardArrowUp className="icon" />
                          ) : (
                            <MdKeyboardArrowDown className="icon" />
                          )}
                        </span>
                      </div>
                    )}

                    {Module0.open ? (
                      <div className={styles.ans}>
                        <p>{Module0.desc}</p>
                        {Module0.content.map((content, i) => {
                          return (
                            <div key={content.chap.title}>
                              <h5>{content.chap.title}</h5>
                              {content.chap.desc.map((desc, i) => {
                                return (
                                  <div key={desc}>
                                    {desc === "" ? (
                                      ""
                                    ) : (
                                      <li key={desc}>{desc}</li>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className={styles.white} />
      </div>
      <div>
        <div className={styles.syllabusRight}>
          <div className={styles.PProgrammain}>
            <div className={styles.PProgram}>
              <p>Program Highlights</p>
            </div>
            <div className={styles.PProgramInner}>
              <p>
                <MdOutlineLiveTv className={styles.PIcons} />
                350+ Live sessions
              </p>
              <p>
                <AiOutlineFundProjectionScreen className={styles.PIcons} />
                15+ Industry Projects
              </p>
              <p>
                <AiOutlineFieldTime className={styles.PIcons} />
                Life time accessibility
              </p>
              <p>
                <MdOutlineLaptopMac className={styles.PIcons} />
                Live project experience
              </p>
            </div>
          </div>
          <div className={styles.PProgrammain} style={{ marginTop: "20px" }}>
            <div className={styles.PProgram}>
              <p>Request More Information</p>
            </div>
            <div className={styles.PProgramInner}>
              <Form
                dataScience={dataScience}
                redirectDs={redirectDs}
                redirectFs={redirectFs}
                redirectBa={redirectBa}
                redirectBl={redirectBl}
                redirectDe={redirectDe}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataScienceSyllabus;
