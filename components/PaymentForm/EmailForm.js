import React, { useState, useEffect } from "react";
import styles from "../ContactusForm/ContactUsForm.module.css";
// import DashboardBox from "../dashboardBox/DashboardBox";
const EmailForm = () => {
  const [emailData, setEmailData] = useState([]);

  const [query, setQuery] = useState({
    sendingTo: "",
    mailBody: "",
  });

  useEffect(() => {
    try {
      const fetchMail = async () => {
        const response = await fetch("/api/v1/generateMail", {
          method: "GET",
        });
        if (response.status === 200) {
          const data = await response.json();
          setEmailData(data);
          console.log(setEmailData(data), "get data");
        }
      };
      fetchMail();
    } catch (error) {
      console.log(error);
    }
  }, []);

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

    try {
      console.log("hii");
      // const data = await fetch("/api/v1/generateMail", {
      //   method: "POST",
      //   body: JSON.stringify(query),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      //   if (data.status === 200) {
      //     setQuery({
      //       sendingTo: "",
      //       mailBody: "",
      //     });
      //   }
    } catch (error) {
      console.log(error);
    }
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
          <input
            id="sendingTo"
            type="text"
            name="sendingTo"
            required
            placeholder="Email id's to send mail*"
            className={styles.EmailInput}
            value={query.sendingTo}
            onChange={handleParam()}
          >
            {/* {" "}
            {emailData.map((email) => {
              email;
            })} */}
          </input>
        </div>

        <div className={styles.formWrapper}>
          <textarea
            type="text"
            name="mailBody"
            required
            placeholder="Write E-mail body*"
            className={styles.EmailInput}
            style={{ height: "200px" }}
            value={query.mailBody}
            onChange={handleParam()}
          />
        </div>

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
      {/* {popupData.length === 0 ? "" : <DashboardBox popupData={popupData} />} */}
    </div>
  );
};

export default EmailForm;
