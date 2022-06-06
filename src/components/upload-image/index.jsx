import { useState } from "react";
import "./styles.css";

export default function UploadImage({ selectImage }) {
  function changeHandler(event) {
    const files = event.target.files;
    const image = files.length && files[0];

    if (image && image.type.startsWith("image/") && image.size < 1e8) {
      selectImage(image);
    }
  }

  return (
    <>
      <label className="upload-image" htmlFor="upload-image-input">
        <svg viewBox="0 0 36 36" height="28px" width="28px">
          <path d="M13.5 16.5a2 2 0 100-4 2 2 0 000 4z" fill="#0084ff"></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 12v12a4 4 0 004 4h14a4 4 0 004-4V12a4 4 0 00-4-4H11a4 4 0 00-4 4zm18-1.5H11A1.5 1.5 0 009.5 12v9.546a.25.25 0 00.375.217L15 18.803a6 6 0 016 0l5.125 2.96a.25.25 0 00.375-.217V12a1.5 1.5 0 00-1.5-1.5z"
            fill="#0084ff"
          />
        </svg>
      </label>
      <input type="file" visibility="hidden" id="upload-image-input" onChange={changeHandler} accept="image/*" />
    </>
  );
}
