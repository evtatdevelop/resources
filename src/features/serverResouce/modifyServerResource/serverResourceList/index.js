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
    item[1].toUpperCase().includes(val.toUpperCase()) 
    || item[2].toUpperCase().includes(val.toUpperCase()) 
    || item[3].toUpperCase().includes(val.toUpperCase()) 
    || item[4].toUpperCase().includes(val.toUpperCase()) 
    || item[5].toUpperCase().includes(val.toUpperCase()) 
    || item[6].toUpperCase().includes(val.toUpperCase()) 
  );
// $item['id'], 
// $item['server_name'],
// $item['place_name'],
// $item['type_name'], 
// $item['group_name'],
// $item['app12_system_fio'],
// $item['app12_boss_fio'], 
// $item['num_cores'],
// $item['ram_gb'],
// $item['hdd_gb'], 
// $item['num_interfaces'],
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
              <div>{fserverModRes[1]}
              <button type="button"
                onClick={() => reSetResource()}
                aria-label="Clear"
              >&times;</button>
              </div>
            </div> 

            <h2>Текущие ресурсы:</h2> 
            <div>
              <label htmlFor="">Количество ядер</label>
              <div>{fserverModRes[7]}</div> 
            </div>           
            <div>
              <label htmlFor="">Количество оперативной памяти (Гб)</label>
              <div>{fserverModRes[8]}</div> 
            </div>           
            <div>
              <label htmlFor="">Жесткий диск (Гб)</label>
              <div>{fserverModRes[9]}</div> 
            </div>           
            <div>
              <label htmlFor="">Количество сетевых интерфейсов</label>
              <div>{fserverModRes[10]}</div> 
            </div>           
          </div>
// $item['id'], 
// $item['server_name'],
// $item['place_name'],
// $item['type_name'], 
// $item['group_name'],
// $item['app12_system_fio'],
// $item['app12_boss_fio'], 
// $item['num_cores'],
// $item['ram_gb'],
// $item['hdd_gb'], 
// $item['num_interfaces'],
        : <> 
            <Input 
              inputHandler = { val => setFiltred(search(val)) }
              inputClear = { () => clear() }
              placeholder = 'Поиск ресурса. (поиск по любому )'
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
                  { filtred.map(item => <li key={item[0]}
                      onClick={() => setFileResource(item)}
                    >
                      <div>{item[1]}</div>
                      <div>{item[2]}</div>
                      <div>{item[3]}</div>
                      <div>{item[4]}</div>
                      <div>{item[5]}</div>
                      <div>{item[6]}</div>
                    </li>)
                  }
                </ul>
            }        
          </>
      }
    
    </div> 
  )
}
