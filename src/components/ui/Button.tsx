import type { ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "outline" | "onPrimary" | "outlineOnDark";

interface BaseProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
  to?: undefined;
}

interface ButtonAsLink extends BaseProps {
  to: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", children, className = "" } = props;
  const classes = `${styles.button} ${styles[variant]} ${className}`.trim();

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  const rest: ButtonHTMLAttributes<HTMLButtonElement> = { ...buttonProps };
  delete (rest as Partial<BaseProps>).variant;
  delete (rest as Partial<BaseProps>).children;
  delete (rest as Partial<BaseProps>).className;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
