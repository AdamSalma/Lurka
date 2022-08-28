import { createContext, Dispatch, useContext } from "react";
import { useGlobalStateLocalStorage } from "./utils/useLocalStorage";

export type GlobalState = {
  currentBoardId?: string;
  currentThreadId?: string;
  currentTheme?: "light" | "dark";
  clearStateOnNextStart: boolean;
};

const GlobalStateContext =
  createContext<[GlobalState, Dispatch<GlobalState>]>(null);

export const GlobalStateProvider: React.FC<{ initialState: GlobalState }> = ({
  initialState,
  ...restProps
}) => {
  const useLocalStorageState = useGlobalStateLocalStorage(initialState);

  return (
    <GlobalStateContext.Provider value={useLocalStorageState} {...restProps} />
  );
};

/**
 * Hooks
 */
export const useGlobalState = () => {
  const state = useContext(GlobalStateContext) as [
    GlobalState,
    Dispatch<GlobalState>
  ];

  if (!state) {
    throw new Error(
      "useGlobalState must be used within an GlobalStateProvider"
    );
  }

  return state;
};
