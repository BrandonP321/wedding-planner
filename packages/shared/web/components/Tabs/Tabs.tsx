import { useEffect, useMemo, useRef } from "react";
import styles from "./Tabs.module.scss";
import { ClassesProp } from "../../utils";
import classNames from "classnames";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";
import { TabsProvider, useTabsContext } from "./TabsProvider/TabsProvider";

export type TabsProps = {
  tabs: TabProps[];
  onTabChange?: (index: number) => void;
  hideTabs?: boolean;
  classes?: ClassesProp<"root" | "header" | "content" | "tabBtn">;
};

export const Tabs = (props: TabsProps) => (
  <TabsProvider>
    <TabsInternal {...props} />
  </TabsProvider>
);

/**
 * Returns a <Tabs> component without a <TabsProvider> wrapper.
 * A <TabsProvider> must be provided somewhere higher up in the component tree.
 */
export const TabsWithoutProvider = (props: TabsProps) => (
  <TabsInternal {...props} />
);

function TabsInternal({ tabs, classes, onTabChange, hideTabs }: TabsProps) {
  const { selectedTabIndex, setSelectedTabIndex } = useTabsContext();

  const tabBtns = useRef<{ [index: number]: HTMLButtonElement | null }>({});
  const hasTabBeenManuallySelected = useRef(false);

  const tabContents = useMemo(() => {
    return tabs.map((t) => t.content);
  }, [tabs]);

  useEffect(() => {
    onTabChange?.(selectedTabIndex);

    if (hasTabBeenManuallySelected.current) {
      const selectedTabBtn = tabBtns.current[selectedTabIndex];
      if (selectedTabBtn) {
        selectedTabBtn.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [selectedTabIndex]);

  return (
    <div className={classNames(styles.tabs, classes?.root)}>
      {!hideTabs && (
        <SpaceBetween
          classes={{ root: classNames(styles.header, classes?.header) }}
          responsiveWrap={{ mobile: false }}
        >
          {tabs?.map((tab, i) => {
            const isSelected = i === selectedTabIndex;

            return (
              <button
                key={i}
                type="button"
                ref={(ele) => {
                  tabBtns.current[i] = ele;
                }}
                className={classNames(
                  styles.tabBtn,
                  isSelected && styles.selected,
                  classes?.tabBtn
                )}
                onClick={() => {
                  hasTabBeenManuallySelected.current = true;
                  setSelectedTabIndex(i);
                }}
              >
                {tab.title}
              </button>
            );
          })}
        </SpaceBetween>
      )}
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
}

export type TabProps = {
  title: string;
  content: JSX.Element;
};
