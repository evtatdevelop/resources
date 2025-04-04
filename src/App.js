import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './App.module.scss';
import { getResourceList, resourceTypes, } from "./appSlice";
import { getRemote, remoteUser, remoteLoading, } from "./features/user/userSlice";
import Input from './features/components/input';
import Select from './features/components/select';
import { TestLoader } from './features/components/loader/testLoader';
import { FileResouce } from './features/fileResouce/fileResouce';
import { ServerResouce } from './features/serverResouce/serverResouce';
import { clearFileForm, } from './features/fileResouce/fileResourceSlice';

function App() {
  const dispatch = useDispatch(); 
  const user = useSelector(remoteUser);
  const remoteLoad = useSelector(remoteLoading);
  const resourceList = useSelector(resourceTypes);

  const [resource, setResource] = useState(null);

  useEffect(() => {
    dispatch(getRemote());
    dispatch(getResourceList());
  }, [dispatch]);

  const clearFile = () => dispatch(clearFileForm());

  return (
    <div className={styles.app}>
      <main>
        <header>
          <nav>
            <a href='https://cfl.digtp.com/pages/viewpage.action?pageId=215865375'>Инструкция</a>
            <a href='https://asuz.digtp.com/mainpage/'>Портал АСУЗ</a>                
          </nav>
          <h1>Автоматизированная система управления заявками (асуз)</h1>
          <h2>Запрос на создание / расширение файловых и серверных ресурсов</h2>
        </header>
        { !remoteLoad
          ? <form>
              <fieldset>
                <legend>Инициатор запроса</legend>
                <div>
                  <label htmlFor="remoteUser">Ф.И.О. инициатора</label>
                  <Input 
                    inputHandler = { val => [] }
                    inputClear = { () => {} }
                    placeholder = 'Ф.И.О. инициатора'
                    val = {`${user.last_name} ${user.first_name} ${user.middle_name}`}
                    readOnly = {true}
                    id = 'remoteUser'
                  />
                </div>
                <p>
                  Инициатор запроса - это сотрудник, от лица которого будет сформирована
                  заявка в Центр поддержки пользователей.
                  Также инициатору будут отправляться уведомления о состоянии запроса,
                  с ним могут связаться при возникновении каких-либо вопросов для уточнения.
                </p>
              </fieldset>

              <fieldset>
                <legend>Тип запроса</legend>
                <div>
                  <label htmlFor="requestType">Тип запроса</label>
                  <Select
                    selectHandler = { val => {
                      setResource(val);
                      clearFile();
                    } }
                    selectClear  = { val => {
                      setResource(null);
                      clearFile();
                    } }
                    placeholder = 'Выбор типа запроса'
                    selectList = {resourceList}
                    val = ''
                    name='requestType'
                    id = 'requestType'
                  />
                </div>
              </fieldset>

              { resource?.type_code === 'FILE'
                ? <FileResouce/>
                : null
              }  

              { resource?.type_code === 'SERVER'
                ? <ServerResouce/>
                : null
              }  

            </form>
          : <TestLoader/>
        }

      </main>
    </div>
  );
}

export default App;
