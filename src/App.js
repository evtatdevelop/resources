/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect,  } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './App.module.scss';
import { Routes, Route } from 'react-router';
import { pathBase } from './config';
import { langMode, setLangMode, } from "./appSlice";
import { getRemote, remoteUser, remoteLoading, } from "./features/user/userSlice";

function App() {
  const dispatch = useDispatch(); 
  const user = useSelector(remoteUser);
  const lang = useSelector(langMode);
  const remoteLoad = useSelector(remoteLoading);

  useEffect(() => {
    dispatch(getRemote());
  }, []);

  useEffect(() => {
    if (user?.lang && !lang) dispatch(setLangMode(user.lang));
  }, [dispatch, user.lang]);

  
  console.log(user);

  return (
    <div className={styles.app}>
      { !remoteLoad
        ? <Routes>
            <Route path={`/`} > 
              <Route path={`${pathBase}/`} element={<div>Resources</div>}/>
            </Route>
          </Routes>
        : null
      }
  </div>
  );
}

export default App;
