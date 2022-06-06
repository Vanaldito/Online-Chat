import { useRef, useState } from "react";
import emojis from "../../constants/emojis";
import "./styles.css";

export default function EmojiMenu({ enterEmoji }) {
  const sectionNames = Object.keys(emojis);

  const [showMenu, setShowMenu] = useState(false);
  const [section, setSection] = useState(sectionNames[0]);
  const emojiMenuRef = useRef(null);

  function toogleMenu() {
    function clickOutsideHandler(event) {
      if (!emojiMenuRef.current?.contains(event.target)) {
        event.stopPropagation();
        setShowMenu(false);
        window.removeEventListener("click", clickOutsideHandler, true);
      }
    }

    if (!showMenu) {
      setShowMenu(!showMenu);
      window.addEventListener("click", clickOutsideHandler, true);
    }
  }

  function changeSection(newSection) {
    return () => setSection(newSection);
  }

  return (
    <div className="emoji-menu-container">
      <button className="emoji-menu-button" type="button" onClick={toogleMenu}>
        <svg
          height="28px"
          viewBox="0 0 36 36"
          width="28px"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 29c6.075 0 11-4.925 11-11S24.075 7 18 7 7 11.925 7 18s4.925 11 11 11zm-5.25-13c0-1.25.563-2 1.5-2 .938 0 1.5.75 1.5 2s-.563 2-1.5 2c-.938 0-1.5-.75-1.5-2zm7.5 0c0-1.25.563-2 1.5-2 .938 0 1.5.75 1.5 2s-.563 2-1.5 2c-.938 0-1.5-.75-1.5-2zm-7.52 5.464a1 1 0 011.41-.12 5.963 5.963 0 003.856 1.406c1.47 0 2.813-.528 3.856-1.406a1 1 0 111.288 1.53 7.962 7.962 0 01-5.144 1.876 7.962 7.962 0 01-5.144-1.877 1 1 0 01-.121-1.409z"
            fill="#0084ff"
          ></path>
        </svg>
      </button>
      {showMenu && (
        <div className="emoji-menu" ref={emojiMenuRef}>
          <ul className="emojis">{emojis[section].map((emoji, index) => (
            <li className="emoji" onClick={enterEmoji(emoji)} key={index}>
              {emoji}
            </li>
          ))}</ul>
          <ul className="emoji-sections">
            {sectionNames.map((sectionName) => (
              <li className="emoji" onClick={changeSection(sectionName)} key={sectionName}>{emojis[sectionName][0]}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
