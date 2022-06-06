import { io } from "socket.io-client";
import { lazy, Suspense, useState } from "react";

import "./styles.css";

const Messages = lazy(() => import("./components/chat"));
const Register = lazy(() => import("./components/register"));

const socket = io();

export default function App() {
  const [userName, setUserName] = useState("");

  return userName ? (
    <Suspense fallback="Loading...">
      <Messages socket={socket} userName={userName} />
    </Suspense>
  ) : (
    <Suspense fallback="Loading...">
      <Register socket={socket} userNameHandler={setUserName} />
    </Suspense>
  );
}
