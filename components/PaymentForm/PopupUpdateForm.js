import React, { useState, useEffect } from "react";
import styles from "../ContactusForm/ContactUsForm.module.css";
import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";

const UpdatePopupFrom = ({ id, setUpdateForm }) => {
  const [popupData, setPopupData] = useState([]);

  const [startDate, setStartDate] = useState();

  const [endDate, setEndDate] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [list, showList] = useState([]);
  const [query, setQuery] = useState({
    id: id,
    heading: "",
    para1: "",
    para2: "",
    page: [],
    startDate: "",
    endDate: "",
  });
  useEffect(() => {
    const fetchPopup = async () => {
      const data = await fetch("/api/v1/singlePopup", {
        method: "POST",
        body: JSON.stringify({ id: id, soloData: true }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.status === 200) {
        const { myPost } = await data.json();

        setQuery({
          id: id,
          heading: myPost.heading,
          para1: myPost.para1,
          para2: myPost.para2,
          page: [],
          startDate: myPost.startDate,
          endDate: myPost.endDate,
        });
        showList(myPost.page);
        setStartDate(new Date(myPost.startDate));
        setEndDate(new Date(myPost.endDate));
      }
    };
    fetchPopup();
  }, [id]);
  useEffect(() => {
    const fetchPopup = async () => {
      const data = await fetch("/api/v1/generatePopup", {
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
      startDate: startDate,
      endDate: endDate,
    });
  }, [startDate, endDate]);
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
    console.log(query, "inside submit");
    if (endDate < startDate) {
      setError(true);
      return;
    }

    console.log("updating...");
    setLoading(true);

    try {
      const data = await fetch("/api/v1/generatePopup", {
        method: "PATCH",
        body: JSON.stringify(query),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.status === 200) {
        setQuery({
          heading: "",
          para1: "",
          para2: "",
          startDate: "",
          endDate: "",
          page: [],
        });
        setEndDate("");
        setStartDate("");

        alert("popup updated");
        setUpdateForm({ show: false, id: "" });
        e.target.checked = false;
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  let btnText = "Update Popup";
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
        <div className={styles.formWrapper}>
          <p style={{ margin: "0" }}>This popup is displayed in </p>
          {list.map((data, i) => {
            return <li key={i}>{data}</li>;
          })}
          <input
            id="heading"
            type="text"
            name="heading"
            required
            placeholder="Enter Popup Heading*"
            className={styles.EmailInput}
            value={query.heading}
            onChange={handleParam()}
          />
        </div>

        <div className={styles.formWrapper}>
          <textarea
            type="text"
            name="para1"
            required
            placeholder="Enter first para*"
            className={styles.EmailInput}
            value={query.para1}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <textarea
            type="text"
            name="para2"
            placeholder="Enter second para"
            className={styles.EmailInput}
            value={query.para2}
            onChange={handleParam()}
          />
        </div>
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
            placeholderText="Enter Payment Date"
            dateFormat="MMMM d, yyyy h:mm aa"
            required
          />
        </div>
        <div className={styles.inner} style={{ marginBottom: "10px" }}>
          <DatePicker
            selected={endDate}
            name="endDate"
            id="dateTime"
            minDate={subDays(new Date(), 0)}
            onChange={(date) => {
              setEndDate(date);
            }}
            showTimeSelect
            timeIntervals={15}
            filterTime={filterPassedTime}
            wrapperClassName={styles.date}
            className={styles.datePicker}
            placeholderText="Enter Payment Date"
            dateFormat="MMMM d, yyyy h:mm aa"
            required
          />
          {error ? (
            <label htmlFor="endDate">
              end date must be greater than start date
            </label>
          ) : (
            ""
          )}
        </div>
        <div className={styles.formWrapper}>
          <label>Select courses You want to display popup</label>
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
              value=" Data Structures and Algorithms + System Design"
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

export default UpdatePopupFrom;
