import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Select from '../../components/select';
import Input from '../../components/input';
import { setFileResourceName, fileAction, fileResourceName,
  setFileValue, fileValue, setFileReasons, fileReasons, getFilePlaceList, filePlaceList, 
  setFilePlace, filePlace, setFilePeriod, filePeriod, setFileResourceManager, fileResourceManager,
  setFileManagerAccess, fileManagerAccess, setFileNotes, fileNotes, cleanFileUserList, setFileBoss
} from '../fileResourceSlice';
import { Comments } from '../../components/comments/comments';
import { SelectInput } from '../../components/selectInput';

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
  // const fileNote = useSelector(fileNotes);
  // const fileUser = useSelector(fileUsers);

  const [manualFileVal, setManualFileVal] = useState(false);

  // console.log('action', action);
  // console.log('resourceName', resourceName);
  console.log('fileVal', fileVal);
  // console.log('fileReason', fileReason);
  // console.log('filePlace', filePlaceVal);
  // console.log('filePeriods', filePeriods);
  // console.log('fileResManager', fileResManager);
  // console.log('fileManagAccess', fileManagAccess);
  // console.log('fileNote', fileNote);
  // console.log('fileUser', fileUser);
  
  useEffect(() => {
    if ( action ) {
      document.getElementById('fileResourceName')?.focus();
      dispatch(getFilePlaceList());
    }
  },[action, dispatch])
  
  useEffect(() => {
    if ( fileVal && !manualFileVal ) document.getElementById('fileReasons')?.focus();
    else {
      dispatch(setFileReasons(null));
      dispatch(setFilePlace(null));
      dispatch(setFilePeriod(null));
      dispatch(setFileResourceManager(null));
      dispatch(setFileManagerAccess(null));
      dispatch(setFileNotes(null));
      dispatch(cleanFileUserList());
      dispatch(setFileBoss(null));
    }
  },[dispatch, fileVal, manualFileVal])
  
  // useEffect(() => {
  //   if ( manualFileVal ) document.getElementById('fileValueManual')?.focus();
  //   else {
  //     dispatch(setFileReasons(null));
  //     dispatch(setFilePlace(null));
  //     dispatch(setFilePeriod(null));
  //     dispatch(setFileResourceManager(null));
  //     dispatch(setFileManagerAccess(null));
  //     dispatch(setFileNotes(null));
  //     dispatch(cleanFileUserList());
  //     dispatch(setFileBoss(null));
  //   }
  // },[dispatch, manualFileVal])
  
  useEffect(() => {
    if ( filePlaceVal ) document.getElementById('filePeriod')?.focus();
    else {
      dispatch(setFilePeriod(null));
      dispatch(setFileResourceManager(null));
      dispatch(setFileManagerAccess(null));
      dispatch(setFileNotes(null));
      dispatch(cleanFileUserList());
      dispatch(setFileBoss(null));
    }
  },[dispatch, filePlaceVal])
  
  useEffect(() => {
    if ( filePeriods ) document.getElementById('fileResourceManager')?.focus();
    else {
      dispatch(setFileResourceManager(null));
      dispatch(setFileManagerAccess(null));
      dispatch(setFileNotes(null));
      dispatch(cleanFileUserList());
      dispatch(setFileBoss(null));
    }
  },[dispatch, filePeriods])
  
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
        <Input 
          inputHandler = { val => dispatch(setFileResourceName(val)) }
          inputClear = { () => dispatch(setFileResourceName(null)) }
          placeholder = 'Желаемое имя ресурса'
          val = ''
          readOnly = {false}
          id = 'fileResourceName'
        />
      </div>
      { resourceName
        ? <>
            <div>
              <label htmlFor="fileValue">Требуемый объем (Гб)</label>
              { !manualFileVal
                ? <Select
                    selectHandler = { val => {
                      dispatch(setFileValue(val.value));
                      if ( val.value && val.value === 'MANUAL' ) setManualFileVal(true);
                      else setManualFileVal(false);                  
                    } }
                    selectClear  = { () => {
                      dispatch(setFileValue(null));
                      setManualFileVal(false);
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
            <p>
              Для дочерних ресурсов не указывается
            </p>
            
            { fileVal && fileVal !== 'MANUAL'
              ? <>
                  <div>
                    <label htmlFor="fileReasons">Обоснование необходимости выделения / расширения ресурса</label>
                    <Comments 
                      inputHandler = { val => {
                        dispatch(setFileReasons(val));
                      } }
                      id = 'fileReasons'
                    />
                  </div>

                  { fileReason
                    ? <>
                        <div>
                          <label htmlFor="filePlace">Площадка физического местоположения ресурса</label>
                          <Select
                            selectHandler = { val => {
                              dispatch(setFilePlace(val));                 
                            } }
                            selectClear  = { () => {
                              dispatch(setFilePlace(null));
                            } }
                            placeholder = 'Площадка физического местоположения ресурса'
                            selectList = {filePlaces}
                            val = ''
                            name='filePlace'
                            id = 'filePlace'
                          />
                        </div>

                        { filePlaceVal
                          ? <>
                              <div>
                                <label htmlFor="filePeriod">Период действия</label>
                                <Select
                                  selectHandler = { val => {
                                    dispatch(setFilePeriod(val));                 
                                  } }
                                  selectClear  = { () => {
                                    dispatch(setFilePeriod(null));
                                  } }
                                  placeholder = 'Период действия'
                                  selectList = {[{id: 1, name: 'Постоянный ресурс', code: 'PERMANENT'}, {id: 2, name: 'Временный ресурс', code: 'TEMPORARY'}, ]}
                                  val = ''
                                  name='filePeriod'
                                  id = 'filePeriod'
                                />
                              </div>

                              { filePeriods
                                ? <>
                                    <div>
                                      <label htmlFor="fileResourceManager">Ответственный за ресурс{<br/>}(cогласующий доступ к ресурсу)</label>
                                      <SelectInput
                                        selectHandler = { val => dispatch(setFileResourceManager(val))}
                                        placeholder = 'Ответственный за ресурс'
                                        val = ''
                                        name='fileResourceManager'
                                        mode = 'user'
                                        id = 'fileResourceManager'
                                      />
                                    </div>

                                    { fileResManager
                                      ? <>
                                          <div>
                                            <label htmlFor="managerAccess">Требуется выдать доступ к ресурсу для ответственного?</label>
                                            <Select
                                              selectHandler = { val => dispatch(setFileManagerAccess(val)) }
                                              selectClear  = { () => dispatch(setFileManagerAccess(null)) }
                                              placeholder = 'доступ к ресурсу для ответственного'
                                              selectList = {[{id: 1, name: 'Доступ необходим', code: 'ACCESS'}, {id: 2, name: 'Доступ не требуется', code: 'NOACCESS'}, ]}
                                              val = ''
                                              name='managerAccess'
                                              id = 'managerNoAccess'
                                            />
                                          </div>

                                          <div>
                                            <label htmlFor="fileNotes">Примечание</label>
                                            <Comments 
                                              inputHandler = { val => dispatch(setFileNotes(val)) }
                                              id = 'fileNotes'
                                            />
                                          </div>                                         
                                        </>
                                      : null  
                                    }        
                                  </>
                                : null
                              } 

               
                            </>
                          : null

                        }

                     
                      </>
                    : null
                  }


                </>
              : null
            }

          </>
        : null
      }

    </>
  )
}

