import React, { useEffect, useState } from "react";
import styles from "./input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  value: string;
  placeholder?: string;
  multiline?: boolean;
  reset?: boolean;
  errorCondition?: (value: string) => boolean;
  onValueChange: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  errorCondition,
  errorMessage,
  value,
  onValueChange,
  className,
  placeholder,
  multiline,
  reset,
  ...props
}) => {
  const [touched, setTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    setIsFocused(false);
  };

  useEffect(() => {
    if (reset) {
      setTouched(false);
    }
  }, [reset]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onValueChange(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const showError =
    !isFocused && touched && errorCondition ? errorCondition(value) : false;

  return (
    <div
      className={`${styles.inputContainer} ${showError ? styles.hasError : ""} ${className || ""}`}
    >
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {multiline ? (
          <textarea
            className={`${styles.textarea} ${className || ""}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder}
            value={value}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            className={`${styles.input} ${className || ""}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder}
            value={value}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {showError && <span className={styles.errorText}>{errorMessage}</span>}
      </div>
    </div>
  );
};
