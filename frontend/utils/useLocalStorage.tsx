import { Dispatch, useEffect, useState } from "react";

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  // initialize the value from localStorage, also parsing it to a data type (e.g. [] or {}) if possible
  const [currentValue, setCurrentValue] = useState<T>(() => {
    let value: T | string = initialValue;
    try {
      value = localStorage.getItem(key);
    } catch (e) {
      console.warn(e);
    }

    try {
      value = JSON.parse(value as string);
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `Failed to parse using JSON.stringify for value: ${value}. Error was:`,
          e
        );
      }
    }

    return value as T;
  });

  // update localStorage with string when the currentValue changes via setCurrentValue
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(currentValue));
    } catch (e) {
      console.warn(e);
    }
  }, [key, currentValue]);

  return [currentValue, setCurrentValue] as [any, Dispatch<any>];
};

//
// Keep all implementations below for easy maintainance:
//

export const useGlobalStateLocalStorage = (initialValue) =>
  useLocalStorage("lurka-global-state", initialValue);
