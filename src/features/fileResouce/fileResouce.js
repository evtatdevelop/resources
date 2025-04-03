import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './fileResouce.module.scss';
import Select from '../components/select';
import Input from '../components/input';
import { setFileAction, setFileResourceName, fileAction, fileResourceName,
  setFileValue, fileValue, setFileReasons, fileReasons, getFilePlaceList, filePlaceList, 
  setFilePlace, filePlace,
} from './fileResourceSlice';
import { Comments } from '../components/comments/comments';

export const FileResouce = () => {
  const dispatch = useDispatch(); 
  const action = useSelector(fileAction);
  const resourceName = useSelector(fileResourceName);
  const fileVal = useSelector(fileValue);
  const fileReason = useSelector(fileReasons);
  const filePlaces = useSelector(filePlaceList);
  const filePlaceVal = useSelector(filePlace);
  const [manualFileVal, setManualFileVal] = useState(false);

  // const setFileValue = val => {
  //   dispatch(setFileValue(val?.value))
    // const { value } = val;
    // dispatch(setFileValue(value));
    // if ( val === 99999 ) setManualFileAction(true)
    // else setManualFileAction(false);
  // }

  console.log('action', action);
  console.log('resourceName', resourceName);
  console.log('fileVal', fileVal);
  console.log('fileReason', fileReason);
  console.log('filePlace', filePlaceVal);
  
  useEffect(() => {
    document.getElementById('fileAction')?.focus();
  },[])
  
  useEffect(() => {
    if ( action ) {
      document.getElementById('fileResourceName')?.focus();
      dispatch(getFilePlaceList());
    }
  },[action, dispatch])
  
  useEffect(() => {
    if ( manualFileVal ) document.getElementById('fileValueManual')?.focus();
  },[manualFileVal])

  return (
    <section className={styles.fileResouce} >
      <fieldset>
        <legend>Требования к файловому ресурсу</legend>
        <div>
          <label htmlFor="fileAction">Действие</label>
          <Select
            selectHandler = { val => dispatch(setFileAction(val.code)) }
            selectClear  = { () => {
              dispatch(setFileAction(null));
              dispatch(setFileResourceName(null));
              dispatch(setFileValue(null));
              setManualFileVal(false);
              dispatch(setFileReasons(null));
              dispatch(setFilePlace(null));
            } }
            placeholder = 'Выбор действия с файловым ресурсом'
            selectList = {[{'id': 1, 'name': 'Создание / регистрация ресурса', 'code': 'CREATE'}, {'id': 2, 'name': 'Расширение имеющегося ресурса', 'code': 'MODIFY'}]}
            val = ''
            name='fileAction'
            id = 'fileAction'
          />
        </div>

        { action === 'CREATE'
        ? <>
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

            <div>
              <label htmlFor="fileValue">Требуемый объем (Гб)</label>
              { !manualFileVal
                ? <Select
                    selectHandler = { val => {
                      dispatch(setFileValue(val.value));
                      if ( val.value && val.value === '0' ) setManualFileVal(true);
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
                      {'id': 4, 'name': 'Другое значение (указать вручную)', 'value': '0'}]}
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

            <div>
              <label htmlFor="fileReasons">Обоснование необходимости выделения / расширения ресурса</label>
              <Comments 
                inputHandler = { val => {
                  dispatch(setFileReasons(val));
                } }
                id = 'fileReasons'
              />
            </div>

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

            <div>
              <label htmlFor="filePeriod">Период действия</label>
              <Select
                selectHandler = { val => {
                  // dispatch(setFilePlace(val));                 
                } }
                selectClear  = { () => {
                  // dispatch(setFilePlace(null));
                } }
                placeholder = 'Период действия'
                selectList = {[{id: 1, name: 'Постоянный ресурс', code: 'PERMANENT'}, {id: 2, name: 'Временный ресурс', code: 'TEMPORARY'}, ]}
                val = ''
                name='filePeriod'
                id = 'filePeriod'
              />
            </div>
              
          </> 

        : null
      }


      </fieldset>    

    </section>    
  )
}

