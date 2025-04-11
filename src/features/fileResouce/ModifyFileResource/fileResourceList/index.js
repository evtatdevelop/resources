import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './fileResourceList.module.scss';
import { getFileResourcesList, fileResourcesList, loading, } from '../../fileResourceSlice';
import { TestLoader } from '../../../components/loader/testLoader';
import Input from '../../../components/input';

export const FileResourceList = () => {
  const dispatch = useDispatch(); 
  const fileResources = useSelector(fileResourcesList);
  const load = useSelector(loading);

  useEffect(() => {
    document.getElementById('fileFiltr')?.focus();
    if ( !fileResources.length )
      dispatch(getFileResourcesList());
      setFiltred(fileResources);
  }, [dispatch, fileResources, fileResources.length])
  
  console.log('fileResources', fileResources);
  
  const [filtred, setFiltred] = useState([]);

  const search = val => fileResources.filter(item => item.dfs_path.includes(val) || item.agree_fio.includes(val) );
  const clear = () => setFiltred(fileResources);

  return (
    <div className={styles.fileResourceList}>
      { load && !filtred.length
        ? <TestLoader/>
        : <>
            <Input 
              inputHandler = { val => setFiltred(search(val)) }
              inputClear = { () => clear() }
              placeholder = 'Поиск ресурса'
              val = ''
              readOnly = {false}
              id = 'fileFiltr'
            />
            <div className={styles.lstHead}>
              <div>Путь до ресурса (DFS)</div>
              <div>Ответственный</div>
            </div>
            <ul className={styles.list}>
              { filtred.map(item => <li key={item.id}>
                  <div className={styles.path}>{item.dfs_path}</div>
                  <div>{item.agree_fio}</div>
                </li>)
              }
            </ul>

          </>

      }
    </div>    
  )
}
