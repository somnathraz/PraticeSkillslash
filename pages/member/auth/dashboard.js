import React from "react";
import { withAuthSync } from "../../../lib/auth";

import cookies from "next-cookies";

const Dashboard = ({ initialName }) => {
  return (
    <div>
      <h2>Welcome {initialName.replace("@skillslash.com", "")}</h2>
    </div>
  );
};

export default withAuthSync(Dashboard);
Dashboard.getInitialProps = async (ctx) => {
  return {
    initialName: cookies(ctx).USER || "",
  };
};
