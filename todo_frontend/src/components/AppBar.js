import React from "react";
import styles from "./AppBar.module.css";

// PUBLIC_INTERFACE
function AppBar({ title, rightIcon, onBack, showBack }) {
  /**
   * AppBar displays a fixed title and optional icon or back button.
   *
   * @param {string} title - Bar title text.
   * @param {React.Element} rightIcon - Optional right-side icon/component.
   * @param {function} onBack - Optional back button click callback.
   * @param {boolean} showBack - Whether to show the back button.
   */
  return (
    <header className={styles.appBar}>
      {showBack && (
        <button className={styles.turnBackBtn} aria-label="Back" onClick={onBack}>
          <img
            src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/ffb06281-e064-47cb-b686-7805264e3ff4"
            width={25}
            height={25}
            alt="Back"
            style={{ verticalAlign: "middle" }}
          />
        </button>
      )}
      <span className={styles.title}>{title}</span>
      {rightIcon ? <span className={styles.rightIcon}>{rightIcon}</span> : null}
    </header>
  );
}

export default AppBar;
