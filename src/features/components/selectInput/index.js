import { useState, useRef } from "react";
import styles from './selectInput.module.scss';
// import dark from '../../../dark.module.scss';
// import light from '../../../light.module.scss';
// import { useSelector } from "react-redux";
import { searchUsers,  } from "../../user/userSliceAPI";
import { TestLoader } from "./testLoader";
// import { darkTheme, } from '../../../appSlice';
// import dictionary from "../../../dictionary.json";

export const SelectInput = props => {
  const ref = useRef(null);
  const inputRefs = useRef([]);
  const {selectHandler, placeholder, val, name, mode, id, } = props
  const [value, setValue] = useState(val ? val : "")
  const [show, setShow] = useState(false)
  const [timerId, setTimerId] = useState(null)
  const [selectList, setSelectList] = useState([])
  const [loading, setloading] = useState(false)
    
  const onSearchUsers  = (string) => {
    if ( string ) {
      if ( mode === 'user' ) searchUsers({'string': string, }).then(value => {
          setSelectList(value)
          setShow(true)
          setloading(false)
        });
     
    }
  }

  const onInput = val => {
    setloading(true)
    setValue(val);
    clearTimeout(timerId);
    const timer = setTimeout(() => onSearchUsers(val), 300);
    setTimerId(timer);
  }

  const onChange = item => {
    setValue(
      item.middle_name
      ? `${item.last_name ? item.last_name : ''} ${item.first_name ? item.first_name : ''} ${item.middle_name ? item.middle_name : ''}`
      : `${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''}`
    );
    selectHandler(item)
    setShow(false);
  }

  const onFocus = e => {
    if ( e.target.value ) setloading(true)
    onSearchUsers(e.target.value)
  }

  const onBlur = () => {}

  const clearInput = () => {
    clearTimeout(timerId);
    setValue('')
    setSelectList([])
    setTimeout(()=>ref.current.focus(), 100);
    selectHandler(null)
  }

  const styleClnBtn = value && !loading ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const styleLoading = loading ? `${styles.loading} ${styles.showLoading}` : `${styles.loading}`
  const styleSelectList = show ? `${styles.selectList} ${styles.showSelectList}` : `${styles.selectList} ${styles.hideSelectList}`

  // const darkMode = useSelector(darkTheme);
  // const selectInputStyle = darkMode ? `${styles.selectInput} ${dark.selectInput}` : `${styles.selectInput} ${light.selectInput}`;

  const keyDown = (e, i, item) => {
    if ( e.code === 'ArrowDown' || e.code === 'ArrowUp' || e.code === 'Enter' || e.code === 'Escape' ) e.preventDefault();
    switch ( e.code ) {
      case 'ArrowDown': 
        i = selectList.length-1 === i ? 0 : ++i;
        inputRefs.current[i]?.focus();
        break;
      case 'ArrowUp': 
        i = !i || !inputRefs.current[i] ? selectList.length-1 : --i;
        inputRefs.current[i]?.focus();
        break;
      case 'NumpadEnter': 
      case 'Enter': 
        if ( e.target.type !== 'text' ) onChange(item);
        break;
      case 'Escape': 
        setShow(false);
        clearInput();
        break;

      default:
        break;
    } 
  }

  return (
    <div className={styles.selectInput}>
      <div className={styles.input}>
        <input type="text" className={styles.htmInput}
          value={value}
          placeholder = {placeholder}
          onInput={e => onInput(e.target.value)}
          onFocus={(e)=>onFocus(e)}
          onBlur={()=>onBlur()}
          ref={ref}
          onKeyDown={(e)=>keyDown(e, -1)}
          id = { id ?? '' }
          autoComplete="off"
        />
        {
          <div className={styleLoading}><TestLoader/></div>
        }
        {<button type="button" className={styleClnBtn}
            onClick={() => clearInput()}
            aria-label="Clear"
            >&times;</button>
        }
      </div>
      <ul className={styleSelectList}>
        {selectList 
          ? selectList.map((item, index) => 
            <li key={`${item.id}${name}`} className={styles.itemLi}>
              <input type="radio" 
                value={item.id} 
                id={`${item.id}${name}`} 
                name={name}
                onClick={()=>onChange(item)}
                ref={ input => inputRefs.current[index] = input }
                onKeyDown={(e)=>keyDown(e, index, item)}
              /><label htmlFor={`${item.id}${name}`}>{
                item.middle_name 
                ? `${item.last_name ? item.last_name : ''} ${item.first_name ? item.first_name : ''} ${item.middle_name ? item.middle_name : ''} ${item.email ? `(${item.email})` : ''}`
                : `${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''} ${item.email ? `(${item.email})` : ''}`
              }</label>
            </li>
          )
          : null  
      }
      </ul>
    </div>
  )
}
