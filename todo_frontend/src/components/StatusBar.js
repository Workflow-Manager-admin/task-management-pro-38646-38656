import React from "react";
import styles from "./StatusBar.module.css";

// PUBLIC_INTERFACE
function StatusBar() {
  /** Renders a simulated mobile status bar. */
  return (
    <div className={styles.statusBar}>
      <span>9:41</span>
      <span>
        <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f403f60f-e672-4364-974a-60158aeee2da" alt="Signal" height={14} style={{ verticalAlign: "middle" }} />
        <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/920a40a6-b5eb-4fd8-8ece-b7533a1abb02" alt="WiFi" height={14} style={{ verticalAlign: "middle" }} />
        <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/1bbb2161-6673-4fc7-b9d8-9ec4a6ecd31d" alt="Battery" height={14} style={{ verticalAlign: "middle" }} />
      </span>
    </div>
  );
}
export default StatusBar;
