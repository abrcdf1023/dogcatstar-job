"use client";

import * as React from "react";

import { SWRConfig } from "swr";
import ErrorToast from "../../common/ErrorToast";

export interface SWRProviderProps {}

export const SWRProvider = (props: React.PropsWithChildren<SWRProviderProps>) => {
  const { children } = props;
  const [showError, setShowError] = React.useState(false);
  const timer = React.useRef<NodeJS.Timeout>();

  const handleError = () => {
    setShowError(true);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  return (
    <SWRConfig
      value={{
        onError: handleError,
      }}
    >
      {showError && <ErrorToast />}
      {children}
    </SWRConfig>
  );
};
