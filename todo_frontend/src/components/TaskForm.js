import React, { useState, useEffect, useRef } from "react";
import styles from "./TaskForm.module.css";

/**
 * PUBLIC_INTERFACE
 * TaskForm is a controlled form for both Add/Edit.
 * @param {object} initialValues - { title, detail }
 * @param {function} onSubmit - function({title, detail})
 * @param {string} submitLabel - Button label
 * @param {function} onCancel - Cancel/back handler
 */
function TaskForm({ initialValues = {}, onSubmit, submitLabel, onCancel }) {
  const [title, setTitle] = useState(initialValues.title || "");
  const [detail, setDetail] = useState(initialValues.detail || "");
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus first field on mount
    if (inputRef.current) inputRef.current.focus();
  }, []);
  useEffect(() => {
    setTitle(initialValues.title || "");
    setDetail(initialValues.detail || "");
  }, [initialValues.title, initialValues.detail]);

  return (
    <form
      className={styles.form}
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();
        if (title.trim() !== "") onSubmit({ title: title.trim(), detail: detail.trim() });
      }}
      aria-label={submitLabel + " Task Form"}
    >
      <label className={styles.label} htmlFor="todo-title-input">
        Title
      </label>
      <input
        id="todo-title-input"
        className={styles.textInput}
        type="text"
        placeholder="Enter title..."
        maxLength={60}
        value={title}
        ref={inputRef}
        onChange={e => setTitle(e.target.value)}
        required
        aria-required="true"
      />
      <label className={styles.label} htmlFor="todo-detail-input">
        Detail
      </label>
      <input
        id="todo-detail-input"
        className={styles.detailInput}
        type="text"
        placeholder="Add detail..."
        maxLength={120}
        value={detail}
        onChange={e => setDetail(e.target.value)}
        aria-required="false"
      />
      <div className={styles.buttonsRow}>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={title.trim() === ""}
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancel}
            tabIndex={0}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
