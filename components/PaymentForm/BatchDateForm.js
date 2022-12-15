import React, { useState, useEffect } from "react";
import styles from "../ContactusForm/ContactUsForm.module.css";
import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import BatchDateBox from "../BatchDateBox/BatchDateBox";


const BatchDateForm = ({ id, setUpdateForm }) => {
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passBatchData, setPassBatchData] = useState("");
  const [display, setDisplay] = useState(true);
  const [query, setQuery] = useState({
    batchDates: startDate,
    batchStartTime: startTime,
    batchEndTime: endTime,
    batchType: "",
    batchStatus: "",
    page: "",
    batchWeek: "",
    batchDesc1: "",
    batchDesc2: "",
    activeBatch: "",
  });

  useEffect(() => {
    setQuery({
      ...query,
      batchDates: startDate,
      batchStartTime: startTime,
      batchEndTime: endTime,
    });
  }, [startDate, startTime, endTime]);
  // Update inputs value

 //For fetching batch details
 useEffect(() => {
const fetchBatchDetails = async () =>{
  const data = await fetch("/api/v1/generateBatchDate", {
  method: "GET",
});
if (data.status === 200) {
const {batchDatesDetails} = await data.json();
setPassBatchData(batchDatesDetails)
// console.log(batchDatesDetails);

}}
fetchBatchDetails()
 },[])

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
          page: query.page,
          batchWeek: "",
          batchDesc1: "",
          batchDesc2: "",
          batchStartTime: "",
          batchEndTime: "",
          activeBatch: "",
        });
        setStartDate("");
        setStartTime("");
        setEndTime("");
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
            minDate={subDays(new Date(), 0)}
            wrapperClassName={styles.date}
            className={styles.datePicker}
            placeholderText="Enter Batch Date"
            dateFormat="MMMM d, yyyy"
            required
          />
        </div>
        <div className={styles.inners} style={{ marginBottom: "10px" }}>
          <DatePicker
            selected={startTime}
            onChange={(date) => {
              setStartTime(date);
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeCaption="Time"
            dateFormat="h:mm aa"
            wrapperClassName={styles.date}
            className={styles.datePicker}
            placeholderText="Enter Batch Start Time"
            required
          />
          <DatePicker
            selected={endTime}
            onChange={(date) => {
              setEndTime(date);
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            placeholderText="Enter Batch End Time"
            wrapperClassName={styles.date}
            className={styles.datePicker}
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
            <option className={styles.option} value="Morning Batch,">
              Morning Batch
            </option>

            <option value="Afternoon Batch,">Afternoon Batch</option>
            <option value="Evening Batch,">Evening Batch</option>
          </select>
        </div>
        <div className={styles.formWrapper}>
          <select
            name="batchStatus"
            required
            value={query.batchStatus}
            onChange={handleParam()}
            placeholder="Select Batch seat details*"
          >
            <option className={styles.option} value="">
              select batch seat Details*
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
            <option className={styles.option} value="">
              Select Batch Week
            </option>
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
          <select
            name="activeBatch"
            required
            value={query.activeBatch}
            onChange={handleParam()}
            placeholder="Select batch status*"
          >
            <option className={styles.option} value="">
              Select batch status*
            </option>
            <option className={styles.option} value="true">
              true
            </option>
            <option value="false">false</option>
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
              type="radio"
              name="page"
              value="Adv Data Science and AI"
              id="flexCheckDefault"
              onChange={handleParam()}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Adv Data Science and AI
            </label>
          </div>
          <div className={styles.checkBoxDiv}>
            <input
              type="radio"
              name="page"
              value="Full Stack Developer course with certification"
              id="flexCheckDefault"
              onChange={handleParam()}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Full Stack Developer course with certification
            </label>
          </div>
          <div className={styles.checkBoxDiv}>
            <input
              type="radio"
              name="page"
              value="Blockchain program and certification"
              id="flexCheckDefault"
              onChange={handleParam()}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Blockchain program and certification
            </label>
          </div>
          <div className={styles.checkBoxDiv}>
            <input
              type="radio"
              name="page"
              value="Business Analytics Program For Professionals"
              id="flexCheckDefault"
              onChange={handleParam()}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Business Analytics Program For Professionals
            </label>
          </div>
          <div className={styles.checkBoxDiv}>
            <input
              type="radio"
              name="page"
              value="Data Structures and Algorithms + System Design"
              id="flexCheckDefault"
              onChange={handleParam()}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Data Structures and Algorithms + System Design
            </label>
          </div>
          <div className={styles.checkBoxDiv}>
            <input
              type="radio"
              name="page"
              value=""
              id="flexCheckDefault"
              onChange={handleParam()}
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

      {display ? passBatchData === "" ? "" :<div><BatchDateBox PassBatchData = {passBatchData}/></div>: ""}
    </div>
  );
};

export default BatchDateForm;
