import { useRef, useState } from "react";
import EmojiMenu from "../emoji-menu";
import UploadImage from "../upload-image";
import "./styles.css";

export default function SendMessage({ socket, userName }) {
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);

  function submitHandler(event) {
    event.preventDefault();

    if (!inputRef.current) return;
    if (!inputRef.current.value && !image) return;

    socket.emit("send message", {
      from: userName,
      info: inputRef.current.value,
      image,
    });
    inputRef.current.value = "";
    deselectImage();
  }

  function addCharacter(char) {
    return () => {
      if (inputRef.current) {
        inputRef.current.value += char;
      }
      inputRef.current?.focus();
    };
  }

  function selectImage(newImage) {
    setImage(newImage);
  }

  function deselectImage() {
    setImage(null);
  }

  return (
    <div className="send-message">
      <form className="send-message__form" onSubmit={submitHandler}>
        <UploadImage selectImage={selectImage} />
        <EmojiMenu enterEmoji={addCharacter} />
        <input
          className="send-message__input"
          ref={inputRef}
          placeholder="Enter your message"
        />
        <button type="submit" className="send-message__button">
          <svg
            className="send-message__icon"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
          >
            <path
              d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"
              fill="var(--message-from-me-bg-color)"
            />
          </svg>
        </button>
      </form>
      {image && (
        <div className="selected-image-container">
          <img className="selected-image" src={URL.createObjectURL(image)} />
          <button className="deselect-image-button" onClick={deselectImage}>&times;</button>
        </div>
      )}
    </div>
  );
}
