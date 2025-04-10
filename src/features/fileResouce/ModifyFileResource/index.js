import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getFileResourcesList, fileResourcesList, loading, } from '../fileResourceSlice';
import { TestLoader } from '../../components/loader/testLoader';
import { FileResourceList } from './fileResourceList';

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
        ? <FileResourceList/>
        : null
      }
    </>    
  )
}
