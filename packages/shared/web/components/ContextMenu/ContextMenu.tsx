import React, { useEffect, useRef } from "react";
import styles from "./ContextMenu.module.scss";
import { ClassesProp } from "../../utils";
import classNames from "classnames";

export type ContextMenuOption = {
  label: string;
  onClick: () => void;
};

export type ContextMenuProps = {
  show: boolean;
  hide: () => void;
  options: ContextMenuOption[];
  classes?: ClassesProp<"root">;
};

export const ContextMenu = (props: ContextMenuProps) => {
  const { options, show, classes, hide } = props;

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      hide();
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // TODO: Make this dynamic based on where the menu is on the screen
  const isAbove = false;
  const isToRight = true;

  return (
    <div
      ref={menuRef}
      className={classNames(
        styles.menu,
        classes?.root,
        !show && styles.hide,
        isAbove ? styles.top : styles.bottom,
        isToRight ? styles.right : styles.left
      )}
      style={{ display: props.show ? "block" : "none" }}
    >
      {options.map((option, i) => (
        <button key={i} className={styles.option} onClick={option.onClick}>
          {option.label}
        </button>
      ))}
    </div>
  );
};
