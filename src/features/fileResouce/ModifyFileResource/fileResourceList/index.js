import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './fileResourceList.module.scss';
import { getFileResourcesList, fileResourcesList, loading, setFileModResource, fileModResource, } from '../../fileResourceSlice';
import { TestLoader } from '../../../components/loader/testLoader';
import Input from '../../../components/input';

export const FileResourceList = () => {
  const dispatch = useDispatch(); 
  const fileResources = useSelector(fileResourcesList);
  const load = useSelector(loading);
  const fileModRes = useSelector(fileModResource);
  
  useEffect(() => {
    document.getElementById('fileFiltr')?.focus();
    if ( !fileResources.length )
      dispatch(getFileResourcesList());
      setFiltred(fileResources);
  }, [dispatch, fileResources])
  

  // console.log('fileResources', fileResources);
  
  const [filtred, setFiltred] = useState([]);

  const search = val => fileResources.filter(item => item[1].toUpperCase().includes(val.toUpperCase()) || item[2].toUpperCase().includes(val.toUpperCase()) );

  const clear = () => setFiltred(fileResources);

  const setFileResource = val => {
    // console.log(val);
    dispatch(setFileModResource(val));
  }

  const reSetResource = () => {
    dispatch(setFileModResource(null));
    document.getElementById('fileFiltr')?.focus();
  }

  useEffect(() => {
    if ( !fileModRes )  document.getElementById('fileFiltr')?.focus();
  }, [fileModRes])

  return (
    <div className={styles.fileResourceList}>
      { fileModRes
        ?  <div className={styles.modResource}>
            <div
              onClick={() => reSetResource()}
            >
              <label htmlFor="">Сетевой путь</label>
              <div>{fileModRes[1]}
              <button type="button"
                onClick={() => reSetResource()}
                aria-label="Clear"
              >&times;</button>
              </div>
            </div>          
            <div>
              <label htmlFor="">Ответственный за ресурс</label>
              <div>{fileModRes[2]}</div> 
            </div>           
          </div>

        : <>
            <Input 
              inputHandler = { val => setFiltred(search(val)) }
              inputClear = { () => clear() }
              placeholder = 'Поиск ресурса. (часть пути до ресурса (DFS) или  Ответственный)'
              val = ''
              readOnly = {false}
              id = 'fileFiltr'
            />
            <div className={styles.lstHead}>
              <div>Путь до ресурса (DFS)</div>
              <div>Ответственный</div>
            </div>
            { load
              ? <TestLoader/>
              : <ul className={styles.list}>
                  { filtred.map(item => <li key={item[0]}
                      onClick={() => setFileResource(item)}
                    >
                      <div className={styles.path}>{item[1]}</div>
                      <div>{item[2]}</div>
                    </li>)
                  }
                </ul>
            }        
          </>
      }
    
    </div> 
  )
}
