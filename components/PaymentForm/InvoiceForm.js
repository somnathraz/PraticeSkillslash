import React, { useState, useEffect } from "react";
import styles from "../ContactusForm/ContactUsForm.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import { AiOutlineCloseCircle } from "react-icons/ai";

const InvoiceForm = () => {
  //offset to maintain time zone difference
  const [startDate, setStartDate] = useState();
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    fPdfName: "",
    emailSent: "",
    myPost: "",
    fileUpload: "",
  });
  const [display, setDisplay] = useState(false);
  let id = Math.floor(1000 + Math.random() * 9000);
  const [value, setValue] = useState();
  const [query, setQuery] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    courseName: "",
    paymentDate: "",
    coursePrice: "",
    invoiceId: id,
  });

  useEffect(() => {
    setQuery({ ...query, customerPhone: value, paymentDate: startDate });
  }, [value, startDate]);

  // Update inputs value
  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  let endPoint = "https://getform.io/f/24a1a4e6-8116-4614-818d-0bff28469fd0";

  // Form Submit function

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetch("/api/Invoice/invoice", {
        method: "POST",
        body: JSON.stringify({
          customerName: query.customerName,
          customerEmail: query.customerEmail,
          customerPhone: query.customerPhone,
          courseName: query.courseName,
          paymentDate: query.paymentDate,
          coursePrice: query.coursePrice,
          invoiceId: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((t) => t.json());

      setInvoiceData({
        fPdfName: data.pdfName,
        emailSent: data.emailInfo,
        myPost: data.myPost,
        fileUpload: data.fileLink,
      });
      setQuery({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        courseName: "",
        paymentDate: "",
        coursePrice: "",
        invoiceId: "",
      });
      setValue("");
      setStartDate("");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setDisplay(true);
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  let btnText = "Generate Invoice";

  return (
    <div className={styles.App}>
      <form onSubmit={formSubmit}>
        <div className={styles.formWrapper}>
          <input
            type="text"
            name="customerName"
            className={styles.NameInput}
            required
            placeholder="Enter your Full Name*"
            value={query.customerName}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <input
            type="email"
            name="customerEmail"
            required
            placeholder="Enter Your Email*"
            className={styles.EmailInput}
            value={query.customerEmail}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <PhoneInput
            style={{
              border: "1px solid #0487d9",
              height: "45px",
              borderRadius: "10px",
              padding: "10px",
            }}
            name="customerPhone"
            rules={{ required: true }}
            defaultCountry="IN"
            placeholder="Enter Phone Number*"
            className={styles.Phone}
            value={value}
            required
            onChange={setValue}
          />
        </div>
        <div className={styles.formWrapper}>
          <select
            name="courseName"
            required
            value={query.courseName}
            onChange={handleParam()}
            placeholder="Select a course*"
          >
            <option className={styles.option} value="">
              Select a course*
            </option>

            <option value="Adv Data Science and AI (Basic/Pro/ProMax)">
              Adv Data Science and AI (Basic/Pro/ProMax)
            </option>
            <option value="Full Stack Developer course with certification">
              Full Stack Developer course with certification
            </option>

            <option value="Blockchain program and certification">
              Blockchain program and certification
            </option>
            <option value="Business Analytics Program For Professionals">
              Business Analytics Program For Professionals
            </option>
          </select>
        </div>

        <div className={styles.inner}>
          <DatePicker
            selected={startDate}
            name="paymentDate"
            paymentDate
            id="dateTime"
            onChange={(date) => {
              setStartDate(date);
            }}
            showTimeSelect
            timeIntervals={15}
            includeDateIntervals={[
              { start: subDays(new Date(), 1), end: addDays(new Date(), 5) },
            ]}
            filterTime={filterPassedTime}
            wrapperClassName={styles.date}
            className={styles.datePicker}
            placeholderText="Select Invoice Date"
            dateFormat="MMMM d, yyyy h:mm aa"
            required
            minTime={setHours(setMinutes(new Date(), 0), 10)}
            maxTime={setHours(setMinutes(new Date(), 0), 20)}
          />
        </div>
        <div className={styles.formWrapper}>
          <input
            type="amount"
            name="coursePrice"
            required
            placeholder="Enter the amount*"
            className={styles.EmailInput}
            value={query.coursePrice}
            onChange={handleParam()}
          />
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
      {display ? (
        <div className={styles.infoWrap}>
          <div className={styles.infoD}>
            <AiOutlineCloseCircle
              className={styles.close}
              onClick={() => {
                setDisplay(false);
              }}
            />
            <h2>Invoice Generated Successfully</h2>
            <p>
              <b>email ID:</b> {invoiceData.emailSent}
            </p>
            <p>
              <b>pdf Name:</b> {invoiceData.fPdfName}
            </p>

            <p>pdfLink: {invoiceData.fileUpload}</p>
            <p>Uploaded to database InsertionId: {invoiceData.myPost}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default InvoiceForm;
