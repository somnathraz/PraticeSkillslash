import React, { useEffect } from "react";

import cookies from "next-cookies";
import { useRouter } from "next/router";

const Dashboard = ({ initialName }) => {
  const router = useRouter();

  useEffect(() => {
    if (initialName === "") {
      router.push("/member/auth");
    }
  });

  return (
    <div>
      <h2>Welcome {initialName.replace("@skillslash.com", "")}</h2>
    </div>
  );
};

export default Dashboard;
Dashboard.getInitialProps = async (ctx) => {
  return {
    initialName: cookies(ctx).USER || "",
  };
};
