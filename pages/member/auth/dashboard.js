import React from "react";
import { withAuthSync } from "../../../lib/auth";
import nextCookie from "next-cookies";

const Dashboard = (props) => {
  console.log(props);
  return (
    <div>
      <h2>Welcome</h2>
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
