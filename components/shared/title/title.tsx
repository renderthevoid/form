import React from "react";
import styles from "./title.module.css";

type TitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface Props {
  size?: TitleSize;
  className?: string;
  text: string;
}

export const Title: React.FC<Props> = ({ text, size = "sm", className }) => {
  const mapTagBySize = {
    xs: "h5",
    sm: "h4",
    md: "h3",
    lg: "h2",
    xl: "h1",
    "2xl": "h1",
  } as const;

  const mapClassNameBySize = {
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
  } as const;

  const Tag = mapTagBySize[size];

  return React.createElement(
    Tag,
    {
      className:
        `${styles[mapClassNameBySize[size]]} ${className || ""}`.trim(),
    },
    text,
  );
};
