import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getFileResourcesList, fileResourcesList, fileModResource, setFileValue, setFileReasons, 
  setFileNotes, fileValue, fileReasons, setFileBoss, } from '../fileResourceSlice';
import { FileResourceList } from './fileResourceList';
import Select from '../../components/select';
import { Plug } from '../../components/plug';
import Input from '../../components/input';
import { Comments } from '../../components/comments/comments';

export const ModifyFileResource = () => {
  const dispatch = useDispatch(); 
  const fileResources = useSelector(fileResourcesList);
  const fileModRes = useSelector(fileModResource);
  const fileVal = useSelector(fileValue);
  const fileReason = useSelector(fileReasons);

  const [manualFileVal, setManualFileVal] = useState(false);

  useEffect(() => {
    if ( !fileResources.length )
      dispatch(getFileResourcesList());
  }, [dispatch, fileResources.length])

  useEffect(() => {
    if ( fileModRes ) document.getElementById('fileValue')?.focus();
    else {
      setFileValue(null);
      setManualFileVal(false)
      dispatch(setFileReasons(null));
      dispatch(setFileNotes(null));
      dispatch(setFileBoss(null));  
    }
  }, [dispatch, fileModRes])

  useEffect(() => {
    if ( manualFileVal ) document.getElementById('fileValueManual')?.focus();
  },[manualFileVal])

  useEffect(() => {
    if ( fileVal ) document.getElementById('fileReasons')?.focus();
    else {
      dispatch(setFileReasons(null));
      dispatch(setFileNotes(null));
      dispatch(setFileBoss(null));  
    }
  }, [dispatch, fileVal])

  useEffect(() => {
    if ( fileReason ){ 
      // document.getElementById('fileNotes')?.focus();
    } else {
      dispatch(setFileNotes(null));
      dispatch(setFileBoss(null));  
    }
  }, [dispatch, fileReason])

  return (
    <>
      <FileResourceList/>

      { fileModRes
        ? <>
            <div>
              <label htmlFor="fileValue">Увеличить на (Гб)</label>
              { !manualFileVal
                ? fileModRes
                  ? <Select
                      selectHandler = { val => {
                        dispatch(setFileValue(val.value));
                        if ( val.value && val.value === 'MANUAL' ) setManualFileVal(true);
                        else setManualFileVal(false);                  
                      } }
                      selectClear  = { () => {
                        dispatch(setFileValue(null));
                        setManualFileVal(false);
                        document.getElementById('fileValue')?.focus();
                      } }
                      placeholder = 'Увеличить на (Гб)'
                      selectList = {[
                        {'id': 1, 'name': '10', 'value': 10},
                        {'id': 2, 'name': '20', 'value': 20},
                        {'id': 3, 'name': '30', 'value': 30},
                        {'id': 4, 'name': 'Другое значение (указать вручную)', 'value': 'MANUAL'}]}
                      val = ''
                      name='fileValue'
                      id = 'fileValue'
                    />
                  : <Plug/>   
                : null
              }
              { manualFileVal
                ? <Input 
                    inputHandler = { val => {
                      dispatch(setFileValue(val));
                      if ( !val ) setManualFileVal(false);
                    } }
                    inputClear = { () => {
                      dispatch(setFileValue(null));
                      setManualFileVal(false); 
                    } }
                    placeholder = 'Требуемый объем (Гб)'
                    val = ''
                    readOnly = {false}
                    id = 'fileValueManual'
                  />
                : null
              }
            </div>
            { fileModRes
              ? <p>Для дочерних ресурсов не указывается</p>
              : null
            }

            <div>
              <label htmlFor="fileReasons">Обоснование расширения ресурса</label>
              { fileVal
                ? <Comments 
                    inputHandler = { val => {
                      dispatch(setFileReasons(val));
                    } }
                    id = 'fileReasons'
                  />
                : <Plug/>    
              }
            </div>

            <div>
              <label htmlFor="fileNotes">Примечание</label>
              { fileReason
                ? <Comments 
                    inputHandler = { val => dispatch(setFileNotes(val)) }
                    id = 'fileNotes'
                  />
                : <Plug/>
              }
            </div>
          </>
        : null
      }
    </>    
  )
}
