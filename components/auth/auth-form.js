import { useState, useRef } from "react";

import classes from "./auth-form.module.css";
import { login } from "../../lib/auth";
import { useRouter } from "next/router";

function AuthForm() {
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [error, setError] = useState({
    password: false,
    user: false,
  });
  const [loading, setLoading] = useState(false);
  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setLoading(true);
    // optional: Add validation
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: enteredEmail,
          password: enteredPassword,
        }),
      });
      if (response.status === 200) {
        const { token, user } = await response.json();

        login({ token, user }, true);
        router.push("/member/auth/dashboard");
      } else if (response.status === 404) {
        const { message } = await response.json();
        setError({ ...error, user: true });
      } else if (response.status === 401) {
        const { message } = await response.json();
        setError({ ...error, password: true });
      } else {
        console.log("Login failed.");
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (err) {
      console.error(
        "You have an error in your code or there are network issues.",
        err
      );
    }
    setLoading(false);
  }

  return (
    <section className={classes.auth}>
      <h1> Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            onChange={() => setError({ password: false, user: false })}
          />
          {error.user ? <p className={classes.error}>user not exist</p> : ""}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={() => setError({ password: false, user: false })}
            ref={passwordInputRef}
          />
          {error.password ? (
            <p className={classes.error}>Incorrect Password</p>
          ) : (
            ""
          )}
        </div>
        <div className={classes.actions}>
          <button>
            {" "}
            {loading ? <div className="loader">Loading...</div> : "Log in"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
