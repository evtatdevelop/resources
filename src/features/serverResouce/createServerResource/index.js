import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Select from '../../components/select';
// import Input from '../../components/input';
import { serverAction, setServerReasons, serverReasons, setServerPlace, serverPlacesList, getServerPlaceList, serverPlace,
  loading, setServerType, serverType
 } from '../serverResourceSlice';
import { Comments } from '../../components/comments/comments';
// import { SelectInput } from '../../components/selectInput';
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

  console.log('serverReason ', serverReason);
  console.log('serverPlaceVal ', serverPlaceVal);
  console.log('servType ', servType);

  useEffect(() => {
    if ( action ) {
      document.getElementById('serverReasons')?.focus();
    } else {
      dispatch(setServerReasons(null));
      dispatch(setServerPlace(null));
      dispatch(setServerType(null));
    }
  },[action, dispatch])

  useEffect(() => {
    if ( serverReason ) {
      if ( !serverPlaces.length ) dispatch(getServerPlaceList());
    } else {
      dispatch(setServerPlace(null));
      dispatch(setServerType(null));
    }
  },[dispatch, serverPlaces.length, serverReason])

  useEffect(() => {
    if ( serverPlaceVal ) {
      document.getElementById('serverType')?.focus();
    } else {
      dispatch(setServerType(null));
    }
  },[dispatch, serverPlaceVal])


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
              } }
              placeholder = 'Площадка физического местоположения ресурса'
              selectList = {serverPlaces}
              val = ''
              name='serverPlace'
              id = 'serverPlace'
            />
          : <Plug>
            { load
              ? <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>{<TestLoader/>}</div>
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
    </>
  )

}

