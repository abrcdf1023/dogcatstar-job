import { useCallback, useEffect, useRef, useState } from "react";

/** The hook internal state. */
type State = {
  /** A boolean indicating if the element is intersecting. */
  inView: boolean;
  /** The intersection observer entry. */
  entry?: IntersectionObserverEntry;
};

type UseIntersectionOptionsReturned = [(node?: Element | null) => void, boolean, IntersectionObserverEntry | undefined];

export interface UseIntersectionOptions extends IntersectionObserverInit {
  /** Call this function whenever the in view state changes */
  onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void;
  /** Set the initial value of the `inView` boolean. This can be used if you expect the element to be in the viewport to start with, and you want to trigger something when it leaves. */
  defaultInView?: boolean;
}

/**
 * Reference: https://github.com/thebuilder/react-intersection-observer/blob/main/src/useInView.tsx
 */
export const useIntersectionObserver = ({
  threshold,
  root,
  rootMargin,
  onChange: onChangeProp = () => {},
  defaultInView = false,
}: UseIntersectionOptions = {}) => {
  const [element, setElement] = useState<Element | null>(null);
  const [state, setState] = useState<State>(() => ({
    inView: defaultInView,
    entry: undefined,
  }));

  const onChange = useCallback(onChangeProp, [onChangeProp]);

  useEffect(() => {
    // Ensure the browser supports the Intersection Observer API
    if (!("IntersectionObserver" in window)) return;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        const thresholds: number[] = Array.isArray(observer.thresholds) ? observer.thresholds : [observer.thresholds];

        entries.forEach((entry) => {
          // While it would be nice if you could just look at isIntersecting to determine if the component is inside the viewport, browsers can't agree on how to use it.
          // -Firefox ignores `threshold` when considering `isIntersecting`, so it will never be false again if `threshold` is > 0
          const inView = entry.isIntersecting && thresholds.some((threshold) => entry.intersectionRatio >= threshold);

          setState({ inView, entry });

          onChange(inView, entry);
        });
      },
      { threshold, root, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // If the threshold is an array, convert it to a string, so it won't change between renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Array.isArray(threshold) ? threshold.toString() : threshold,
    element,
    root,
    rootMargin,
  ]);

  const entryTarget = state.entry?.target;
  const previousEntryTarget = useRef<Element>();
  if (!element && entryTarget && previousEntryTarget.current !== entryTarget) {
    // 當 element 不存在時（通常是被 unmount 掉），重置狀態為初始值
    // 不寫在 useEffect 原因是 element 被 unmount 時不會觸發 render 因此 useEffect 不會執行
    // 可參考 react 官網的 [you-may-not-need-an-effect](https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes)
    previousEntryTarget.current = entryTarget;
    setState({
      inView: defaultInView,
      entry: undefined,
    });
  }

  return [setElement, state.inView, state.entry] as UseIntersectionOptionsReturned;
};
