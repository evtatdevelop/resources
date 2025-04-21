import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Select from '../../components/select';
import Input from '../../components/input';
import { serverAction, setServerReasons, serverReasons, setServerPlace, serverPlacesList, getServerPlaceList, serverPlace,
  loading, setServerType, serverType, getServerGroupList, serverGroupList, setServerGroup, serverGroup,
  getOperSystemsList, serverOperSystemList, setServerOperSystem, serverOperSystem, setServerResourceManager, serverResourceManager,
  setServerResourceName, serverResourceName, setServCores, servCores, setServMem, servMem,
  setServStorage, servStorage, setSorageComment, sorageComment, setServerNets, serverNets, setNetsComment, netsComment,
  setServerPeriod, serverPeriod, setServerDate, serverDate, setServerComment,  
 } from '../serverResourceSlice';
import { Comments } from '../../components/comments/comments';
import { SelectInput } from '../../components/selectInput';
import { InputDate } from '../../components/inputDate';
import { dateToStrDate } from '../../../utils';
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
  const servMemVal = useSelector(servMem);
  const servStorageVal = useSelector(servStorage);
  const sorageCommentVal = useSelector(sorageComment);
  const serverNetsVal = useSelector(serverNets);
  const netsCommentVal = useSelector(netsComment);
  const serverPeriodVal = useSelector(serverPeriod);
  const serverDateVal = useSelector(serverDate);
  // const serverCommentVal = useSelector(serverComment);

const [manualServCores, setManualServCores] = useState(false);
const [manualServMem, setManualServMem] = useState(false);
const [manualServStorage, setManualServStorage] = useState(false);
const [manualServNets, setManualServNets] = useState(false);

  // console.log('serverReason ', serverReason);
  // console.log('serverPlaceVal ', serverPlaceVal);
  // console.log('servType ', servType);
  // console.log('servGroup ', servGroup);
  // console.log('serverOperSystem ', servOperSystem);
  // console.log('serverResManager ', serverResManager);
  // console.log('serverName ', serverName);
  // console.log('servCoresVal ', servCoresVal);
  // console.log('servMemVal ', servMemVal);
  // console.log('servStorageVal ', servStorageVal);
  // console.log('sorageCommentVal ', sorageCommentVal);
  // console.log('serverNetsVal ', serverNetsVal);
  // console.log('netsCommentVal ', netsCommentVal);
  // console.log('serverPeriodVal ', serverPeriodVal);
  // console.log('serverDateVal ', serverDateVal);
  // console.log('serverCommentVal ', serverCommentVal);

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
      setManualServMem(false);
      dispatch(setServMem(null));
      setManualServStorage(false);
      dispatch(setServStorage(null));
      dispatch(setSorageComment(null));
      setManualServNets(false);
      dispatch(setServerNets(null));
      dispatch(setNetsComment(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
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
      setManualServMem(false);
      dispatch(setServMem(null));
      setManualServStorage(false);
      dispatch(setServStorage(null));
      dispatch(setSorageComment(null));
      setManualServNets(false);
      dispatch(setServerNets(null));
      dispatch(setNetsComment(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
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
      setManualServMem(false);
      dispatch(setServMem(null));
      setManualServStorage(false);
      dispatch(setServStorage(null));
      dispatch(setSorageComment(null));
      setManualServNets(false);
      dispatch(setServerNets(null));
      dispatch(setNetsComment(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
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
      setManualServMem(false);
      dispatch(setServMem(null));
      setManualServStorage(false);
      dispatch(setServStorage(null));
      dispatch(setSorageComment(null));
      setManualServNets(false);
      dispatch(setServerNets(null));
      dispatch(setNetsComment(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
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
      setManualServMem(false);
      dispatch(setServMem(null));
      setManualServStorage(false);
      dispatch(setServStorage(null));
      dispatch(setSorageComment(null));
      setManualServNets(false);
      dispatch(setServerNets(null));
      dispatch(setNetsComment(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
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
      setManualServMem(false);
      dispatch(setServMem(null));
      setManualServStorage(false);
      dispatch(setServStorage(null));
      dispatch(setSorageComment(null));
      setManualServNets(false);
      dispatch(setServerNets(null));
      dispatch(setNetsComment(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[dispatch, servOperSystem])

  useEffect(() => {
    if ( serverResManager ) {
      document.getElementById('serverResourceName')?.focus();
    } else {
      dispatch(setServerResourceName(null));
      setManualServCores(false);
      dispatch(setServCores(null));
      setManualServMem(false);
      dispatch(setServMem(null));
      setManualServStorage(false);
      dispatch(setServStorage(null));
      dispatch(setSorageComment(null));
      setManualServNets(false);
      dispatch(setServerNets(null));
      dispatch(setNetsComment(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[dispatch, serverResManager])

  useEffect(() => {
    if ( serverName ) {
      document.getElementById('servCores')?.focus();
    } else {
      setManualServCores(false);
      dispatch(setServCores(null));
      setManualServMem(false);
      dispatch(setServMem(null));
      setManualServStorage(false);
      dispatch(setServStorage(null));
      dispatch(setSorageComment(null));
      setManualServNets(false);
      dispatch(setServerNets(null));
      dispatch(setNetsComment(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[dispatch, serverName])

  useEffect(() => {
    if ( manualServCores ) document.getElementById('servCoresManual')?.focus();
  },[manualServCores])

  useEffect(() => {
    if ( servCoresVal ) {
      if ( servCoresVal && !manualServCores ) document.getElementById('servMem')?.focus();
    } else {
      setManualServMem(false);
      dispatch(setServMem(null));
      setManualServStorage(false);
      dispatch(setServStorage(null));
      dispatch(setSorageComment(null));
      setManualServNets(false);
      dispatch(setServerNets(null));
      dispatch(setNetsComment(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[dispatch, manualServCores, servCoresVal])

  useEffect(() => {
    if ( manualServMem ) document.getElementById('servMemManual')?.focus();
  },[manualServMem])

  useEffect(() => {
    if ( servMemVal ) {
      if ( servMemVal && !manualServMem ) document.getElementById('servStorage')?.focus();
    } else {
      setManualServStorage(false);
      dispatch(setServStorage(null));
      dispatch(setSorageComment(null));
      setManualServNets(false);
      dispatch(setServerNets(null));
      dispatch(setNetsComment(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[dispatch, manualServMem, servMemVal])

  useEffect(() => {
    if ( manualServStorage ) document.getElementById('servStorageManual')?.focus();
  },[manualServStorage])

  useEffect(() => {
    if ( servStorageVal ) {
      if ( servStorageVal && !manualServStorage ) document.getElementById('sorageComment')?.focus();
    } else {
      dispatch(setSorageComment(null));
      setManualServNets(false);
      dispatch(setServerNets(null));
      dispatch(setNetsComment(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[dispatch, manualServStorage, servStorageVal])

  useEffect(() => {
    if ( sorageCommentVal ) {
      // document.getElementById('servNets')?.focus();
    } else {
      setManualServNets(false);
      dispatch(setServerNets(null));
      dispatch(setNetsComment(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[dispatch, sorageCommentVal])

  useEffect(() => {
    if ( manualServNets ) document.getElementById('servNetsManual')?.focus();
  },[manualServNets])

  useEffect(() => {
    if ( serverNetsVal ) {
      if ( serverNetsVal && !manualServNets ) document.getElementById('netsComment')?.focus();
    } else {
      dispatch(setNetsComment(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[dispatch, manualServNets, serverNetsVal])
  
  useEffect(() => {
    if ( netsCommentVal ) {
      // document.getElementById('serverPeriod')?.focus();
    } else {
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[dispatch, netsCommentVal])
  
  useEffect(() => {
    if ( serverPeriodVal ) 
      if ( serverPeriodVal?.code === "PERMANENT" ) {
        document.getElementById('serverComment')?.focus();
        dispatch(setServerDate(null));
      } 
      if ( serverPeriodVal?.code === "TEMPORARY" ) document.getElementById('expDate')?.focus(); 
    else {
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[dispatch, serverPeriodVal])
  
  useEffect(() => {
    if ( serverDateVal ) document.getElementById('serverComment')?.focus();
    else {
      dispatch(setServerComment(null));
    }
  },[dispatch, serverDateVal])




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
                  document.getElementById('servCores')?.focus();
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

      <div>
        <label htmlFor="servMem">Количество оперативной памяти (Гб)</label>
        { !manualServMem
          ? servCoresVal && servCoresVal !== 'MANUAL'
            ? <Select
                selectHandler = { val => {
                  dispatch(setServMem(val.value));
                  if ( val.value && val.value === 'MANUAL' ) setManualServMem(true);
                  else setManualServMem(false);                  
                } }
                selectClear  = { () => {
                  dispatch(setServMem(null));
                  setManualServMem(false);
                  document.getElementById('servMem')?.focus();
                } }
                placeholder = 'Количество оперативной памяти (Гб)'
                selectList = {[
                  {'id': 2, 'name': '2', 'value': 2},
                  {'id': 4, 'name': '4', 'value': 4},
                  {'id': 6, 'name': '6', 'value': 6},
                  {'id': 8, 'name': '8', 'value': 8},
                  {'id': 10, 'name': '10', 'value': 10},
                  {'id': 11, 'name': 'Другое значение (указать вручную)', 'value': 'MANUAL'}]}
                val = ''
                name='servMem'
                id = 'servMem'
              />
            : <Plug/>   
          : null
        }
        { manualServMem
          ? <Input 
              inputHandler = { val => {
                dispatch(setServMem(val));
                if ( !val ) setManualServMem(false);
              } }
              inputClear = { () => {
                dispatch(setServMem(null));
                setManualServMem(false); 
              } }
              placeholder = 'Количество оперативной памяти (Гб)'
              val = ''
              readOnly = {false}
              id = 'servMemManual'
            />
          : null
        }
      </div>

      <div>
        <label htmlFor="servStorage">Жесткий диск (Гб)</label>
        { !manualServStorage
          ? servMemVal && servMemVal !== 'MANUAL'
            ? <Select
                selectHandler = { val => {
                  dispatch(setServStorage(val.value));
                  if ( val.value && val.value === 'MANUAL' ) setManualServStorage(true);
                  else setManualServStorage(false);                  
                } }
                selectClear  = { () => {
                  dispatch(setServStorage(null));
                  setManualServStorage(false);
                  document.getElementById('servStorage')?.focus();
                } }
                placeholder = 'Жесткий диск (Гб)'
                selectList = {[
                  {'id': 60, 'name': '60', 'value': 60},
                  {'id': 70, 'name': '70', 'value': 70},
                  {'id': 80, 'name': '80', 'value': 80},
                  {'id': 11, 'name': 'Другое значение (указать вручную)', 'value': 'MANUAL'}]}
                val = ''
                name='servStorage'
                id = 'servStorage'
              />
            : <Plug/>   
          : null
        }
        { manualServStorage
          ? <Input 
              inputHandler = { val => {
                dispatch(setServStorage(val));
                if ( !val ) setManualServStorage(false);
              } }
              inputClear = { () => {
                dispatch(setServStorage(null));
                setManualServStorage(false); 
              } }
              placeholder = 'Жесткий диск (Гб)'
              val = ''
              readOnly = {false}
              id = 'servStorageManual'
            />
          : null
        }
      </div>
      { servMemVal
        ? <p>Требуется указать суммарный объем дискового пространства для сервера.<br/>В случае необходимости наличия нескольких дисков, в примечании необходимо указать количество и требуемый размер каждого диска.</p>
        : null
      }

      <div>
        <label htmlFor="sorageComment">Жёсткий диск - комментарии по разбиению</label>
        { servStorageVal && servStorageVal !== 'MANUAL'
          ? <Comments 
              inputHandler = { val => dispatch(setSorageComment(val)) }
              id = 'sorageComment'
            />
          : <Plug/>    
        }
      </div>

      <div>
        <label htmlFor="servNets">Количество сетевых интерфейсов</label>
        { !manualServNets
          ? sorageCommentVal
            ? <Select
                selectHandler = { val => {
                  dispatch(setServerNets(val.value));
                  if ( val.value && val.value === 'MANUAL' ) setManualServNets(true);
                  else setManualServNets(false);                  
                } }
                selectClear  = { () => {
                  dispatch(setServerNets(null));
                  setManualServNets(false);
                  document.getElementById('servNets')?.focus();
                } }
                placeholder = 'Количество сетевых интерфейсов'
                selectList = {[
                  {'id': 1, 'name': '1', 'value': 1},
                  {'id': 2, 'name': '2', 'value': 2},
                  {'id': 3, 'name': '3', 'value': 3},
                  {'id': 11, 'name': 'Другое значение (указать вручную)', 'value': 'MANUAL'}]}
                val = ''
                name='servNets'
                id = 'servNets'
              />
            : <Plug/>   
          : null
        }
        { manualServNets
          ? <Input 
              inputHandler = { val => {
                dispatch(setServerNets(val));
                if ( !val ) setManualServNets(false);
              } }
              inputClear = { () => {
                dispatch(setServerNets(null));
                setManualServNets(false); 
              } }
              placeholder = 'Количество сетевых интерфейсов'
              val = ''
              readOnly = {false}
              id = 'servNetsManual'
            />
          : null
        }
      </div>

      <div>
        <label htmlFor="netsComment">Сетевой интерфейс - комментарии</label>
        { serverNetsVal && serverNetsVal !== 'MANUAL'
          ? <Comments 
              inputHandler = { val => dispatch(setNetsComment(val)) }
              id = 'netsComment'
            />
          : <Plug/>    
        }
      </div>

      <div>
        <label htmlFor="serverPeriod">Период действия</label>
        { netsCommentVal
          ? <Select
              selectHandler = { val => {
                dispatch(setServerPeriod(val));                 
              } }
              selectClear  = { () => {
                dispatch(setServerPeriod(null));
                document.getElementById('serverPeriod')?.focus(); 
              } }
              placeholder = 'Период действия'
              selectList = {[{id: 1, name: 'Постоянный ресурс', code: 'PERMANENT'}, {id: 2, name: 'Временный ресурс', code: 'TEMPORARY'}, ]}
              val = ''
              name='serverPeriod'
              id = 'serverPeriod'
            /> 
          : <Plug/>  
        }      
      </div>

      { serverPeriodVal?.code === "TEMPORARY"
        ?  <div>
            <label htmlFor="expDate">Действует до</label>
            <InputDate
              dateHandler = { val => dispatch(setServerDate(dateToStrDate(val))) }
              lang='ru'
              id = 'expDate'
            />
          </div>
        : null  
      }


      <div>
        <label htmlFor="serverComment">Примечание</label>
        { serverPeriodVal?.code === 'PERMANENT' || ( serverPeriodVal?.code === 'TEMPORARY' && serverDateVal )
          ? <Comments 
              inputHandler = { val => dispatch(setServerComment(val)) }
              id = 'serverComment'
            />
          : <Plug/>    
        }
      </div>

    </>
  )

}

