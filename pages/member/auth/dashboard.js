import React from "react";
import { withAuthSync } from "../../../lib/auth";
import { useState, useRef } from "react";
import DatePicker from "react-datepicker";

const Dashboard = (props) => {
  const discountPercentRef = useRef();
  const couponLengthRef = useRef();
  console.log(props);
  const [startDate, setStartDate] = useState();
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState();
  const [validCoupon, setValidCoupon] = useState({
    success: false,
    msg: "Coupon code will visible here",
  });

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function generateString(length) {
    console.log("string");
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  async function submitHandler(event) {
    event.preventDefault();
    const discountPercent = discountPercentRef.current.value;
    const couponLength = couponLengthRef.current.value;
    const expireDate = startDate;
    setLoading(true);
    const coupon = (generateString(couponLength) + discountPercent).trim();
    setCouponCode(coupon);
    console.log(coupon, "inside handler");
    try {
      const response = await fetch("/api/Database/getUserName", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discountPercent: discountPercent,
          couponCode: coupon,
          expireAt: expireDate,
        }),
      });
      if (response.status === 200) {
        setValidCoupon({ success: true, msg: "successfully created" });
      } else if (response.status === 409) {
        setValidCoupon({ success: true, msg: "coupon already exist" });
      }
    } catch (err) {
      console.error(
        "You have an error in your code or there are network issues.",
        err
      );
    }
    setLoading(false);
  }
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  console.log(validCoupon);
  return (
    <div>
      <h2>Welcome {props.token.replace("@skillslash.com", "")}</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="percent">Enter the Discount Percent </label>
          <input
            type="number"
            id="percent"
            required
            ref={discountPercentRef}
            placeholder="e.g.(12)"
          />
        </div>
        <div>
          <label htmlFor="length">Enter Coupon length</label>
          <input type="number" id="length" required ref={couponLengthRef} />
        </div>
        <div>
          <label htmlFor="Expire">Enter Coupon Expire Date</label>
          <DatePicker
            selected={startDate}
            name="dateTime"
            id="dateTime"
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeIntervals={15}
            filterTime={filterPassedTime}
            minDate={new Date()}
            placeholderText="Select Date and Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            required
          />
        </div>
        <div>
          {loading ? (
            <div className="loader">Loading...</div>
          ) : (
            <button>Generate Coupon</button>
          )}
        </div>
      </form>
      {validCoupon.success ? <p>{couponCode}</p> : <p>{validCoupon.msg}</p>}
    </div>
  );
};

export default withAuthSync(Dashboard);
// Dashboard.getInitialProps = async (ctx) => {
//   const { token, USER } = nextCookie(ctx);
//   return {
//     initialName: USER,
//     token: token,
//   };
// };
