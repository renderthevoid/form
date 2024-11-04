

import React from "react";
import styles from "./button.module.css";

interface BaseButtonProps {
  variant?: "primary" | "outline";
  className?: string;
}

interface AnchorButtonProps
  extends BaseButtonProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

interface HTMLButtonProps
  extends BaseButtonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

type ButtonProps = AnchorButtonProps | HTMLButtonProps;

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const css = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  if ("href" in props) {
    return <a className={css} {...props} />;
  }

  if ("onClick" in props) {
    return <button className={css} {...props} />;
  }

  return (
    <span
      className={css}
      {...(props as React.HTMLAttributes<HTMLSpanElement>)}
    />
  );
}
