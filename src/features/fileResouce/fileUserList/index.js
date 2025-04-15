import { useState, } from "react";
import styles from './fileUserList.module.scss';
import { searchUsers,  } from "../../user/userSliceAPI";
import { TestLoader } from "./testLoader";

export const FileUserList = props => {
  const {selectHandler, delHundler, name, mode, id, selectListParam, userList, } = props;
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [selectList, setSelectList] = useState([]);
  const [loading, setloading] = useState(false);
  const [valueParam, setValueParam] = useState('');
  const [showParam, setShowParam] = useState(false);

  const [user, setUser] = useState({});
  // console.log(user);
  // console.log('value', value);
  // console.log('valueParam', valueParam);
  // console.log('fileUuserListserList', userList);
 
  const addUser = () => {
    if ( user.person || user.access ) selectHandler(user);
    setShow(false);
    setShowParam(false);
    setloading(false);
    setValue('');
    setSelectList([]);
    setValueParam('');
    setUser({});
    setTimeout(() => document.getElementById(id)?.focus(), 1000);
  }
  
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
    const userData = item.middle_name
      ? `${item.last_name ? item.last_name : ''} ${item.first_name ? item.first_name : ''} ${item.middle_name ? item.middle_name : ''}`
      : `${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''}`;
    setValue(userData);
    setShow(false);
    setUser({...user, person: item});
    if ( value ) document.getElementById(`${id}Param`)?.focus();
  }

  const onFocus = e => {
    if ( e.target.value ) setloading(true)
    onSearchUsers(e.target.value)
  }

  const clearInput = () => {
    clearTimeout(timerId);
    setValue('');
    setSelectList([]);
    setValueParam('');
    setUser({});
  }

 const onChangeParam = item => {
    setValueParam(item.name);
    setShowParam(false);
    setUser({...user, access: item});
  }

  const clearInputParam = () => {
    setValueParam('');
  }

  const onShowPickerParam = () => { 
    setShowParam(true);
  }

  const styleClnBtn = value && !loading ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const styleLoading = loading ? `${styles.loading} ${styles.showLoading}` : `${styles.loading}`
  const styleSelectList = show ? `${styles.selectList} ${styles.showSelectList}` : `${styles.selectList} ${styles.hideSelectList}`
  const styleClnBtnParam = valueParam ? `${styles.clearBtnParam} ${styles.showClnBtnParam}` : `${styles.clearBtnParam}`
  const styleSelectListParam = showParam ? `${styles.selectListParam} ${styles.showSelectListParam}` : `${styles.selectListParam} ${styles.hideSelectListParam}`
  const styleFddBtnm = user.person && user.access ? `${styles.addBtn}` : `${styles.addBtn} ${styles.notReady}`

  return (
    <div className={styles.personList}>
      <ul>
        { userList
          ? userList.map(item => <li key={item.person.id}>
              <div>
                { item.person.middle_name 
                  ? `${item.person.last_name} ${item.person.first_name} ${item.person.middle_name ?? ''} (${item.access.name})`
                  : `${item.person.first_name} ${item.person.last_name } (${item.access.name})`
                }
              </div>
              <button type="button"
                onClick={() => delHundler(item.person.id)}
              >&times;</button>
            </li>)
          : null
        }
      </ul>
      <div>
        <div className={styles.selectInput}>
          <div className={styles.input}>
            <input type="text" className={styles.htmInput}
              value={value}
              placeholder = 'Поиск сотрудника'
              onInput={e => onInput(e.target.value)}
              onFocus={(e)=>onFocus(e)}
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

        <div className={styles.select}>
          <div className={styles.input}>
            <input type="text" className={styles.htmInputParam}
              value={valueParam}
              placeholder = 'Тип доступа'
              readOnly={true}
              onClick={()=>onShowPickerParam()}
              onFocus={()=>onShowPickerParam()}
              id = { `${id}Param` ?? '' }
            />
            {<button type="button" className={styleClnBtnParam}
                onClick={() => clearInputParam()}
                aria-label="Clear"
                >&times;</button>
            }
          </div>
          <ul className={styleSelectListParam} id="optionList">
            {selectListParam.map((item, index) => {          
              return <li key={`${item.id}${name}`} className={styles.itemLi}>
                <input type="radio" 
                  value={item.id} 
                  id={`${item.id}${name}`} 
                  name={name}
                  onClick={()=>onChangeParam(item)}
                /><label htmlFor={`${item.id}${name}`}>{item.name}</label>
              </li>          
              }
            )}
          </ul>
        </div>

        <button type="button" 
          className={styleFddBtnm}
          onClick={()=>addUser()}
        >Добавить</button>        
      </div>


    </div>
  )
}
