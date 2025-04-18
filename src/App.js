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
import { clearFileForm, 
  fileAction, fileResourceName, fileValue, fileReasons, filePlace, filePeriod, fileResourceManager, fileManagerAccess,
  fileUsers, fileDate, fileNotes,  fileBoss, fileModResource,
  setFileAction, } from './features/fileResouce/fileResourceSlice';
import { deployDate } from './config';
import { setResourceType } from './appSlice';
import { setServerAction } from './features/serverResouce/serverResourceSlice';
import { serverComment, clearServerForm, serverPlace, serverType, serverGroup, serverOperSystem, serverResourceManager,
  serverResourceName, servCores, servMem, servStorage, sorageComment, serverNets, netsComment, serverPeriod, serverDate, 
  serverReasons, serverModResource,
 } from './features/serverResouce/serverResourceSlice';

function App() {
  const dispatch = useDispatch(); 
  const user = useSelector(remoteUser);
  const remoteLoad = useSelector(remoteLoading);
  const resourceList = useSelector(resourceTypes);
  
  const action = useSelector(fileAction);
  const resourceName = useSelector(fileResourceName);
  const fileVal = useSelector(fileValue);
  const fileReason = useSelector(fileReasons);
  const filePlaceVal = useSelector(filePlace);
  const filePeriods = useSelector(filePeriod);
  const fileResManager = useSelector(fileResourceManager);
  const fileManagAccess = useSelector(fileManagerAccess);
  const fileUserList = useSelector(fileUsers);
  const fileDateData = useSelector(fileDate);
  const fileNote = useSelector(fileNotes);
  const fileBossData = useSelector(fileBoss);
  const fileModRes = useSelector(fileModResource);
  const serverCommentVal = useSelector(serverComment);

  const serverReason = useSelector(serverReasons);
  const serverPlaceVal = useSelector(serverPlace);
  const servType = useSelector(serverType);
  const servGroup = useSelector(serverGroup);
  const servOperSystem = useSelector(serverOperSystem);
  const serverResManager = useSelector(serverResourceManager);
  const serverName = useSelector(serverResourceName);
  const servCoresVal = useSelector(servCores);
  const servMemVal = useSelector(servMem);
  const servStorageVal = useSelector(servStorage);
  const sorageCommentVal = useSelector(sorageComment);
  const serverNetsVal = useSelector(serverNets);
  const netsCommentVal = useSelector(netsComment);
  const serverPeriodVal = useSelector(serverPeriod);
  const serverDateVal = useSelector(serverDate);
  const serverModRes = useSelector(serverModResource);

  const fileSubmit = () => {
    console.log('action', action);
    console.log('resourceName', resourceName);
    console.log('fileVal', fileVal);
    console.log('fileReason', fileReason);
    console.log('filePlace', filePlaceVal);
    console.log('filePeriods', filePeriods);
    console.log('fileDateData', fileDateData);
    console.log('fileResManager', fileResManager);
    console.log('fileManagAccess', fileManagAccess);
    console.log('fileNote', fileNote);
    console.log('fileUserList', fileUserList);
    console.log('fileBossData', fileBossData);
    console.log('fileModRes', fileModRes);
    dispatch(clearFileForm());
    setResource(null);
    dispatch(setResourceType(null));
    document.getElementById('requestType')?.focus();
  }

  const serverSubmit = () => {
    console.log('serverReason ', serverReason);
    console.log('serverPlaceVal ', serverPlaceVal);
    console.log('servType ', servType);
    console.log('servGroup ', servGroup);
    console.log('serverOperSystem ', servOperSystem);
    console.log('serverResManager ', serverResManager);
    console.log('serverName ', serverName);
    console.log('servCoresVal ', servCoresVal);
    console.log('servMemVal ', servMemVal);
    console.log('servStorageVal ', servStorageVal);
    console.log('sorageCommentVal ', sorageCommentVal);
    console.log('serverNetsVal ', serverNetsVal);
    console.log('netsCommentVal ', netsCommentVal);
    console.log('serverPeriodVal ', serverPeriodVal);
    console.log('serverDateVal ', serverDateVal);
    console.log('serverCommentVal ', serverCommentVal);
    console.log('serverModRes ', serverModRes);
    dispatch(clearServerForm());
    setResource(null);
    dispatch(setResourceType(null));
    document.getElementById('requestType')?.focus();
  }

  const [resource, setResource] = useState(null);

  useEffect(() => {
    if ( localStorage.getItem('deploy') !== deployDate ) {
      localStorage.setItem('deploy', deployDate);
      window.location.reload(true);
    }
  }, []);

  useEffect(() => {
    dispatch(getRemote());
    dispatch(getResourceList());
  }, [dispatch]);

  useEffect(() => {
    if ( resourceList.length && user )
      document.getElementById('requestType')?.focus();
  }, [resourceList.length, user]);

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
                      dispatch(setResourceType(val));
                      dispatch(setFileAction(null));
                      dispatch(setServerAction(null));
                    } }
                    selectClear  = { val => {
                      setResource(null);
                      clearFile();
                      dispatch(setResourceType(null));
                      dispatch(setFileAction(null));
                      dispatch(setServerAction(null));
                      document.getElementById('requestType')?.focus();
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
                : resource?.type_code === 'SERVER'
                ? <ServerResouce/>
                : <FileResouce/>
              }  

              { ( resource?.type_code === 'FILE' && fileBossData ) 
                || ( resource?.type_code === 'SERVER' && serverCommentVal)
                ? <button type='button' className={styles.submitBtn}
                    onClick={ () => resource?.type_code === 'FILE' ? fileSubmit() : serverSubmit() }
                  >Отправить запрос на согласование</button>
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
