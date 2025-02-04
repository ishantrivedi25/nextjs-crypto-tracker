"use client";

import React from "react";
import styles from "./button.module.css";

function Button({ text, onClick, outlined }) {
  return (
    <div
      className={outlined ? styles.btnOutlined : styles.btn}
      onClick={() => onClick()}
    >
      {text}
    </div>
  );
}

export default Button;
