// import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './fileUserList.module.scss';
import Select from '../../components/select';
import { addFileUser, fileUsers, } from '../fileResourceSlice';
import { SelectInput } from '../../components/selectInput';

export const FileUserList = () => {
  const dispatch = useDispatch(); 
  const fileUser = useSelector(fileUsers);

  return (
    <section className={styles.fileUserList} >
      <ul>
        { fileUser.length
          ? fileUser.map(item => <li key={item.id}>{item.first_name}</li>)
          : null
        }
        <li>
          <SelectInput
            selectHandler = { val => dispatch(addFileUser(val))}
            placeholder = 'Пользователь'
            val = ''
            name='user'
            mode = 'user'
            id = 'fileUser'
          />

          <Select
            selectHandler = { val => {} }
            selectClear  = { () => {} }
            placeholder = 'Доступ'
            selectList = {[{id: 1, name: 'Только чтение', code: 'READ'}, {id: 2, name: 'Чтение / запись', code: 'WRITE'}, ]}
            val = ''
            name='userAccess'
            id = 'userAccess'
          />

          <button type='button'>Add</button>
        </li>
      </ul>

    </section>    
  )
}

