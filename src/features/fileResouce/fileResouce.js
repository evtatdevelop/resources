import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './fileResouce.module.scss';
import Select from '../components/select';
import { setFileAction, fileAction, clearFileForm, fileResourceName, fileValue, fileReasons, filePlace, filePeriod, fileResourceManager, fileManagerAccess, } from './fileResourceSlice';
import { CreateFileResouce } from './CreateFileResouce';
import { FileUserList } from './fileUserList';
import { ModifyFileResource } from './ModifyFileResource';

export const FileResouce = () => {
  const dispatch = useDispatch(); 
  const action = useSelector(fileAction);

  const resourceName = useSelector(fileResourceName);
  const fileVal = useSelector(fileValue);
  const fileReason = useSelector(fileReasons);
  const filePlaceVal = useSelector(filePlace);
  const filePeriods = useSelector(filePeriod);
  const fileResManager = useSelector(fileResourceManager);
  const fileManagAccess = useSelector(fileManagerAccess);

  console.log('action', action);
  
  useEffect(() => {
    document.getElementById('fileAction')?.focus();
  }, [])

  return (
    <section className={styles.fileResouce} >
      <fieldset>
        <legend>Требования к файловому ресурсу</legend>
        <div>
          <label htmlFor="fileAction">Действие</label>
          <Select
            selectHandler = { val =>{
              dispatch(clearFileForm());
              dispatch(setFileAction(val.code));
            } }
            selectClear  = { () => dispatch(clearFileForm())  }
            placeholder = 'Выбор действия с файловым ресурсом'
            selectList = {[{'id': 1, 'name': 'Создание / регистрация ресурса', 'code': 'CREATE'}, {'id': 2, 'name': 'Расширение имеющегося ресурса', 'code': 'MODIFY'}]}
            val = ''
            name='fileAction'
            id = 'fileAction'
          />
        </div>

        { action === 'CREATE'
          ? <CreateFileResouce/>
          : null
        }

        { action === 'MODIFY'
          ? <ModifyFileResource/>
          : null
        }

      </fieldset>
      
      { action === 'CREATE' && resourceName && fileVal && fileReason && filePlaceVal && filePeriods && fileResManager && fileManagAccess
        ? <fieldset>
            <legend>Список пользователей</legend>
            <div>
              <label htmlFor="fileResourceManager">Список пользователей</label>
              <FileUserList/>
            </div>

          </fieldset>
        : null  
      }

    </section>    
  )
}

