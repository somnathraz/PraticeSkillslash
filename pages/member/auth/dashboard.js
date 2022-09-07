import React from "react";

import nextCookie from "next-cookies";

const Dashboard = ({ initialName, token }) => {
  return (
    <div>
      <h2>Welcome {initialName.replace("@skillslash.com", "")}</h2>
    </div>
  );
};

export default Dashboard;
Dashboard.getInitialProps = async (ctx) => {
  const { token, USER } = nextCookie(ctx);
  return {
    initialName: USER,
    token: token,
  };
};
