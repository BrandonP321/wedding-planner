import React, { createContext, useContext, useState } from "react";

type TabsStore = {
  selectedTabIndex: number;
  setSelectedTabIndex: (index: number) => void;
};

const TabsContext = createContext<TabsStore | undefined>(undefined);

export const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("useTabsContext must be used within a TabsProvider");
  }

  return context;
};

type Props = React.PropsWithChildren<{}>;

export const TabsProvider = ({ children }: Props) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <TabsContext.Provider value={{ selectedTabIndex, setSelectedTabIndex }}>
      {children}
    </TabsContext.Provider>
  );
};
