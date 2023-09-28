import React from "react";
import Login from "./Login";
import Register from "./Register";

export default function Auth({ token }) {
  return (
    <div>
      <Login token={token} />
      <Register token={token} />
    </div>
  );
}
