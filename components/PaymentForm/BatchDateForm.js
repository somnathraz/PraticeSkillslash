import React, { useState, useEffect } from "react";
import styles from "../ContactusForm/ContactUsForm.module.css";
import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";

const BatchDateForm = ({ id, setUpdateForm }) => {
  const [startDate, setStartDate] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    batchDates: startDate,
    batchType: "",
    batchStatus: "",
    page: [],
    batchWeek: "",
    batchDesc1: "",
    batchDesc2: "",
  });

  // useEffect(() => {
  //   const fetchPopup = async () => {
  //     const data = await fetch("/api/v1/singlePopup", {
  //       method: "POST",
  //       body: JSON.stringify({ id: id, soloData: true }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (data.status === 200) {
  //       const { myPost } = await data.json();

  //       setQuery({
  //         id: id,
  //         heading: myPost.heading,
  //         para1: myPost.para1,
  //         para2: myPost.para2,
  //         page: [],
  //         startDate: myPost.startDate,
  //         endDate: myPost.endDate,
  //       });
  //       showList(myPost.page);
  //       setStartDate(new Date(myPost.startDate));
  //       setEndDate(new Date(myPost.endDate));
  //     }
  //   };
  //   fetchPopup();
  // }, [id]);
  useEffect(() => {
    const fetchPopup = async () => {
      const data = await fetch("/api/v1/generateBatchDate", {
        method: "GET",
      });
      if (data.status === 200) {
        const { popData, msg } = await data.json();
        setPopupData(popData);
      }
    };
    fetchPopup();
  }, []);
  useEffect(() => {
    setQuery({
      ...query,
      batchDates: startDate,
    });
  }, [startDate]);
  // Update inputs value
  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { page } = query;

    // Case 1 : The user checks the box
    if (checked) {
      setQuery({
        ...query,
        page: [...page, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setQuery({
        ...query,
        page: page.filter((e) => e !== value),
      });
    }
  };

  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Form Submit function

  const formSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await fetch("/api/v1/generateBatchDate", {
        method: "POST",
        body: JSON.stringify(query),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.status === 200) {
        setQuery({
          batchDates: "",
          batchType: "",
          batchStatus: "",
          page: [],
          batchWeek: "",
          batchDesc1: "",
          batchDesc2: "",
        });
        setStartDate("");
        alert("batch added");
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  let btnText = "Submit Details";
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  return (
    <div className={styles.App}>
      <form
        onSubmit={formSubmit}
        onChange={() => {
          setError(false);
        }}
      >
        <div className={styles.inner} style={{ marginBottom: "10px" }}>
          <DatePicker
            selected={startDate}
            name="startDate"
            id="dateTime"
            onChange={(date) => {
              setStartDate(date);
            }}
            showTimeSelect
            timeIntervals={15}
            filterTime={filterPassedTime}
            minDate={subDays(new Date(), 0)}
            wrapperClassName={styles.date}
            className={styles.datePicker}
            placeholderText="Enter Batch Date"
            dateFormat="MMMM d, yyyy h:mm aa"
            required
          />
        </div>

        <div className={styles.formWrapper}>
          <select
            name="batchType"
            required
            value={query.batchType}
            onChange={handleParam()}
            placeholder="Select Batch Type*"
          >
            <option className={styles.option} value="">
              select batch type
            </option>
            <option className={styles.option} value="Weekday">
              Weekday
            </option>

            <option value="Weekend">Weekend</option>
          </select>
        </div>
        <div className={styles.formWrapper}>
          <select
            name="batchStatus"
            required
            value={query.batchStatus}
            onChange={handleParam()}
            placeholder="Select Batch Status*"
          >
            <option className={styles.option} value="">
              select batch status
            </option>
            <option className={styles.option} value="Filled">
              Filled
            </option>

            <option value="Partially Filled">Partially Filled</option>
          </select>
        </div>
        <div className={styles.formWrapper}>
          <select
            name="batchWeek"
            required
            value={query.batchWeek}
            onChange={handleParam()}
            placeholder="Select Batch WeekDay*"
          >
            <option
              className={styles.option}
              value="Weekday Batch (Mon -  Fri)"
            >
              Weekday Batch (Mon - Fri)
            </option>

            <option value="Weekend Batch (Sat -  Sun)">
              Weekend Batch (Sat - Sun)
            </option>
          </select>
        </div>
        <div className={styles.formWrapper}>
          <textarea
            type="text"
            name="batchDesc1"
            placeholder="Enrollment for this batch is no longer accepted"
            className={styles.EmailInput}
            value={query.batchDesc1}
            required
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <textarea
            type="text"
            name="batchDesc2"
            required
            placeholder="Seats are partially filled"
            className={styles.EmailInput}
            value={query.batchDesc2}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <label>Select courses You want to display Batch</label>
          <div className={styles.checkBoxDiv}>
            <input
              type="checkbox"
              name="pages"
              value="Adv Data Science and AI"
              id="flexCheckDefault"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Adv Data Science and AI
            </label>
          </div>
          <div className={styles.checkBoxDiv}>
            <input
              type="checkbox"
              name="pages"
              value="Full Stack Developer course with certification"
              id="flexCheckDefault"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Full Stack Developer course with certification
            </label>
          </div>
          <div className={styles.checkBoxDiv}>
            <input
              type="checkbox"
              name="pages"
              value="Blockchain program and certification"
              id="flexCheckDefault"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Blockchain program and certification
            </label>
          </div>
          <div className={styles.checkBoxDiv}>
            <input
              type="checkbox"
              name="pages"
              value="Business Analytics Program For Professionals"
              id="flexCheckDefault"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Business Analytics Program For Professionals
            </label>
          </div>
          <div className={styles.checkBoxDiv}>
            <input
              type="checkbox"
              name="pages"
              value="Data Structures and Algorithms + System Design"
              id="flexCheckDefault"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Data Structures and Algorithms + System Design
            </label>
          </div>
        </div>

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
    </div>
  );
};

export default BatchDateForm;
