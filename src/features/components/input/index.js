import React, {useState, useRef, forwardRef, useImperativeHandle } from "react";
import styles from './input.module.scss';

// export const Input = props => {
const Input = (props, ref) => {
  const insideref = useRef(null)
  const {inputHandler, inputClear, placeholder, val, onKeyDownFunk, id, readOnly, } = props
  const [value, setValue] = useState(val ? val : "")
  const [timerId, setTimerId] = useState(null);

  const onInput = val => {
    setValue(val);
    clearTimeout(timerId);
    const timer = setTimeout(() => inputHandler(val), 500);
    setTimerId(timer);
  }
  const clearInput = () => {
    clearTimeout(timerId);
    setValue(val);
    inputClear();
    insideref.current.focus();
  }

  const styleClnBtn = value ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const styleinput = readOnly ? `${styles.input} ${styles.readOnly}` : `${styles.input}`

  useImperativeHandle(ref, () => ({ clearInput }));

  return (
    <div className={styleinput}>
      <input type="text" className={styles.htmInput}
        value={value}
        onInput={e => onInput(e.target.value)}
        placeholder = {placeholder}
        ref={insideref}
        onKeyDown={ onKeyDownFunk ? e => onKeyDownFunk(e) : ()=>{} }
        id={ id ?? "" }
        autoComplete="off"
        readOnly = {readOnly}
      />
      { !readOnly 
        ? <button type="button" className={styleClnBtn}
          onClick={() => clearInput()}
          aria-label="Clear"
          >&times;</button>
        : null  
      }
    </div>
  )
}

export default forwardRef(Input);