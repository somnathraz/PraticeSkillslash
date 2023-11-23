import React, { useState, useEffect } from "react";
import styles from "../ContactusForm/ContactUsForm.module.css";
import DatePicker from "react-datepicker";
import Link from "next/link";

const CertificateForm = () => {
  //offset to maintain time zone difference
  const [startDate, setStartDate] = useState();
  const [programStartDate, setProgramStartDate] = useState();
  const [programEndDate, setProgramEndDate] = useState();
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const [show, setShow] = useState(false);
  const [link, setLink] = useState(false);
  const [vertical, setVertical] = useState(false);

  const [query, setQuery] = useState({
    name: "",
    email: "",
    courseName: "",
    date: "",
    certificateType: "",
    ids: "",
    id: "",
    durationStartDate: "",
    durationEndDate: "",
    textarea: "",
    point: "",
  });

  // Update inputs value
  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const ConvertDate = (date) => {
    //convert date to format//
    let dateT = new Date(date).getDate();
    let monthT = new Date(date).getMonth() + 1;
    let yearT = new Date(date).getFullYear();
    let DateString = `${dateT}/${monthT}/${yearT}`;

    return DateString;
  };
  // log text area split
  const textData = query.textarea;
  console.log(textData.split("@"));
  const arrayTextData = textData.split("@");
  console.log(arrayTextData);
  // console.log(arrayTextData[);

  useEffect(() => {
    setQuery({
      ...query,

      date: ConvertDate(startDate),
      durationStartDate: ConvertDate(programStartDate),
      durationEndDate: ConvertDate(programEndDate),
    });
    if (query.certificateType === "SingleDoor Project Completion") {
      // console.log("gs");
      setVertical(true);
    }
  }, [startDate, programStartDate, programEndDate, query.certificateType]);
  // Form Submit function

  useEffect(() => {
    const fetchCertificateId = async () => {
      const data = await fetch("/api/v1/certificateIdGenerator", {
        method: "GET",
      });
      if (data.status === 200) {
        let r = (Math.random() + 1).toString(36).substring(8);
        // console.log(r);
        const { id } = await data.json();
        const customId = id + r;
        setQuery({
          ...query,
          ids: id,
          id: customId,
        });
        // console.log(id, "id");
        // console.log(batchDatesDetails);
      }
    };
    fetchCertificateId();
  }, [query.ids]);

  const formSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const updateId = await fetch("/api/v1/certificateIdGenerator", {
        method: "POST",
        body: JSON.stringify({ id: query.ids + 1 }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (updateId.status === 200) {
        try {
          const data = await fetch("/api/v1/generateCertificate", {
            method: "POST",
            body: JSON.stringify({ ...query, vertical }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (data.status === 200) {
            const { fileLink } = await data.json();
            setLink(fileLink);
            setQuery({
              name: "",
              email: "",
              courseName: "",
              date: "",
              certificateType: "",
              id: "",
              ids: "",
              durationStartDate: "",
              durationEndDate: "",
              textarea: "",
              point: "",
            });
            setProgramEndDate("");
            setProgramStartDate("");
            setStartDate("");
            alert("Certificate Generated Successfully");
            setShow(true);
          }
        } catch (error) {
          alert(error);
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDisplay(false);
    }, 100);
    clearTimeout(timeOut);
  }, [display]);
  let btnText = "Generate Certificate";

  return (
    <div className={styles.App}>
      <form
        onSubmit={formSubmit}
        onChange={() => {
          setDisplay(false);
        }}
      >
        <div className={styles.formWrapper}>
          <input
            id="name"
            type="text"
            name="name"
            required
            placeholder="Enter Participants name*"
            className={styles.EmailInput}
            value={query.name}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="Enter Participants email*"
            className={styles.EmailInput}
            value={query.email}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.inner} style={{ marginBottom: "10px" }}>
          <DatePicker
            selected={startDate}
            name="date"
            id="date"
            onChange={(date) => {
              setStartDate(date);
            }}
            wrapperClassName={styles.date}
            className={styles.datePicker}
            placeholderText="Enter certificate issue Date"
            dateFormat="MMMM d, yyyy"
            required
          />
        </div>
        <div className={styles.formWrapper}>
          <select
            name="certificateType"
            required
            value={query.certificateType}
            onChange={handleParam()}
            placeholder="Select Certificate Type*"
          >
            <option className={styles.option} value="">
              Select Certificate Type*
            </option>
            <option value="course completion certificate">
              course completion certificate
            </option>
            <option value="project experience certificate Theorax">
              project experience certificate Theorax
            </option>
            <option value="project experience certificate CHMS">
              project experience certificate CHMS
            </option>
            <option value="project experience certificate SingleDoor">
              project experience certificate SingleDoor
            </option>
            <option value="project experience certificate Caspian">
              project experience certificate Caspian
            </option>
            <option value="Workshop completion certificate">
              Workshop completion certificate
            </option>
            <option value="Module completion certificate">
              Module completion certificate
            </option>
            <option value="SingleDoor Project Completion">
              SingleDoor Project Completion
            </option>
          </select>
        </div>
        {}
        <div className={styles.formWrapper}>
          <input
            id="courseName"
            type="text"
            name="courseName"
            required
            placeholder="Enter Course Name/ Project Name/ Workshop Name*"
            className={styles.EmailInput}
            value={query.courseName}
            onChange={handleParam()}
          />
        </div>

        {query.certificateType === "" ? (
          ""
        ) : query.certificateType === "course completion certificate" ||
          query.certificateType === "SingleDoor Project Completion" ? (
          ""
        ) : (
          <div className={styles.inners} style={{ marginBottom: "10px" }}>
            <DatePicker
              selected={programStartDate}
              name="date"
              id="date"
              onChange={(date) => {
                setProgramStartDate(date);
              }}
              wrapperClassName={styles.date}
              className={styles.datePicker}
              placeholderText="Enter program start Date"
              dateFormat="MMMM d, yyyy"
              required
            />
            <DatePicker
              selected={programEndDate}
              name="date"
              id="date"
              onChange={(date) => {
                setProgramEndDate(date);
              }}
              wrapperClassName={styles.date}
              className={styles.datePicker}
              placeholderText="Enter program End Date"
              dateFormat="MMMM d, yyyy"
              required
            />
          </div>
        )}

        {query.certificateType === "SingleDoor Project Completion" ? (
          <>
            <div
              className={styles.inn}
              style={{ marginBottom: "10px", width: "100%" }}
            >
              <input
                name="textarea"
                type="text"
                value={query.textarea}
                placeholder="Enter program or project details"
                className={styles.textArea}
                onChange={handleParam()}
              />
            </div>
            <div
              className={styles.inn}
              style={{ marginBottom: "10px", width: "100%" }}
            >
              <input
                name="point"
                type="text"
                value={query.point}
                placeholder="Enter the point separate each point with point break"
                className={styles.textArea}
                onChange={handleParam()}
              />
            </div>
          </>
        ) : (
          ""
        )}

        {loading ? (
          <div className="center">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        ) : (
          <button type="submit" className={styles.button}>
            {btnText}
          </button>
        )}
      </form>
      {show ? (
        <div className={styles.link}>
          <p>FileLink: {link}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CertificateForm;
