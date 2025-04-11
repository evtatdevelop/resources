import React from "react";
import styles from './plug.module.scss';

export const Plug = props => {
  return (
    <div className={styles.plug}>{props.children ?? <>&nbsp;</>}</div> 
  )
}