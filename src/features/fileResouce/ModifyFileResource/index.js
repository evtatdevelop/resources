import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
// import Select from '../../components/select';
// import { SelectInput } from '../../components/selectInput';
import { getFileResourcesList, fileResourcesList, loading, } from '../fileResourceSlice';
import { TestLoader } from '../../components/loader/testLoader';

export const ModifyFileResource = () => {
  const dispatch = useDispatch(); 
  const fileResources = useSelector(fileResourcesList);
  const load = useSelector(loading);

  useEffect(() => {
    // document.getElementById('fileAction')?.focus();
    if ( !fileResources.length )
      dispatch(getFileResourcesList());
  }, [dispatch, fileResources.length])
  
  console.log('fileResources', fileResources);
  

  return (
    <>
      { true
        ? <>
            <h3>Доступные ресурсы</h3>
            { load
              ? <TestLoader/>
              : <ul>
                  { fileResources.map(item => <li key={item.id}>{item.dfs_path}</li>)
                    
                  }
                </ul>

            }
            
          </>
        : null
      }
    </>    
  )
}
