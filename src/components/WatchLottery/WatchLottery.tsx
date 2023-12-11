import * as React from "react";

import Button from "@/components/Button";
import bezierEasing from "bezier-easing";

import classNames from "classnames/bind";
import styles from "./WatchLottery.module.css";

const cx = classNames.bind(styles);

const easing = bezierEasing(0.5, 1, 0.89, 1); // easeOutQuad

export interface WatchLotteryProps {
  list?: string[];
  duration?: number;
  height?: number;
}

export const WatchLottery = (props: WatchLotteryProps) => {
  const { list = [], duration = 3000, height = 40 } = props;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleStart = () => {
    if (!containerRef.current) return;
    let startTime: number | null = null;
    /**
     * Variable 'r' is times of height and maxmium is accroading to list length.
     * Example: list.length = 3 and height = 40, r = 0, 40, 80
     *          list.length = 3 and height = 60, r = 0, 60, 120
     *          list.length = 4 and height = 40, r = 0, 40, 80, 120
     */
    const r = Math.floor(Math.random() * list.length) * height;
    const adjustment = list.length < 10 ? 10 - list.length : 2; // To adjustment the animation speed in different list length.

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const runtime = timestamp - startTime; // How long we have been animating in total.
      const relativeProgress = runtime / duration; // How far we are in the animation.
      const maxHeight = height * list.length; // To limit the maxmium scrollTop.

      const easedProgress = easing(relativeProgress); // The eased progress, between 0 and 1.

      const scrollTop = Math.floor((maxHeight * adjustment * (1 - easedProgress) + r) % maxHeight);

      (containerRef.current as HTMLDivElement).scrollTop = scrollTop;

      if (runtime < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const renderList = () =>
    list.map((item) => (
      <div key={item} className={cx("item")} style={{ height }}>
        {item}
      </div>
    ));

  return (
    <div>
      <div ref={containerRef} className={cx("container")} style={{ height }}>
        {renderList()}
        {/* Duplicate the list to make it looks smooth. */}
        {renderList()}
      </div>
      <Button onClick={handleStart}>Start</Button>
    </div>
  );
};
