import React from "react";
import { withAuthSync } from "../../../lib/auth";

import cookies from "next-cookies";

const Dashboard = ({ initialName, token }) => {
  return (
    <div>
      <h2>Welcome {initialName.replace("@skillslash.com", "")}</h2>
    </div>
  );
};

export default withAuthSync(Dashboard);
Dashboard.getInitialProps = async (ctx) => {
  const { token, USER } = nextCookie(ctx);
  return {
    initialName: USER,
    token: token,
  };
};
