import * as React from "react";

import { PendingWatchMovie } from "@/interfaces/entities";
import Button from "../Button";
import Modal from "../Modal";
import WatchLottery from "../WatchLottery";

import classNames from "classnames/bind";
import styles from "./ModalWatchLottery.module.css";

const cx = classNames.bind(styles);

export interface ModalWatchLotteryProps {
  watchlist: PendingWatchMovie[];
}

export const ModalWatchLottery = (props: ModalWatchLotteryProps) => {
  const { watchlist } = props;
  const [open, setOpen] = React.useState(false);

  const lotteryList = React.useMemo(() => watchlist.map((el) => el.title || ""), [watchlist]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Watch Lottery</Button>
      <Modal open={open} onClose={handleClose}>
        <div className={cx("content")}>
          <WatchLottery list={lotteryList} />
        </div>
      </Modal>
    </>
  );
};
