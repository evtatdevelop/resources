import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Select from '../../components/select';
import Input from '../../components/input';
import { serverAction, setServerReasons, serverReasons, setServerPlace, serverPlacesList, getServerPlaceList, serverPlace,
  loading, setServerType, serverType, getServerGroupList, serverGroupList, setServerGroup, serverGroup,
  getOperSystemsList, serverOperSystemList, setServerOperSystem, serverOperSystem, setServerResourceManager, serverResourceManager,
  setServerResourceName, serverResourceName, setServCores, servCores, 
 } from '../serverResourceSlice';
import { Comments } from '../../components/comments/comments';
import { SelectInput } from '../../components/selectInput';
// import { InputDate } from '../../components/inputDate';
// import { dateToStrDate } from '../../../utils';
import { Plug } from '../../components/plug';
import { TestLoader } from '../../components/selectInput/testLoader';

export const CreateServerResouce = () => {
  const dispatch = useDispatch(); 
  const action = useSelector(serverAction);
  const serverReason = useSelector(serverReasons);
  const serverPlaces = useSelector(serverPlacesList);
  const serverPlaceVal = useSelector(serverPlace);
  const load = useSelector(loading);
  const servType = useSelector(serverType);
  const serverGroups = useSelector(serverGroupList);
  const servGroup = useSelector(serverGroup);
  const serverOperSystems = useSelector(serverOperSystemList);
  const servOperSystem = useSelector(serverOperSystem);
  const serverResManager = useSelector(serverResourceManager);
  const serverName = useSelector(serverResourceName);
  const servCoresVal = useSelector(servCores);

const [manualServCores, setManualServCores] = useState(false);
const [manualServMem, setManualServMem] = useState(false);
const [manualServStorage, setManualServStorage] = useState(false);
const [manualServNets, setManualServNets] = useState(false);

  console.log('serverReason ', serverReason);
  console.log('serverPlaceVal ', serverPlaceVal);
  console.log('servType ', servType);
  console.log('servGroup ', servGroup);
  console.log('serverOperSystem ', servOperSystem);
  console.log('serverResManager ', serverResManager);
  console.log('serverName ', serverName);
  console.log('servCoresVal ', servCoresVal);

  useEffect(() => {
    if ( action ) {
      document.getElementById('serverReasons')?.focus();
      if ( !serverPlaces.length ) dispatch(getServerPlaceList());
      if ( !serverGroups.length ) dispatch(getServerGroupList());
      if ( !serverOperSystems.length ) dispatch(getOperSystemsList());
    } else {
      dispatch(setServerReasons(null));
      dispatch(setServerPlace(null));
      dispatch(setServerType(null));
      dispatch(setServerGroup(null));
      dispatch(setServerOperSystem(null));
      dispatch(setServerResourceManager(null));
      dispatch(setServerResourceName(null));
      setManualServCores(false);
      dispatch(setServCores(null));
    }
  },[action, dispatch, serverPlaces, serverGroups, serverOperSystems])

  useEffect(() => {
    if ( serverReason ) {
      // if ( !serverPlaces.length ) dispatch(getServerPlaceList());
    } else {
      dispatch(setServerPlace(null));
      dispatch(setServerType(null));
      dispatch(setServerGroup(null));
      dispatch(setServerOperSystem(null));
      dispatch(setServerResourceManager(null));
      dispatch(setServerResourceName(null));
      setManualServCores(false);
      dispatch(setServCores(null));
    }
  },[dispatch, serverReason])

  useEffect(() => {
    if ( serverPlaceVal ) {
      document.getElementById('serverType')?.focus();
    } else {
      dispatch(setServerType(null));
      dispatch(setServerGroup(null));
      dispatch(setServerOperSystem(null));
      dispatch(setServerResourceManager(null));
      dispatch(setServerResourceName(null));
      setManualServCores(false);
      dispatch(setServCores(null));
    }
  },[dispatch, serverPlaceVal])

  useEffect(() => {
    if ( servType ) {
      document.getElementById('serverGroup')?.focus();
    } else {
      dispatch(setServerGroup(null));
      dispatch(setServerOperSystem(null));
      dispatch(setServerResourceManager(null));
      dispatch(setServerResourceName(null));
      setManualServCores(false);
      dispatch(setServCores(null));
    }
  },[dispatch, servType])

  useEffect(() => {
    if ( servGroup ) {
      document.getElementById('serverOS')?.focus();
    } else {
      dispatch(setServerOperSystem(null));
      dispatch(setServerResourceManager(null));
      dispatch(setServerResourceName(null));
      setManualServCores(false);
      dispatch(setServCores(null));
    }
  },[dispatch, servGroup])

  useEffect(() => {
    if ( servOperSystem ) {
      document.getElementById('servResourceManager')?.focus();
    } else {
      dispatch(setServerResourceManager(null));
      dispatch(setServerResourceName(null));
      setManualServCores(false);
      dispatch(setServCores(null));
    }
  },[dispatch, servOperSystem])

  useEffect(() => {
    if ( serverResManager ) {
      document.getElementById('serverResourceName')?.focus();
    } else {
      dispatch(setServerResourceName(null));
      setManualServCores(false);
      dispatch(setServCores(null));
    }
  },[dispatch, serverResManager])

  useEffect(() => {
    if ( serverName ) {
      document.getElementById('servCores')?.focus();
    } else {
      setManualServCores(false);
      dispatch(setServCores(null));
    }
  },[dispatch, serverName])

  useEffect(() => {
    if ( manualServCores ) document.getElementById('servCoresManual')?.focus();
  },[manualServCores])

  return (
    <>
      <div>
        <label htmlFor="serverReasons">Обоснование необходимости выделения</label>
        { action
          ? <Comments 
              inputHandler = { val => dispatch(setServerReasons(val)) }
              id = 'serverReasons'
            />
          : <Plug/>    
        }
      </div>

      <div>
        <label htmlFor="serverPlace">Площадка физического местоположения ресурса</label>
        { serverReason
          ? <Select
              selectHandler = { val => {
                dispatch(setServerPlace(val));                 
              } }
              selectClear  = { () => {
                dispatch(setServerPlace(null));
                document.getElementById('serverPlace')?.focus();
              } }
              placeholder = 'Площадка физического местоположения ресурса'
              selectList = {serverPlaces}
              val = ''
              name='serverPlace'
              id = 'serverPlace'
            />
          : <Plug load = { true }>
            { load && !serverPlaces.length
              ? <TestLoader/>
              : null
            }
            </Plug>   
        }  
      </div>

      <div>
        <label htmlFor="serverType">Тип сервера</label>
        { serverPlaceVal
          ? <Select
              selectHandler = { val => {
                dispatch(setServerType(val));                 
              } }
              selectClear  = { () => {
                dispatch(setServerType(null));
                document.getElementById('serverType')?.focus();
              } }
              placeholder = 'Тип сервера'
              selectList = {[{id: 1, name: 'Виртуальный', code: 'VIRTUAL'}, {id: 2, name: 'Железный', code: 'HARD'}, ]}
              val = ''
              name='serverType'
              id = 'serverType'
            />
          : <Plug/>   
        }  
      </div>

      <div>
        <label htmlFor="serverGroup">Группа серверов</label>
        { servType
          ? <Select
              selectHandler = { val => dispatch(setServerGroup(val)) }
              selectClear  = { () => {
                dispatch(setServerGroup(null))
                document.getElementById('serverGroup')?.focus();
              } }
              placeholder = 'Группа серверов'
              selectList = {serverGroups}
              val = ''
              name='serverGroup'
              id = 'serverGroup'
            />
          : <Plug load = { true }>
            { load && !serverGroups.length
              ? <TestLoader/>
              : null
            }
            </Plug>   
        }  
      </div>

      <div>
        <label htmlFor="serverOS">Операционная система</label>
        { servGroup
          ? <Select
              selectHandler = { val => dispatch(setServerOperSystem(val)) }
              selectClear  = { () => {
                dispatch(setServerOperSystem(null));
                document.getElementById('serverOS')?.focus();
              } }
              placeholder = 'Операционная система'
              selectList = {serverOperSystems}
              val = ''
              name='serverOS'
              id = 'serverOS'
            />
          : <Plug load = { true }>
            { load && !serverOperSystems.length
              ? <TestLoader/>
              : null
            }
            </Plug>   
        }  
      </div>
      { servGroup
        ? <p>Если необходима конкретная (специфическая) версия ОС, то необходимо её указать в примечании. Если поле оставить пустым, то будет установлена последняя версия операционной системы, используемая в группе компаний.</p>
        : null
      }

      <div>
        <label htmlFor="servResourceManager">Ответственный за сервер{<br/>}(непосредственный исполнитель)
        </label>
        { servOperSystem
          ? <SelectInput
              selectHandler = { val => dispatch(setServerResourceManager(val))}
              placeholder = 'Ответственный за сервер'
              val = ''
              name='servResourceManager'
              mode = 'user'
              id = 'servResourceManager'
            />
          : <Plug/> 
        }
      </div>

      <div>
        <label htmlFor="serverResourceName">Желаемое имя сервера</label>
        { serverResManager
          ? <Input 
              inputHandler = { val => dispatch(setServerResourceName(val)) }
              inputClear = { () => dispatch(setServerResourceName(null)) }
              placeholder = 'Желаемое имя сервера'
              val = ''
              readOnly = {false}
              id = 'serverResourceName'
            />
          : <Plug/> 
        }
      </div>

      <div>
        <label htmlFor="servCores">Количество ядер</label>
        { !manualServCores
          ? serverName
            ? <Select
                selectHandler = { val => {
                  dispatch(setServCores(val.value));
                  if ( val.value && val.value === 'MANUAL' ) setManualServCores(true);
                  else setManualServCores(false);                  
                } }
                selectClear  = { () => {
                  dispatch(setServCores(null));
                  setManualServCores(false);
                } }
                placeholder = 'Количество ядер'
                selectList = {[
                  {'id': 1, 'name': '1', 'value': 1},
                  {'id': 2, 'name': '2', 'value': 3},
                  {'id': 4, 'name': '4', 'value': 4},
                  {'id': 6, 'name': '6', 'value': 6},
                  {'id': 8, 'name': '8', 'value': 8},
                  {'id': 11, 'name': 'Другое значение (указать вручную)', 'value': 'MANUAL'}]}
                val = ''
                name='servCores'
                id = 'servCores'
              />
            : <Plug/>   
          : null
        }
        { manualServCores
          ? <Input 
              inputHandler = { val => {
                dispatch(setServCores(val));
                if ( !val ) setManualServCores(false);
              } }
              inputClear = { () => {
                dispatch(setServCores(null));
                setManualServCores(false); 
              } }
              placeholder = 'Количество ядер'
              val = ''
              readOnly = {false}
              id = 'servCoresManual'
            />
          : null
        }
      </div>
    </>
  )

}

