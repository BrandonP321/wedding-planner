import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Tabs.module.scss";
import { ClassesProp } from "../../utils";
import classNames from "classnames";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";

export type TabsProps = {
  tabs: TabProps[];
  classes?: ClassesProp<"root" | "header" | "content" | "tabBtn">;
};

export const Tabs = ({ tabs, classes }: TabsProps) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const tabBtns = useRef<{ [index: number]: HTMLButtonElement | null }>({});

  const tabContents = useMemo(() => {
    return tabs.map((t) => t.content);
  }, [tabs]);

  useEffect(() => {
    const selectedTabBtn = tabBtns.current[selectedTabIndex];
    if (selectedTabBtn) {
      selectedTabBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedTabIndex]);

  return (
    <div className={classNames(styles.tabs, classes?.root)}>
      <SpaceBetween
        classes={{ root: classNames(styles.header, classes?.header) }}
        responsiveWrap={{ mobile: false }}
      >
        {[...tabs, ...tabs, ...tabs, ...tabs, ...tabs]?.map((tab, i) => {
          const isSelected = i === selectedTabIndex;

          return (
            <button
              key={i}
              ref={(ele) => {
                tabBtns.current[i] = ele;
              }}
              className={classNames(
                styles.tabBtn,
                isSelected && styles.selected,
                classes?.tabBtn
              )}
              onClick={() => setSelectedTabIndex(i)}
            >
              {tab.title}
            </button>
          );
        })}
      </SpaceBetween>
      <div className={classNames(styles.content, classes?.content)}>
        {tabContents?.map((c, i) => (
          <div
            key={i}
            className={classNames(
              styles.content,
              i !== selectedTabIndex && styles.hidden
            )}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  );
};

export type TabProps = {
  title: string;
  content: JSX.Element;
};
