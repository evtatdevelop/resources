import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './serverResourceList.module.scss';
import { serverResouceList, setServerModResource, serverModResource, loading, } from '../../serverResourceSlice';
import { TestLoader } from '../../../components/loader/testLoader';
import Input from '../../../components/input';
// import { Plug } from '../../../components/plug';

export const ServerResourceList = () => {
  const dispatch = useDispatch(); 
  const serverResources = useSelector(serverResouceList);
  const load = useSelector(loading);
  const fserverModRes = useSelector(serverModResource);
  
  useEffect(() => {
    // document.getElementById('serverFiltr')?.focus();
    // if ( !serverResources.length )
    //   dispatch(getServerResouceList());
      setFiltred(serverResources);
  }, [dispatch, serverResources])
  

  // console.log('serverResources', serverResources);
  
  const [filtred, setFiltred] = useState([]);

  const search = val => serverResources.filter(item => 
    item.server_name.toUpperCase().includes(val.toUpperCase()) 
    || item.place_name.toUpperCase().includes(val.toUpperCase()) 
    || item.type_name.toUpperCase().includes(val.toUpperCase()) 
    || item.group_name.toUpperCase().includes(val.toUpperCase()) 
    || item.app12_system_fio.toUpperCase().includes(val.toUpperCase()) 
    || item.app12_boss_fio.toUpperCase().includes(val.toUpperCase()) 
  );

  const clear = () => setFiltred(serverResources);

  const setFileResource = val => {
    dispatch(setServerModResource(val));
  }

  const reSetResource = () => {
    dispatch(setServerModResource(null));
    document.getElementById('fileFiltr')?.focus();
    clear();
  }

  useEffect(() => {
    if ( !fserverModRes )  document.getElementById('fileFiltr')?.focus();
  }, [fserverModRes])

  return (
    <div className={styles.fileResourceList}>
      { fserverModRes
        ?  <div className={styles.modResource}>
            <div
              onClick={() => reSetResource()}
            >
              <label htmlFor="">Имя сервера</label>
              <div>{fserverModRes.server_name}
              <button type="button"
                onClick={() => reSetResource()}
                aria-label="Clear"
              >&times;</button>
              </div>
            </div> 

            <h2>Текущие ресурсы:</h2> 
            <div>
              <label htmlFor="">Количество ядер</label>
              <div>{fserverModRes.num_cores}</div> 
            </div>           
            <div>
              <label htmlFor="">Количество оперативной памяти (Гб)</label>
              <div>{fserverModRes.ram_gb}</div> 
            </div>           
            <div>
              <label htmlFor="">Жесткий диск (Гб)</label>
              <div>{fserverModRes.hdd_gb}</div> 
            </div>           
            <div>
              <label htmlFor="">Количество сетевых интерфейсов</label>
              <div>{fserverModRes.num_interfaces}</div> 
            </div>           
          </div>

        : <> 
            <Input 
              inputHandler = { val => setFiltred(search(val)) }
              inputClear = { () => clear() }
              placeholder = 'Поиск ресурса. (поиск по любому значению)'
              val = ''
              readOnly = {false}
              id = 'fileFiltr'
            />
            <div className={styles.lstHead}>
              <div>Имя сервера</div>
              <div>Площадка</div>
              <div>Тип сервера</div>
              <div>Группа серверов</div>
              <div>Ответственный (по системе / сервису)</div>
              <div>Ответственный (начальник управления)</div>
            </div>
            { load
              ? <TestLoader/>
              : <ul className={styles.list}>
                  { filtred.map(item => <li key={item.id}
                      onClick={() => setFileResource(item)}
                    >
                      <div>{item.server_name}</div>
                      <div>{item.place_name}</div>
                      <div>{item.type_name}</div>
                      <div>{item.group_name}</div>
                      <div>{item.app12_system_fio}</div>
                      <div>{item.app12_boss_fio}</div>
                    </li>)
                  }
                </ul>
            }        
          </>
      }
    
    </div> 
  )
}
