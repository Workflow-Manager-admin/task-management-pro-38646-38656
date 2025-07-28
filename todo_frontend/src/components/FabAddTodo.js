import React from "react";
import styles from "./FabAddTodo.module.css";

// PUBLIC_INTERFACE
function FabAddTodo({ onClick }) {
  /**
   * Floating Action Button for "Add ToDo"
   * @param {function} onClick - Handler for click event.
   */
  return (
    <button className={styles.fab} aria-label="Add New ToDo" onClick={onClick}>
      <span className={styles.plusIcon}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/019924ed-9c92-457b-b452-f439ea861fd8"
          width={21}
          height={23.6}
          alt="+"
        />
      </span>
    </button>
  );
}

export default FabAddTodo;
