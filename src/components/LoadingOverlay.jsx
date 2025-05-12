// LoadingOverlay.js
import React from "react";
import styles from "../styles/LoadingOverlay.module.css";

const LoadingOverlay = () => {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingOverlay;