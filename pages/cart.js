import Image from "next/image";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
import axios from "axios";
import {
  decrementQuantity,
  removeFromCart,
  deleteCart,
} from "../redux/cart.slice";
import styles from "../styles/CartPage.module.css";
import PaymentForm from "../components/PaymentForm/PaymentForm";
import clientPromise from "../lib/mongodb";

const CartPage = ({ isConnected }) => {
  const [payment, setPayments] = useState(false);
  const couponDataCartRef = useRef();
  const [loading, setLoading] = useState(false);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    dateTime: new Date(),
  });

  const [discount, setDiscount] = useState();
  const [discountMsg, setDiscountMsg] = useState("");

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) =>
        parseFloat(accumulator + item.quantity * item.price).toLocaleString(
          "en-US"
        ),
      0
    );
  };
  const getDiscountPrice = () => {
    return cart.reduce(
      (accumulator, item) =>
        parseFloat(
          (discount / 100) * (accumulator + item.quantity * item.price)
        ).toLocaleString("en-US"),
      0
    );
  };
  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API

    const data = await fetch("/api/razorpay", {
      method: "POST",
      body: JSON.stringify({ prop: cart }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((t) => t.json());

    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Skillslash Pvt Ltd",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: `Thank you for Enrolling in our ${data.name}`,
      image:
        "https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/logo.ico",
      handler: async function (response) {
        const paymentData = {
          orderCreationId: data.id,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          name: details.name,
          email: details.email,
          phone: details.phone,
          courseName: data.name,
        };

        // Validate payment at server - using webhooks is a better idea.
        const result = await axios.post(
          "http://localhost:3000/api/success",
          paymentData
        );

        // console.log(result, "verifyData");
        // console.log(
        //   response.razorpay_payment_id + "id",
        //   "/n",
        //   response.razorpay_order_id + "orderid",
        //   "/n",
        //   response.razorpay_signature + "signature"
        // );

        //sending data to db//
        const dbSend = await axios.post(
          "http://localhost:3000/api/databaseAuth",
          paymentData
        );

        // console.log(dbSend, "database data");
        setPayments(true);
      },
      prefill: {
        name: details.name,
        email: details.email,
        contact: details.phone,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const verifiedPayment = async () => {
    const data = await fetch("/api/success", {
      method: "POST",
    }).then((t) => t.json());
    // console.log(data);
  };

  async function submitHandler(event) {
    event.preventDefault();
    console.log("handler");
    const couponDataCode = couponDataCartRef.current.value;

    if (couponDataCode === "") {
      setDiscountMsg("Enter coupon code");
      return;
    } else {
      setLoading(true);
      try {
        const response = await fetch("/api/Database/getCoupon", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            couponCode: couponDataCode,
          }),
        });
        if (response.status === 200) {
          const { couponName, msg } = await response.json();
          console.log(typeof parseInt(couponName.discountPercent), "FrontEnd");
          setDiscount(parseInt(couponName.discountPercent));
          setDiscountMsg(msg);
        } else if (response.status === 404) {
          setDiscountMsg("Coupon Not Valid");
        }
      } catch (err) {
        console.error(
          "You have an error in your code or there are network issues.",
          err
        );
      }
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>cart-skillslash</title>
      </Head>
      <>
        <div className={styles.header}>
          <div>Image</div>
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Actions</div>
          <div>Total Price</div>
        </div>
        {cart.map((item) => (
          <div className={styles.body} key={item.id}>
            <div className={styles.image}>
              <Image src={item.image} height="90" width="65" alt="hello" />
            </div>
            <p>{item.name}</p>
            <p>₹ {item.price.toLocaleString("en-US")}</p>
            <p>{item.quantity}</p>
            <div className={styles.buttons}>
              <button onClick={() => dispatch(decrementQuantity(item.id))}>
                -
              </button>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                x
              </button>
            </div>
            <p>
              ₹ {parseFloat(item.quantity * item.price).toLocaleString("en-US")}
            </p>
          </div>
        ))}
        <form onSubmit={submitHandler}>
          <div>
            <input
              type="text"
              id="percent"
              required
              ref={couponDataCartRef}
              placeholder="Enter Promo code"
            />
            {discountMsg === "" ? "" : <p>{discountMsg}</p>}
          </div>
          <div>
            {loading ? (
              <div className="loader">Loading...</div>
            ) : (
              <button type="submit">Apply Coupon</button>
            )}
          </div>
        </form>

        <h2>
          Grand Total: ₹{" "}
          {discount === "" ? getTotalPrice() : getDiscountPrice()}
        </h2>

        <PaymentForm setDetails={setDetails} />
        <button
          onClick={() => {
            makePayment();
            dispatch(deleteCart);
          }}
        >
          CheckOut
        </button>
        <button>verify</button>
      </>
    </div>
  );
};

export default CartPage;
export async function getServerSideProps(context) {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
