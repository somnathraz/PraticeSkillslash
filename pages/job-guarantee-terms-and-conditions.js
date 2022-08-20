import React from "react";
import Head from "next/head";
import styles from "../styles/common.module.css";
import Navbar from "../components/Navbar/Navbar";

const terms = () => {
  return (
    <>
      <Head>
        <title>Job Guarantee terms and condition </title>
      </Head>
      <Navbar course={false} />
      <div className={styles.top}>
        <h1>
          <strong>Job Guarantee Terms and Conditions</strong>
        </h1>

        <ol>
          <li>
            Maintain a minimum 85% attendance in live classes in the entire
            program as well as in each module.
          </li>

          <li>
            Submit all course assignments and exercises within 15 days of
            receiving the task.
          </li>

          <li>
            Complete and submit at least 2 capstone projects within 15 days of
            the completion date of the program.
          </li>

          <li>
            Attend mock interviews, resume building, LinkedIn profile building,
            career mentoring sessions and apply it as per expert guidance.
          </li>

          <li>
            Able to show valid mark sheets and certificates with a minimum 60%
            academic record throughout.
          </li>

          <li>Should have a valid PAN Card and Aadhaar Card.</li>

          <li>
            Must be able to pass background check from your previous
            employers/institutes (if applicable).
          </li>
        </ol>
        <h3>When does Placement Guarantee clause become void?</h3>

        <ul>
          <li>
            If you do not follow through the interview/qualifying process in a
            timely and professional manner.
          </li>

          <li>If you do not apply for jobs referred to you.</li>

          <li>
            If you are unable to complete the program within the specified
            duration of the program.
          </li>

          <li>
            If you do not attend the career preparation sessions arranged for
            you at agreed date and time.
          </li>

          <li>
            If you turn down a job offer with a proposal or if you disagree to
            relocate as per employer’s requirement and turn down the offer.
          </li>

          <li>If you take up another position outside on your own.</li>

          <li>
            If you fail to pass the background check associated with the job
            offer.
          </li>
        </ul>
        <p></p>
        <h3>Refund policy</h3>

        <ul>
          <li>
            You are required to certify that you have met all the terms of this
            job guarantee program and have not been offered any job
            opportunities.
          </li>

          <li>
            Your Placement guarantee program does not stand void due to any of
            the circumstances mentioned above.
          </li>

          <li>
            After you have complied with all the terms and conditions applicable
            thereof, and have not received an offer for a position within the
            guarantee period (6 months from course completion), you may request
            a refund of your tuition fee.{" "}
          </li>

          <li>
            The request form must be submitted within ten days after the end of
            your Career Services Period.
          </li>
        </ul>
        <p>
          Note: Refunds, upon approval by Skillslash, will be processed within
          thirty business days to the original source of payment, excluding
          taxes.
        </p>
        <p>
          We assure you a new job in the data domain or a career progression
          within your existing industry such that your minimum annual salary is
          5 lakhs
        </p>
      </div>
    </>
  );
};

export default terms;
