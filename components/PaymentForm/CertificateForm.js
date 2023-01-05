import React, { useState, useEffect } from "react";
import styles from "../ContactusForm/ContactUsForm.module.css";
import DatePicker from "react-datepicker";
import { BiShow, BiHide } from "react-icons/bi";
import Toast from "../Toast/Toast";

const CertificateForm = () => {
  //offset to maintain time zone difference
  const [startDate, setStartDate] = useState();
  const [programStartDate, setProgramStartDate] = useState();
  const [programEndDate, setProgramEndDate] = useState();
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);

  const [query, setQuery] = useState({
    name: "",
    courseName: "",
    date: "",
    certificateType: "",
    id: "",
    durationStartDate: "",
    durationEndDate: "",
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
  useEffect(() => {
    setQuery({
      ...query,

      date: ConvertDate(startDate),
      durationStartDate: ConvertDate(programStartDate),
      durationEndDate: ConvertDate(programEndDate),
    });
  }, [startDate, programStartDate, programEndDate]);
  // Form Submit function

  useEffect(() => {
    const fetchCertificateId = async () => {
      const data = await fetch("/api/v1/certificateIdGenerator", {
        method: "GET",
      });
      if (data.status === 200) {
        const { id } = await data.json();
        setQuery({
          ...query,
          id: id,
        });
        console.log(id, "id");
        // console.log(batchDatesDetails);
      }
    };
    fetchCertificateId();
  }, [query.id]);

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateId = await fetch("/api/v1/certificateIdGenerator", {
        method: "POST",
        body: JSON.stringify({ id: query.id + 1 }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (updateId.status === 200) {
        console.log(query, "frontend");
        try {
          const data = await fetch("/api/v1/generateCertificate", {
            method: "POST",
            body: JSON.stringify(query),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (data.status === 200) {
            console.log("hello");
            setQuery({
              name: "",
              courseName: "",
              date: "",
              certificateType: "",
              id: "",
              durationStartDate: "",
              durationEndDate: "",
            });
            setProgramEndDate("");
            setProgramStartDate("");
            setStartDate("");
          }
        } catch (error) {
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
            <option value="project experience certificate Caspian">
              project experience certificate Caspian
            </option>
            <option value="Workshop completion certificate">
              Workshop completion certificate
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
        ) : query.certificateType !== "course completion certificate" ? (
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
      {display ? <Toast content={user.msg} success={user.success} shows /> : ""}
    </div>
  );
};

export default CertificateForm;
