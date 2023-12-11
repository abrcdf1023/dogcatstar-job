import * as React from "react";
import { createPortal } from "react-dom";

import classNames from "classnames/bind";
import style from "./Modal.module.css";

const cx = classNames.bind(style);

export interface ModalProps extends React.ComponentPropsWithRef<"div"> {
  open?: boolean;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const { className, open, onClose, children } = props;

  if (!open) return null;

  const modal = (
    <div ref={ref} className={cx("root", className)}>
      <div className={cx("backdrop")} onClick={onClose} />
      {children}
    </div>
  );

  return createPortal(modal, document.body);
});

Modal.displayName = "Modal";
