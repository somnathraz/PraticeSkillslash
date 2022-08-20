import React from "react";
import Head from "next/head";
import styles from "../styles/common.module.css";
import Navbar from "../components/Navbar/Navbar";

const terms = () => {
  return (
    <>
      <Head>
        <title>Refund and Cancellation</title>
      </Head>
      <Navbar course={false} />
      <div className={styles.top}>
        <p>Refunds:</p>
        <p>
          Our policy lasts 15 days. If 15 days have gone by since your purchase,
          unfortunately we can’t offer you a refund or exchange.
        </p>
        <p>
          To complete your return, we require a receipt or proof of purchase.
        </p>
        <p>Refunds (if applicable).</p>
        <p>
          If you are approved, then your refund will be processed, and a credit
          will automatically be applied to your credit card or original method
          of payment, within 5-7 amount of days.
        </p>
        <p>Late or missing refunds (if applicable)</p>
        <p>
          If you haven’t received a refund yet, first check your bank account
          again.
        </p>
        <p>
          Then contact your credit card company, it may take some time before
          your refund is officially posted.
        </p>
        <p>
          Next contact your bank. There is often some processing time before a
          refund is posted.
        </p>
        <p>
          If you’ve done all of this and you still have not received your refund
          yet, please contact us at
        </p>
        <p>info@skillslash.com</p>
      </div>
    </>
  );
};

export default terms;
