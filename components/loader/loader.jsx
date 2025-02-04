import { CircularProgress } from "@mui/material";
import React from "react";
import styles from "./loader.module.css";

function Loader() {
  return (
    <div className={styles.loaderBackground}>
      <CircularProgress />
    </div>
  );
}

export default Loader;
