import { useEffect } from 'react';
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
  }, [dispatch, fileResources.length])
  
  console.log('fileResources', fileResources);
  

  return (
    <div className={styles.fileResourceList}>
      { load
        ? <TestLoader/>
        : <>
            <Input 
              inputHandler = { val => console.log(val) }
              inputClear = { () => console.log() }
              placeholder = 'Поиск ресурса'
              val = ''
              readOnly = {false}
              id = 'fileFiltr'
            />
            <ul>
              { fileResources.map(item => <li key={item.id}>{item.dfs_path}</li>)}
            </ul>

          </>

      }
    </div>    
  )
}
