import React, { useState, useEffect } from "react";
import styles from "../ContactusForm/ContactUsForm.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import Image from "next/image";
import {
  AiOutlineCloseCircle,
  AiOutlineMail,
  AiOutlineDatabase,
} from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { TbMinusVertical } from "react-icons/tb";

const InvoiceForm = ({ refund, salesMan }) => {
  //offset to maintain time zone difference

  const [startDate, setStartDate] = useState();

  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    fPdfName: "",
    emailSent: "",
    myPost: "",
    fileUpload: "",
  });
  const [display, setDisplay] = useState(false);
  const [pId, setPId] = useState();
  let code;
  let dateT = new Date().getDate();
  let monthT = new Date().getMonth() + 1;
  let yearT = new Date().getFullYear();
  let DateString = `${dateT}${monthT}${yearT}`;

  const generateId = () => {
    let id = Math.floor(1000 + Math.random() * 9000) + DateString;
    return id;
  };

  useEffect(() => {
    const verifyID = async () => {
      let sendId = generateId();

      const data = await fetch("/api/uniqueId", {
        method: "POST",
        body: JSON.stringify({
          sendId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.status === 200) {
        const { id } = await data.json();
        console.log(id, "invoice");
        setPId(id);
      }
      if (data.status === 409) {
        verifyID();
      }
    };
    verifyID();
  }, []);

  const [value, setValue] = useState();

  const [query, setQuery] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    courseName: "",
    paymentDate: "",
    coursePrice: "",
    paymentMode: "",
    partialPrice: "",
    salesEmail: "",
    InvoiceDate: `${dateT}/${monthT}/${yearT}`,
    salesMan: salesMan,
    invoiceId: pId,
    paymentType: "",
  });

  useEffect(() => {
    setQuery({
      ...query,
      customerPhone: value,
      paymentDate: startDate,
      invoiceId: pId,
    });
  }, [value, startDate, pId]);

  // Update inputs value
  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  if (
    query.courseName === "Adv Data Science and AI (Basic)" ||
    query.courseName === "Adv Data Science and AI (Pro)" ||
    query.courseName === "Adv Data Science and AI (ProMax)"
  ) {
    code = "FAIML";
  }
  if (
    query.courseName ===
      "Full Stack Developer course with certification (pro)" ||
    query.courseName ===
      "Full Stack Developer course with certification (pro Max)"
  ) {
    code = "FSDC";
  }

  if (
    query.courseName ===
      "Business Analytics Program For Professionals (Basic)" ||
    query.courseName ===
      "Business Analytics Program For Professionals (pro Max)" ||
    query.courseName ===
      "Business Analytics Program For Professionals (pro Max)"
  ) {
    code = "BAP";
  }
  if (
    query.courseName === "Data Analytics Program For Professionals (Basic)" ||
    query.courseName === "Data Analytics Program For Professionals (pro Max)" ||
    query.courseName === "Data Analytics Program For Professionals (pro Max)"
  ) {
    code = "DAP";
  }
  if (query.courseName === "Blockchain program and certification") {
    code = "BCP";
  }
  if (query.courseName === "Data Structures and Algorithms + System Design") {
    code = "DSAS";
  }
  if (query.courseName === "Data Science & AI Bootcamp") {
    code = "DSAB";
  }
  if (query.courseName === "Data Analytics Bootcamp") {
    code = "DAB";
  }
  if (query.courseName === "DSA & System Design Bootcamp") {
    code = "DSASDB";
  }
  if (query.courseName === "Gen-AI & ChatGPT Course") {
    code = "GACGPTC";
  }

  //verify submit function
  const verifySubmit = async (e) => {
    e.preventDefault();

    setVerify(true);
  };

  // Form Submit function

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetch(
        `${refund ? "/api/Invoice/refundInvoice" : "/api/Invoice/invoice"}`,
        {
          method: "POST",
          body: JSON.stringify({
            salesEmail: query.salesEmail,
            customerName: query.customerName,
            customerEmail: query.customerEmail,
            customerPhone: query.customerPhone,
            courseName: query.courseName,
            paymentDate: query.paymentDate.toLocaleDateString(),
            salesMan: query.salesMan,
            InvoiceDate: query.InvoiceDate,
            paymentMode: query.paymentMode,
            coursePrice: query.coursePrice,
            paymentType: query.paymentType,
            partialPrice: query.partialPrice,
            invoiceId: code + pId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((t) => t.json());

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
        paymentMode: "",
        salesEmail: "",
        paymentType: "",
        salesMan: "",
        invoiceId: "",
        paymentMode: "",
      });
      setValue("");
      setStartDate("");
      setVerify(false);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setDisplay(true);
  };

  let btnText = "Generate Invoice";

  return (
    <div className={styles.App}>
      <form onSubmit={verifySubmit}>
        <div className={styles.formWrapper}>
          <input
            type="text"
            name="salesEmail"
            required
            placeholder="Enter salesman Email*"
            className={styles.EmailInput}
            value={query.salesEmail}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <input
            type="text"
            name="customerName"
            className={styles.NameInput}
            required
            placeholder="Enter Customer Full Name*"
            value={query.customerName}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <input
            type="email"
            name="customerEmail"
            required
            placeholder="Enter Customer Email*"
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
            placeholder="Enter Customer Phone Number*"
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

            <option value="Adv Data Science and AI (Pro)">
              Adv Data Science and AI (Pro)
            </option>
            <option value="Adv Data Science and AI (ProMax)">
              Adv Data Science and AI (ProMax)
            </option>
            <option value="Full Stack Developer course with certification (pro)">
              Full Stack Developer course with certification (pro)
            </option>
            <option value="Full Stack Developer course with certification (pro Max)">
              Full Stack Developer course with certification (pro Max)
            </option>

            <option value="Blockchain program and certification">
              Blockchain program and certification
            </option>

            <option value="Business Analytics Program For (pro)">
              Business Analytics Program For Professionals (pro)
            </option>
            <option value="Business Analytics Program For Professionals (pro Max)">
              Business Analytics Program For Professionals (pro Max)
            </option>
            <option value="Data Analytics Program For (pro)">
              Data Analytics Program For Professionals (pro)
            </option>
            <option value="Data Analytics Program For Professionals (pro Max)">
              Data Analytics Program For Professionals (pro Max)
            </option>
            <option value="Data Structures and Algorithms + System Design">
              Data Structures and Algorithms + System Design
            </option>
            <option value="Full stack Web Development Course with Real Work Experience">
              Full stack Web Development Course with Real Work Experience
            </option>

            <option value="Data Science & AI Bootcamp">
              Data Science & AI Bootcamp
            </option>

            <option value="Data Analytics Bootcamp">
              Data Analytics Bootcamp
            </option>

            <option value="DSA & System Design Bootcamp">
              DSA & System Design Bootcamp
            </option>

            <option value="Gen-AI & ChatGPT Course">
              Gen-AI & ChatGPT Course
            </option>
          </select>
        </div>
        <div className={styles.formWrapper}>
          <select
            name="paymentMode"
            required
            value={query.paymentMode}
            onChange={handleParam()}
            placeholder="Select Payment Mode*"
          >
            <option className={styles.option} value="">
              Payment Mode*
            </option>

            <option value="Propelld">Propelld</option>
            <option value="Shopse">Shopse</option>
            <option value="Bajaj Finserv">Bajaj Finserv</option>

            <option value="Razorpay">Razorpay</option>
            <option value="Liquiloans">Liquiloans</option>
            <option value="Direct Bank Transfer">Direct Bank Transfer</option>
          </select>
        </div>
        <div className={styles.formWrapper}>
          <select
            name="paymentType"
            required
            value={query.paymentType}
            onChange={handleParam()}
            placeholder="Select Payment Type*"
          >
            <option className={styles.option} value="">
              Payment Type*
            </option>
            <option value="Full Payment">Full Payment</option>

            <option value="Partial Payment">Partial Payment</option>
          </select>
        </div>
        {query.paymentType === "Partial Payment" ? (
          <div className={styles.formWrapper}>
            <input
              type="number"
              name="partialPrice"
              required
              placeholder="Enter the partial amount paid*"
              className={styles.EmailInput}
              value={query.partialPrice}
              onChange={handleParam()}
            />
          </div>
        ) : (
          ""
        )}
        <div className={styles.inner} style={{ marginBottom: "10px" }}>
          <DatePicker
            selected={startDate}
            name="paymentDate"
            id="dateTime"
            onChange={(date) => {
              setStartDate(date);
            }}
            wrapperClassName={styles.date}
            className={styles.datePicker}
            placeholderText="Enter Payment Date"
            dateFormat="MMMM d, yyyy"
            required
          />
        </div>
        <div className={styles.formWrapper}>
          <input
            type="number"
            name="coursePrice"
            required
            placeholder="Enter the amount*"
            className={styles.EmailInput}
            value={query.coursePrice}
            onChange={handleParam()}
          />
        </div>
        <input type="hidden" id="salesMan" name="salesMan" value={salesMan} />
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
      {verify ? (
        <div className={styles.infoWrap}>
          <div className={styles.infoD}>
            <Image
              src=""
              layout="fill"
              alt="review"
              style={{ borderRadius: "4px" }}
            />
            <AiOutlineCloseCircle
              className={styles.close}
              onClick={() => {
                setVerify(false);
              }}
            />
            <h2>Verify Details</h2>
            <form className={styles.readOnly} onSubmit={formSubmit}>
              <div className={styles.readOnlyDiv}>
                <span>Salesman Email</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="salesEmail"
                  name="salesEmail"
                  value={query.salesEmail}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span> Customer Name</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="CustomerName"
                  name="CustomerName"
                  value={query.customerName}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span>Customer Email</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="customerEmail"
                  name="customerEmail"
                  value={query.customerEmail}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span>Customer phone</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="phone"
                  id="customerPhone"
                  name="customerPhone"
                  value={query.customerPhone}
                  readOnly
                />
              </div>

              <div className={styles.readOnlyDiv}>
                <span>Course Name</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="courseName"
                  name="courseName"
                  value={query.courseName}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span>Payment Mode</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="paymentMode"
                  name="paymentMode"
                  value={query.paymentMode}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span>Payment Date</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="paymentDate"
                  name="paymentDate"
                  value={startDate}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span>course price</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="number"
                  id="coursePrice"
                  name="coursePrice"
                  value={query.coursePrice}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyCheck}>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="I have verified all the details"
                  required
                />
                <input
                  type="hidden"
                  id="salesman"
                  name="salesman"
                  value={salesMan}
                />
                <label htmlFor="vehicle1">
                  I have verified all the details
                </label>
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
                <button type="submit">
                  Procced
                  <BsArrowRightShort className={styles.buttonIcon} />
                </button>
              )}
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      {display ? (
        <div className={styles.infoWrap}>
          <div className={styles.infoD}>
            <Image
              src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/google-background-verify.webp"
              layout="fill"
              alt="review"
              style={{ borderRadius: "4px" }}
            />
            <AiOutlineCloseCircle
              className={styles.close}
              onClick={() => {
                setDisplay(false);
                setVerify(false);
              }}
            />
            <h2>Invoice Generated Successfully</h2>

            <div className={styles.detailsDiv}>
              <div className={styles.readOnlyDiv}>
                <AiOutlineMail className={styles.formIcon} />
                <TbMinusVertical className={styles.formLine} />
                <p>{invoiceData.emailSent}</p>
              </div>
              <div className={styles.readOnlyDiv}>
                <BsFileEarmarkPdf className={styles.formIcon} />
                <TbMinusVertical className={styles.formLine} />
                <p>{invoiceData.fPdfName}</p>
              </div>
              <div className={styles.readOnlyDiv}>
                <BsFileEarmarkPdf className={styles.formIcon} />
                <TbMinusVertical className={styles.formLine} />
                <p>
                  <a href={invoiceData.fileUpload}>{invoiceData.fileUpload}</a>
                </p>
              </div>
              <div className={styles.readOnlyDiv}>
                <AiOutlineDatabase className={styles.formIcon} />
                <TbMinusVertical className={styles.formLine} />
                <p>Uploaded to database InsertionId: {invoiceData.myPost}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default InvoiceForm;
