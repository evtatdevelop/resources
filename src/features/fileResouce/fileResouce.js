import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './fileResouce.module.scss';
import Select from '../components/select';
import { setFileAction, fileAction, clearFileForm, fileManagerAccess, fileUsers, addFileUser, delFileUser, setFileBoss, fileReasons, } from './fileResourceSlice';
import { CreateFileResouce } from './CreateFileResouce';
import { FileUserList } from './fileUserList';
import { ModifyFileResource } from './ModifyFileResource';
import { SelectInput } from '../components/selectInput';
import { Plug } from '../components/plug';
import { resourceType } from '../../appSlice';

export const FileResouce = () => {
  const dispatch = useDispatch(); 
  const action = useSelector(fileAction);
  const fileManagAccess = useSelector(fileManagerAccess);
  const fileUserList = useSelector(fileUsers);
  const fileReason = useSelector(fileReasons);
  const resType = useSelector(resourceType);
  
  useEffect(() => {
    if ( resType )
    document.getElementById('fileAction')?.focus();
  }, [resType])
  
  useEffect(() => {
    if ( !fileUserList.length ) dispatch(setFileBoss(null))
  }, [dispatch, fileUserList.length])

  return (
    <section className={styles.fileResouce} >
      <fieldset>
        <legend>Требования к файловому ресурсу</legend>
        <div>
          <label htmlFor="fileAction">Действие</label>
          { resType
            ? <Select
                selectHandler = { val =>{
                  dispatch(clearFileForm());
                  dispatch(setFileAction(val.code));
                } }
                selectClear  = { () => {
                  dispatch(clearFileForm());
                  document.getElementById('fileAction')?.focus();
                }  }
                placeholder = 'Выбор действия с файловым ресурсом'
                selectList = {[{'id': 1, 'name': 'Создание / регистрация ресурса', 'code': 'CREATE'}, {'id': 2, 'name': 'Расширение имеющегося ресурса', 'code': 'MODIFY'}]}
                val = ''
                name='fileAction'
                id = 'fileAction'
              />
            : <Plug/>
          }         
        </div>

        { action === 'CREATE'
          ? <CreateFileResouce/>
          : action === 'MODIFY'
            ? <ModifyFileResource/>
            : <CreateFileResouce/>
        }
      </fieldset>

      { action === 'CREATE'
        ? <fieldset>
            <legend>Список пользователей</legend>
            <div>
              <label htmlFor="fileUser">Список пользователей</label>
              { action === 'CREATE' && fileManagAccess
                ? <FileUserList
                    userList = {fileUserList}
                    selectHandler = { val => dispatch(addFileUser(val)) }
                    delHundler = { val => dispatch(delFileUser(val)) }
                    selectListParam = {[{'id': 1, 'name': 'Только чтение', 'code': 'READ'}, {'id': 2, 'name': 'Чтение / запись', 'code': 'WRITE'}]}
                    name = 'fileUser'
                    mode = 'user'
                    id = 'fileUser'
                  /> 
                : <Plug/>
              }
            </div>
          </fieldset>
        : null
      }

      <fieldset>
        <legend>Руководитель</legend>
        <div>
          <label htmlFor="fileBoss">Ф.И.О. руководителя пользователя</label>
          { ( action === 'CREATE' && fileUserList.length ) || ( action === 'MODIFY' && fileReason )
            ? <SelectInput
                selectHandler = { val => dispatch(setFileBoss(val))}
                placeholder = 'Ф.И.О. руководителя пользователя'
                val = ''
                name='fileBoss'
                mode = 'user'
                id = 'fileBoss'
              />
            : <Plug/>
          }
        </div>
      </fieldset> 

    </section>    
  )
}

