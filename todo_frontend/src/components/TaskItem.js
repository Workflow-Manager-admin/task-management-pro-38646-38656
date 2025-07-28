import React from "react";
import styles from "./TaskItem.module.css";

// PUBLIC_INTERFACE
function TaskItem({
  title,
  detail,
  completed,
  onComplete,
  onEdit,
  onDelete,
  "aria-posinset": posinset,
  "aria-setsize": setsize
}) {
  /**
   * TaskItem for display in list.
   * @param {string} title - Main task title.
   * @param {string} detail - Subtitle/detail.
   * @param {boolean} completed - Whether the task is completed.
   * @param {function} onComplete - Complete button handler.
   * @param {function} onEdit - Edit button handler.
   * @param {function} onDelete - Delete button handler.
   */
  return (
    <div
      className={styles.todoItem}
      role="listitem"
      aria-label={title}
      aria-posinset={posinset}
      aria-setsize={setsize}
      aria-checked={completed}
      tabIndex={0}
    >
      <div className={styles.todoTitleBlock}>
        <span className={styles.todoTitle}>{title}</span>
        <span className={styles.todoSubtitle}>{detail}</span>
      </div>
      <div className={styles.todoActions}>
        {onEdit && (
          <button className={styles.todoActionBtn} aria-label="Edit Task" onClick={onEdit}>
            <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/5ccdf188-bfa5-4702-b083-b003e53ef470" alt="Edit" />
          </button>
        )}
        {onDelete && (
          <button className={styles.todoActionBtn} aria-label="Delete Task" onClick={onDelete}>
            <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/48b1bbc8-e7e9-4534-a627-0ac64160ea18" alt="Delete" />
          </button>
        )}
        {!completed && onComplete && (
          <button className={styles.todoActionBtn} aria-label="Complete Task" onClick={onComplete}>
            <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e166d4cd-2f0c-48bc-b3f3-520dc596d481" alt="Complete" />
          </button>
        )}
      </div>
    </div>
  );
}
export default TaskItem;
