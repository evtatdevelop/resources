import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Select from '../../components/select';
import Input from '../../components/input';
import { serverAction, setServerReasons, serverReasons, getServerResouceList, serverResouceList, loading, 
  setServerModResource, serverModResource, servCores, servMem, servStorage, serverNets,
  setServCores, setServMem, setServStorage, setServerNets,
  setServerPeriod, serverPeriod, setServerDate, serverDate, setServerComment, 
} from '../serverResourceSlice';
import { Comments } from '../../components/comments/comments';
import { InputDate } from '../../components/inputDate';
import { dateToStrDate } from '../../../utils';
import { Plug } from '../../components/plug';
import { ServerResourceList } from './serverResourceList';
import { TestLoader } from '../../components/selectInput/testLoader';

export const ModifyServerResource = () => {
  const dispatch = useDispatch(); 
  const action = useSelector(serverAction);
  const serverReason = useSelector(serverReasons); 
  const serverResources = useSelector(serverResouceList);
  const load = useSelector(loading);
  const serverModRes = useSelector(serverModResource);
  const servCoresVal = useSelector(servCores);
  const servMemVal = useSelector(servMem);
  const servStorageVal = useSelector(servStorage);
  const serverNetsVal = useSelector(serverNets);
  const serverPeriodVal = useSelector(serverPeriod);
  const serverDateVal = useSelector(serverDate);
  // const serverCommentVal = useSelector(serverComment);


  // console.log('serverReason ', serverReason);
  // console.log('serverModRes ', serverModRes);
  // console.log('servCoresVal ', servCoresVal);
  // console.log('servMemVal ', servMemVal);
  // console.log('servStorageVal ', servStorageVal);
  // console.log('serverNetsVal ', serverNetsVal);
  // console.log('serverPeriodVal ', serverPeriodVal);
  // console.log('serverDateVal ', serverDateVal);
  // console.log('serverCommentVal ', serverCommentVal);

  useEffect(() => {
    if ( action ) {
      document.getElementById('serverReasons')?.focus();
      if ( !serverResources.length ) dispatch(getServerResouceList());
    } else {
      dispatch(setServerReasons(null));
      dispatch(setServerModResource(null));
      dispatch(setServCores(null));
      dispatch(setServMem(null));
      dispatch(setServStorage(null));
      dispatch(setServerNets(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[action, dispatch, serverResources])

  useEffect(() => {
    if ( serverReason ) {
    } else {
      dispatch(setServerModResource(null));
      dispatch(setServCores(null));
      dispatch(setServMem(null));
      dispatch(setServStorage(null));
      dispatch(setServerNets(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[dispatch, serverReason])

  useEffect(() => {
    if ( serverModRes ) {
      document.getElementById('serverResourceCore')?.focus();
    } else {
      dispatch(setServCores(null));
      dispatch(setServMem(null));
      dispatch(setServStorage(null));
      dispatch(setServerNets(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[dispatch, serverModRes])

  useEffect(() => {
    if ( servCoresVal ) {

    } else {
      dispatch(setServMem(null));
      dispatch(setServStorage(null));
      dispatch(setServerNets(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[dispatch, servCoresVal])

  useEffect(() => {
    if ( servMemVal ) {

    } else {
      dispatch(setServStorage(null));
      dispatch(setServerNets(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[dispatch, servMemVal])

  useEffect(() => {
    if ( servStorageVal ) {

    } else {
      dispatch(setServerNets(null));
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[dispatch, servStorageVal])



  useEffect(() => {
    if ( serverNetsVal ) document.getElementById('serverPeriod')?.focus(); 
    else {
      dispatch(setServerPeriod(null));
      dispatch(setServerDate(null));
      dispatch(setServerComment(null));
    }
  },[dispatch, serverNetsVal])
  
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

      { serverReason
        ? <ServerResourceList/>
        : <div>
            <label></label>
            <Plug load = { true }>
            { load && !serverResources.length
              ? <TestLoader/>
              : null
            }
            </Plug>
          </div>
      }  

      <h2>Увеличить на:</h2>
      <p>Обратите внимание, что с 30.01.2018г. в заявке необходимо указывать параметры, которые будут добавляться к исходным на указанном сервере. Если увеличение какого-либо параметра не требуется, оставьте поле незаполненным</p>
      <div>
        <label htmlFor="serverResourceCore">Количество ядер</label>
        { serverModRes
          ? <Input 
              inputHandler = { val => dispatch(setServCores(val)) }
              inputClear = { () => dispatch(setServCores(null)) }
              placeholder = 'Количество ядер'
              val = ''
              readOnly = {false}
              id = 'serverResourceCore'
            />
          : <Plug/> 
        }
      </div>

      <div>
        <label htmlFor="serverResourceMem">Количество оперативной памяти (Гб)</label>
        { servCoresVal
          ? <Input 
              inputHandler = { val => dispatch(setServMem(val)) }
              inputClear = { () => dispatch(setServMem(null)) }
              placeholder = 'Количество оперативной памяти (Гб)'
              val = ''
              readOnly = {false}
              id = 'serverResourceMem'
            />
          : <Plug/> 
        }
      </div>

      <div>
        <label htmlFor="serverResourceStorage">Жесткий диск (Гб)</label>
        { servMemVal
          ? <Input 
              inputHandler = { val => dispatch(setServStorage(val)) }
              inputClear = { () => dispatch(setServStorage(null)) }
              placeholder = 'Жесткий диск (Гб)'
              val = ''
              readOnly = {false}
              id = 'serverResourceStorage'
            />
          : <Plug/> 
        }
      </div>

      <div>
        <label htmlFor="serverNetsName">Количество сетевых интерфейсов</label>
        { servStorageVal
          ? <Input 
              inputHandler = { val => dispatch(setServerNets(val)) }
              inputClear = { () => dispatch(setServerNets(null)) }
              placeholder = 'Количество сетевых интерфейсов'
              val = ''
              readOnly = {false}
              id = 'serverNetsName'
            />
          : <Plug/> 
        }
      </div>


      <div>
        <label htmlFor="serverPeriod">Период действия</label>
        { serverNetsVal
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

