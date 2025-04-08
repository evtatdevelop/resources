import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './fileResouce.module.scss';
import Select from '../components/select';
import { setFileAction, fileAction, clearFileForm, fileResourceName, fileValue, fileReasons, 
  filePlace, filePeriod, fileResourceManager, fileManagerAccess, fileUsers, addFileUser, delFileUser, setFileBoss
} from './fileResourceSlice';
import { CreateFileResouce } from './CreateFileResouce';
import { FileUserList } from './fileUserList';
import { ModifyFileResource } from './ModifyFileResource';
import { SelectInput } from '../components/selectInput';

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
  const fileUserList = useSelector(fileUsers);

  // console.log('action', action);
  // console.log('fileUserList', fileUserList);
  
  useEffect(() => {
    document.getElementById('fileAction')?.focus();
  }, [])
  
  useEffect(() => {
    if ( !fileUserList.length ) dispatch(setFileBoss(null))
  }, [dispatch, fileUserList.length])

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
              <label htmlFor="fileUser">Список пользователей</label>
              <FileUserList
                userList = {fileUserList}
                selectHandler = { val => dispatch(addFileUser(val)) }
                delHundler = { val => dispatch(delFileUser(val)) }
                selectListParam = {[{'id': 1, 'name': 'Только чтение', 'code': 'READ'}, {'id': 2, 'name': 'Чтение / запись', 'code': 'WRITE'}]}
                name = 'fileUser'
                mode = 'user'
                id = 'fileUser'
              />
            </div>

          </fieldset>
        : null  
      }

      { resourceName && fileVal && fileReason && filePlaceVal && filePeriods && fileResManager && fileManagAccess && fileUserList.length
        ? <fieldset>
            <legend>Руководитель</legend>
            <div>
              <label htmlFor="fileBoss">Ф.И.О. руководителя пользователя</label>
              <SelectInput
                selectHandler = { val => dispatch(setFileBoss(val))}
                placeholder = 'Ф.И.О. руководителя пользователя'
                val = ''
                name='fileBoss'
                mode = 'user'
                id = 'fileBoss'
              />
            </div>
          </fieldset> 
        : null 
      }

    </section>    
  )
}

