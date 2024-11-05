import React from "react";
import styles from "./container.module.css";
interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  return <div className={styles.container}>{children}</div>;
};
