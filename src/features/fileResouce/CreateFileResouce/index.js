import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
// import styles from './createFileResource.module.scss';
import Select from '../../components/select';
import Input from '../../components/input';
import { setFileResourceName, fileAction, fileResourceName,
  setFileValue, fileValue, setFileReasons, fileReasons, getFilePlaceList, filePlaceList, 
  setFilePlace, filePlace, setFilePeriod, filePeriod, setFileResourceManager, fileResourceManager,
  setFileManagerAccess, fileManagerAccess, setFileNotes, cleanFileUserList, setFileBoss, fileDate, setfileDate,
  // fileNotes, fileUsers, fileBoss
} from '../fileResourceSlice';
import { Comments } from '../../components/comments/comments';
import { SelectInput } from '../../components/selectInput';
import { InputDate } from '../../components/inputDate';
import { dateToStrDate } from '../../../utils';
import { Plug } from '../../components/plug';

export const CreateFileResouce = () => {
  const dispatch = useDispatch(); 
  const action = useSelector(fileAction);
  const resourceName = useSelector(fileResourceName);
  const fileVal = useSelector(fileValue);
  const fileReason = useSelector(fileReasons);
  const filePlaces = useSelector(filePlaceList);
  const filePlaceVal = useSelector(filePlace);
  const filePeriods = useSelector(filePeriod);
  const fileResManager = useSelector(fileResourceManager);
  const fileManagAccess = useSelector(fileManagerAccess);
  const fileDateData = useSelector(fileDate);
  // const fileNote = useSelector(fileNotes);
  // const fileUser = useSelector(fileUsers);
  // const fileBossData = useSelector(fileBoss);

  const [manualFileVal, setManualFileVal] = useState(false);

  // console.log('action', action);
  // console.log('resourceName', resourceName);
  // console.log('fileVal', fileVal);
  // console.log('fileReason', fileReason);
  // console.log('filePlace', filePlaceVal);
  // console.log('filePeriods', filePeriods);
  // console.log('fileDateData', fileDateData);
  // console.log('fileResManager', fileResManager);
  // console.log('fileManagAccess', fileManagAccess);
  // console.log('fileNote', fileNote);
  // console.log('fileUser', fileUser);
  // console.log('fileBossData', fileBossData);
   
  useEffect(() => {
    if ( action ) {
      document.getElementById('fileResourceName')?.focus();
      dispatch(getFilePlaceList());
    } else {
      dispatch(setFileResourceName(null));
      dispatch(setFileValue(null));
      setManualFileVal(false);
      dispatch(setFileReasons(null));
      dispatch(setFilePlace(null));
      dispatch(setFilePeriod(null));
      dispatch(setfileDate(null));
      dispatch(setFileResourceManager(null));
      dispatch(setFileManagerAccess(null));
      dispatch(setFileNotes(null));
      dispatch(cleanFileUserList());
      dispatch(setFileBoss(null));
    }
  },[action, dispatch])
  
  useEffect(() => {
    if ( resourceName ) return;
    else {
      dispatch(setFileValue(null));
      setManualFileVal(false);
      dispatch(setFileReasons(null));
      dispatch(setFilePlace(null));
      dispatch(setFilePeriod(null));
      dispatch(setfileDate(null));
      dispatch(setFileResourceManager(null));
      dispatch(setFileManagerAccess(null));
      dispatch(setFileNotes(null));
      dispatch(cleanFileUserList());
      dispatch(setFileBoss(null));
    }
  },[dispatch, resourceName])
  
  useEffect(() => {
    if ( fileVal && !manualFileVal ) document.getElementById('fileReasons')?.focus();
    else {
      dispatch(setFileReasons(null));
      dispatch(setFilePlace(null));
      dispatch(setFilePeriod(null));
      dispatch(setfileDate(null));
      dispatch(setFileResourceManager(null));
      dispatch(setFileManagerAccess(null));
      dispatch(setFileNotes(null));
      dispatch(cleanFileUserList());
      dispatch(setFileBoss(null));
    }
  },[dispatch, fileVal, manualFileVal])
  
  useEffect(() => {
    if ( manualFileVal ) document.getElementById('fileValueManual')?.focus();
  },[manualFileVal])
  
  useEffect(() => {
    if ( fileReason ) return;
    else {
      dispatch(setFilePlace(null));
      dispatch(setFilePeriod(null));
      dispatch(setfileDate(null));
      dispatch(setFileResourceManager(null));
      dispatch(setFileManagerAccess(null));
      dispatch(setFileNotes(null));
      dispatch(cleanFileUserList());
      dispatch(setFileBoss(null));
    }
  },[dispatch, fileReason])
  
  useEffect(() => {
    if ( filePlaceVal ) document.getElementById('filePeriod')?.focus();
    else {
      dispatch(setFilePeriod(null));
      dispatch(setfileDate(null));
      dispatch(setFileResourceManager(null));
      dispatch(setFileManagerAccess(null));
      dispatch(setFileNotes(null));
      dispatch(cleanFileUserList());
      dispatch(setFileBoss(null));
    }
  },[dispatch, filePlaceVal])
  
  useEffect(() => {
    if ( filePeriods ) {
      if ( filePeriods?.code === "TEMPORARY" ) document.getElementById('expDate')?.focus()
      else  document.getElementById('fileResourceManager')?.focus();
      dispatch(setfileDate(''));      
    } else {
      dispatch(setfileDate(null));
      dispatch(setFileResourceManager(null));
      dispatch(setFileManagerAccess(null));
      dispatch(setFileNotes(null));
      dispatch(cleanFileUserList());
      dispatch(setFileBoss(null));
    }
  },[dispatch, filePeriods])

  useEffect(() => {
    if ( fileDateData ) document.getElementById('fileResourceManager')?.focus();
    else {
      if (filePeriods?.code === "TEMPORARY") {
        dispatch(setFileResourceManager(null));
        dispatch(setFileManagerAccess(null));
        dispatch(setFileNotes(null));
        dispatch(cleanFileUserList());
        dispatch(setFileBoss(null));       
      }
    }
  },[dispatch, fileDateData, filePeriods?.code])
  
  useEffect(() => {
    if ( fileResManager ) document.getElementById('managerNoAccess')?.focus();
    else {
      dispatch(setFileManagerAccess(null));
      dispatch(setFileNotes(null));
      dispatch(cleanFileUserList());
      dispatch(setFileBoss(null));  
    }
  },[dispatch, fileResManager])
  
  useEffect(() => {
    if ( fileManagAccess ) document.getElementById('fileNotes')?.focus();
    else {
      dispatch(setFileNotes(null));
      dispatch(cleanFileUserList());
      dispatch(setFileBoss(null));  
    }
  },[dispatch, fileManagAccess])

  return (
    <>
      <div>
        <label htmlFor="">Желаемое имя ресурса</label>
        { action
          ? <Input 
              inputHandler = { val => dispatch(setFileResourceName(val)) }
              inputClear = { () => dispatch(setFileResourceName(null)) }
              placeholder = 'Желаемое имя ресурса'
              val = ''
              readOnly = {false}
              id = 'fileResourceName'
            />
          : <Plug/> 
        }
      </div>

      <div>
        <label htmlFor="fileValue">Требуемый объем (Гб)</label>
        { !manualFileVal
          ? resourceName
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
                placeholder = 'Требуемый объем (Гб)'
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
      { resourceName
        ? <p>Для дочерних ресурсов не указывается</p>
        : null
      }

      <div>
        <label htmlFor="fileReasons">Обоснование необходимости выделения</label>
        { resourceName && ( fileVal && fileVal !== 'MANUAL' )
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
        <label htmlFor="filePlace">Площадка физического местоположения ресурса</label>
        { resourceName && ( fileVal && fileVal !== 'MANUAL' ) && fileReason
          ? <Select
              selectHandler = { val => {
                dispatch(setFilePlace(val));                 
              } }
              selectClear  = { () => {
                dispatch(setFilePlace(null));
                document.getElementById('filePlace')?.focus();
              } }
              placeholder = 'Площадка физического местоположения ресурса'
              selectList = {filePlaces}
              val = ''
              name='filePlace'
              id = 'filePlace'
            />
          : <Plug/>   
        }  
      </div>

      <div>
        <label htmlFor="filePeriod">Период действия</label>
        { resourceName && ( fileVal && fileVal !== 'MANUAL' ) && fileReason && filePlaceVal
          ? <Select
              selectHandler = { val => {
                dispatch(setFilePeriod(val));                 
              } }
              selectClear  = { () => {
                dispatch(setFilePeriod(null));
                document.getElementById('filePeriod')?.focus();
              } }
              placeholder = 'Период действия'
              selectList = {[{id: 1, name: 'Постоянный ресурс', code: 'PERMANENT'}, {id: 2, name: 'Временный ресурс', code: 'TEMPORARY'}, ]}
              val = ''
              name='filePeriod'
              id = 'filePeriod'
            /> 
          : <Plug/>  
        }      
      </div>

      { filePeriods?.code === "TEMPORARY"
        ?  <div>
            <label htmlFor="expDate">Действует до</label>
            <InputDate
              dateHandler = { val => dispatch(setfileDate(dateToStrDate(val))) }
              lang='ru'
              id = 'expDate'
            />
          </div>
        : null  
      }                               

      <div>
        <label htmlFor="fileResourceManager">Ответственный за ресурс{<br/>}(cогласующий доступ к ресурсу)</label>
        { resourceName && ( fileVal && fileVal !== 'MANUAL' ) && fileReason && filePlaceVal && ( ( filePeriods?.code === "PERMANENT" && filePeriods ) || ( filePeriods?.code === "TEMPORARY" && filePeriods && fileDateData ) )
          ? <SelectInput
              selectHandler = { val => dispatch(setFileResourceManager(val))}
              placeholder = 'Ответственный за ресурс'
              val = ''
              name='fileResourceManager'
              mode = 'user'
              id = 'fileResourceManager'
            />
          : <Plug/> 
        }
      </div>

      <div>
        <label htmlFor="managerAccess">Требуется выдать доступ к ресурсу для ответственного?</label>
        { resourceName && ( fileVal && fileVal !== 'MANUAL' ) && fileReason && filePlaceVal && 
          ( ( filePeriods?.code === "PERMANENT" && filePeriods ) || ( filePeriods?.code === "TEMPORARY" && filePeriods && fileDateData ) ) && fileResManager
          ? <Select
              selectHandler = { val => dispatch(setFileManagerAccess(val)) }
              selectClear  = { () => {
                dispatch(setFileManagerAccess(null));
                document.getElementById('managerNoAccess')?.focus();
              } }
              placeholder = 'доступ к ресурсу для ответственного'
              selectList = {[{id: 1, name: 'Доступ необходим', code: 'ACCESS'}, {id: 2, name: 'Доступ не требуется', code: 'NOACCESS'}, ]}
              val = ''
              name='managerAccess'
              id = 'managerNoAccess'
            />
          : <Plug/>
        }
      </div>

      <div>
        <label htmlFor="fileNotes">Примечание</label>
        { resourceName && ( fileVal && fileVal !== 'MANUAL' ) && fileReason && filePlaceVal && 
          ( ( filePeriods?.code === "PERMANENT" && filePeriods ) || ( filePeriods?.code === "TEMPORARY" && filePeriods && fileDateData ) ) && fileResManager
          ? <Comments 
              inputHandler = { val => dispatch(setFileNotes(val)) }
              id = 'fileNotes'
            />
          : <Plug/>
        }
      </div> 
    </>
  )
}

