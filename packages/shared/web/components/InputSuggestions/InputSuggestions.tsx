import React, { useEffect, useRef, useState } from "react";
import styles from "./InputSuggestions.module.scss";
import { MapReq } from "../../../common/api/requests/maps.requests";
import { Link } from "react-router-dom";
import classNames from "classnames";

export type InputSuggestionsProps<T> = {
  suggestions: T[] | null;
  onSuggestionClick?: (suggestion: T) => void;
  /** If provided, will render suggestion as a link */
  getSuggestionHref?: (suggestion: T) => string;
  children: (suggestion: T) => React.ReactNode;
  staticPosition?: boolean;
  setIsFocused?: (status: boolean) => void;
  clearSuggestions?: () => void;
};

export const InputSuggestions = <T extends object>({
  children,
  getSuggestionHref,
  onSuggestionClick,
  suggestions,
  staticPosition = false,
  setIsFocused,
  clearSuggestions,
  ...props
}: InputSuggestionsProps<T>) => {
  const focusedItemsCount = useRef(0);

  const handleClick = (s: T) => {
    onSuggestionClick && onSuggestionClick(s);
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
  }, [suggestions]);

  return (
    <div
      className={classNames(
        styles.suggestions,
        !staticPosition && styles.fixed
      )}
    >
      {suggestions?.map((s, i) => {
        const sharedProps: SuggestionProps = {
          ...props,
          onClick: () => handleClick(s),
          handleBlur,
          handleFocus: () => {
            focusedItemsCount.current++;
            setIsFocused?.(true);
          },
        };

        if (getSuggestionHref) {
          return (
            <SuggestionLink
              {...sharedProps}
              key={i}
              href={getSuggestionHref(s)}
            >
              {children(s)}
            </SuggestionLink>
          );
        } else {
          return (
            <SuggestionButton {...sharedProps} key={i}>
              {children(s)}
            </SuggestionButton>
          );
        }
      })}
    </div>
  );
};

type SuggestionProps = React.PropsWithChildren<{
  onClick?: () => void;
  handleBlur: () => void;
  handleFocus: () => void;
}>;

type SuggestionLinkProps = SuggestionProps &
  React.PropsWithChildren<{
    href: string;
  }>;

const SuggestionLink = ({
  href,
  onClick,
  children,
  handleBlur,
  handleFocus,
}: SuggestionLinkProps) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={styles.suggestion}
    >
      {children}
    </Link>
  );
};

type SuggestionButtonProps = SuggestionProps & React.PropsWithChildren<{}>;

const SuggestionButton = ({
  handleBlur,
  handleFocus,
  children,
  onClick,
}: SuggestionButtonProps) => {
  return (
    <button
      onClick={onClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={styles.suggestion}
      type="button"
    >
      {children}
    </button>
  );
};
