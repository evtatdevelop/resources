import React from "react";
import styles from './plug.module.scss';

export const Plug = props => {
  const { children, load } = props;
  const plugStyle = load ? `${styles.plug} ${styles.load}` : `${styles.plug}`
  return (
    <div className={plugStyle}>{children ?? <>&nbsp;</>}</div>
  )
}