import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './serverResouce.module.scss';
import { resourceType } from '../../appSlice';
import { Plug } from '../components/plug';
import Select from '../components/select';
import { setServerAction, serverAction, clearServerForm, } from './serverResourceSlice';
import { CreateServerResouce } from './createServerResource';
import { ModifyServerResource } from './modifyServerResource';

export const ServerResouce = () => {
  const dispatch = useDispatch(); 
  const resType = useSelector(resourceType);
  const action = useSelector(serverAction);

  // console.log('action ', action);
    
  useEffect(() => {
    if ( resType )
    document.getElementById('serverAction')?.focus();
  }, [resType])

  return (
    <section className={styles.serverResouce} >
      <fieldset>
        <legend>Требования к файловому ресурсу</legend>
        <div>
          <label htmlFor="serverAction">Действие</label>
          { resType
            ? <Select
                selectHandler = { val =>{
                  dispatch(clearServerForm());
                  dispatch(setServerAction(val.code));
                } }
                selectClear  = { () => {
                  dispatch(clearServerForm());
                  document.getElementById('serverAction')?.focus();
                }  }
                placeholder = 'Выбор действия с ресурсом'
                selectList = {[{'id': 1, 'name': 'Создание / регистрация ресурса', 'code': 'CREATE'}, {'id': 2, 'name': 'Расширение имеющегося ресурса', 'code': 'MODIFY'}]}
                val = ''
                name='serverAction'
                id = 'serverAction'
              />
            : <Plug/>
          }         
        </div>

        { action === 'CREATE'
          ? <CreateServerResouce/>
          : action === 'MODIFY'
            ? <ModifyServerResource/>
            : <CreateServerResouce/>
        }
      </fieldset>

    </section>    
  )
}

