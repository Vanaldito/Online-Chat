import { useState } from "react";
import "./styles.css";

export default function Register({ socket, userNameHandler }) {
  const [userName, setUserName] = useState("");

  function submitHandler(event) {
    event.preventDefault();

    if (userName) userNameHandler(userName);
  }

  function changeHandler(event) {
    setUserName(event.target.value);
  }

  return (
    <form className="register-form" onSubmit={submitHandler}>
      <input className="register-form__input" placeholder="Enter your name" onChange={changeHandler} />
      <button className="register-form__button">Register</button>
    </form>
  )
}
