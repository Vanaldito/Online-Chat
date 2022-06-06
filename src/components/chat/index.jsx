import SendMessage from "../send-message";
import { useState, useEffect, useRef } from "react";

import "./styles.css";

export default function Chat({ socket, userName }) {
  const [messages, setMessages] = useState([]);
  const messagesEnd = useRef(null);

  function scrollDown() {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    socket.on("get messages", (newMessages) => {
      setMessages(newMessages);
      scrollDown()
    });
    socket.emit("get messages");

    return () => {
      socket.disconnect();
    }
  }, []);


  return (
    <div className="chat-container">
      <h2 className="chat-container__heading">Welcome, {userName}</h2>
      <div className="chat">
        <ol className="messages">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`message message--${
                message.from === userName ? "from-me" : "from-another"
              }`}
            >
              {message.image && <img className="message-image" onLoad={scrollDown} src={URL.createObjectURL(new Blob([message.image]))} />}
              <span className="message__from">{message.from}: </span>
              {message.info}
            </li>
          ))}
          <li ref={messagesEnd} />
        </ol>
        <SendMessage socket={socket} userName={userName} />
      </div>
    </div>
  );
}
