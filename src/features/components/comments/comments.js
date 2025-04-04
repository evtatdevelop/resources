import React, { useState, } from "react";
import styles from './comments.module.scss';
// import { useSelector, useDispatch } from "react-redux";
// import dictionary from "../../../../../dictionary.json";
// import { user } from '../../../../user/userSlice';
// import { editSandBoxData, roleSendboxData, setComment, paramsData } from "../../../corpsystemsSlice";
// import { darkTheme } from "../../../../main/mainpageSlice";

export const Comments = props => {

  const { id, inputHandler } = props;
  
  // const dispatch = useDispatch();
  // const { lang, } = useSelector(user);
  // const editSandBox = useSelector(editSandBoxData);
  // const roleSendbox = useSelector(roleSendboxData);
  // const dark = useSelector(darkTheme);
  // const {role_comments_name, } = useSelector(paramsData);

  const [text, setValue] = useState('');
  
  const [timerId, setTimerId] = useState(null);

  // useEffect(() => {
  //   if ( editSandBox ) {
  //     setValue(roleSendbox.comment)
  //   }
  // }, [editSandBox, roleSendbox.comment])

  const onInput = val => {
    setValue(val);
    clearTimeout(timerId);
    const timer = setTimeout(() => inputHandler(val), 500);
    setTimerId(timer);
  }

  // const selectComments = dark 
  // ? `${styles.comments} ${styles.dark}`
  // : `${styles.comments}`

  return (
    <div className={styles.comments}>
      <textarea
        className={styles.commentArea}
        autoComplete="off"
        maxLength={4000}
        placeholder=""
        spellCheck='true'
        wrap="hard"
        onInput={e => onInput(e.target.value)}
        defaultValue={text}
        id = {id}
      ></textarea>
    </div>
  )
}
