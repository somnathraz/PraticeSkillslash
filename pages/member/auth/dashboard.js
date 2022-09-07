import React from "react";

import nextCookie from "next-cookies";

const Dashboard = () => {
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
