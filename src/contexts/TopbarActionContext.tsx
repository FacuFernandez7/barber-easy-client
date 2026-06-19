"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const TopbarActionValueContext = createContext<ReactNode>(null);
const TopbarActionSetterContext = createContext<(action: ReactNode) => void>(() => {});

export function TopbarActionProvider({ children }: { children: ReactNode }) {
  const [action, setAction] = useState<ReactNode>(null);
  return (
    <TopbarActionSetterContext.Provider value={setAction}>
      <TopbarActionValueContext.Provider value={action}>
        {children}
      </TopbarActionValueContext.Provider>
    </TopbarActionSetterContext.Provider>
  );
}

export function useTopbarAction(action: ReactNode) {
  const setAction = useContext(TopbarActionSetterContext);
  useEffect(() => {
    setAction(action);
    return () => setAction(null);
  }, [action, setAction]);
}

export function useTopbarActionValue() {
  return useContext(TopbarActionValueContext);
}
