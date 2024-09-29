"use client";

import * as React from "react";

import { SWRConfig, SWRConfiguration } from "swr";
import ErrorToast from "../../common/ErrorToast";

export interface SWRProviderProps {
  value?: SWRConfiguration | ((parentConfig?: SWRConfiguration | undefined) => SWRConfiguration);
}

export const SWRProvider = (props: React.PropsWithChildren<SWRProviderProps>) => {
  const { value, children } = props;
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
        ...value,
      }}
    >
      {showError && <ErrorToast />}
      {children}
    </SWRConfig>
  );
};
