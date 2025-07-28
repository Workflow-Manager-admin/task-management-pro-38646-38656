import React from "react";
import styles from "./NavigasiBar.module.css";

// PUBLIC_INTERFACE
function NavigasiBar({ selected, onSelect }) {
  /**
   * Bottom tabs for All/Completed, minimalistic tab bar.
   * @param {string} selected - Which tab is active ('all'|'completed')
   * @param {function} onSelect - Callback on tab select
   */
  return (
    <nav className={styles.navigasiBar} aria-label="Task Filter Tabs">
      <button
        className={`${styles.tab} ${selected === "all" ? styles.active : ""}`}
        aria-label="Show All ToDos"
        aria-current={selected === "all"}
        type="button"
        onClick={() => onSelect("all")}
      >
        All
      </button>
      <button
        className={`${styles.tab} ${selected === "completed" ? styles.completed : ""} ${selected === "completed" ? styles.active : ""}`}
        aria-label="Show Completed ToDos"
        aria-current={selected === "completed"}
        type="button"
        onClick={() => onSelect("completed")}
      >
        Completed
      </button>
    </nav>
  );
}

export default NavigasiBar;
