import React, { useEffect, useState } from "react";
import styles from "./select.module.css";

interface SelectProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  options: string[];
  errorMessage?: string;
	reset?: boolean,
  errorCondition?: (value: string) => boolean;
  onValueChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  id,
  name,
  label,
  placeholder = "Выберите...",
  value,
  options,
  errorCondition,
  errorMessage,
  onValueChange,
	reset
}) => {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };

  useEffect(() => {
    if (reset) {
      setTouched(false);
    }
  }, [reset]);
	
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onValueChange(e.target.value);
  };

  const showError = touched && errorCondition && errorCondition(value);

  return (
    <div className={`${styles.selectContainer} ${showError ? styles.hasError : ""}`}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${styles.select}`}
      >
        <option value="" className={styles.selectOption} disabled>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {showError && <span className={styles.errorText}>{errorMessage}</span>}
    </div>
  );
};
