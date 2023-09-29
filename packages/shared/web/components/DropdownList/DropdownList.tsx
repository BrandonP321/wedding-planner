import React, { useEffect, useRef, useState } from "react";
import styles from "./DropdownList.module.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";

export type DropdownListProps<T> = {
  options: T[] | null;
  onOptionClick?: (option: T) => void;
  /** If provided, will render option as a link */
  getOptionHref?: (option: T) => string;
  children: (option: T) => React.ReactNode;
  staticPosition?: boolean;
  setIsFocused?: (status: boolean) => void;
  clearOptions?: () => void;
};

export const DropdownList = <T extends object>({
  children,
  getOptionHref,
  onOptionClick,
  options,
  staticPosition = false,
  setIsFocused,
  clearOptions,
  ...props
}: DropdownListProps<T>) => {
  const focusedItemsCount = useRef(0);

  const handleClick = (o: T) => {
    onOptionClick && onOptionClick(o);
  };

  const handleBlur = () => {
    focusedItemsCount.current--;

    requestAnimationFrame(() => {
      const isFocused = focusedItemsCount.current > 0;
      setIsFocused?.(isFocused);
    });
  };

  useEffect(() => {
    focusedItemsCount.current = 0;
  }, [options]);

  return (
    <div
      className={classNames(styles.options, !staticPosition && styles.fixed)}
    >
      {options?.map((s, i) => {
        const sharedProps: OptionProps = {
          ...props,
          onClick: () => handleClick(s),
          handleBlur,
          handleFocus: () => {
            focusedItemsCount.current++;
            setIsFocused?.(true);
          },
        };

        if (getOptionHref) {
          return (
            <OptionLink {...sharedProps} key={i} href={getOptionHref(s)}>
              {children(s)}
            </OptionLink>
          );
        } else {
          return (
            <OptionButton {...sharedProps} key={i}>
              {children(s)}
            </OptionButton>
          );
        }
      })}
    </div>
  );
};

type OptionProps = React.PropsWithChildren<{
  onClick?: () => void;
  handleBlur: () => void;
  handleFocus: () => void;
}>;

type OptionLinkProps = OptionProps &
  React.PropsWithChildren<{
    href: string;
  }>;

const OptionLink = ({
  href,
  onClick,
  children,
  handleBlur,
  handleFocus,
}: OptionLinkProps) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={styles.option}
    >
      {children}
    </Link>
  );
};

type OptionButtonProps = OptionProps & React.PropsWithChildren<{}>;

const OptionButton = ({
  handleBlur,
  handleFocus,
  children,
  onClick,
}: OptionButtonProps) => {
  return (
    <button
      onClick={onClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={styles.option}
      type="button"
    >
      {children}
    </button>
  );
};
