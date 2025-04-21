import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFilePlace, getFileResources, fileSubmit, } from "./fileResourceSliceAPI";

const initialState = {
  loading: false,
  fileAction: null,
  fileResourceName: null,
  fileValue: null,
  fileReasons: null,
  filePlaceList: [],
  filePlace: null,
  filePeriod: null,
  fileDate: null,
  fileResourceManager: null,
  fileManagerAccess: null,
  fileNotes: null,
  fileUsers: [],
  fileBoss: null,
  fileResourcesList: [],
  fileModResource: null,
  fileOrder: {},
}

export const getFilePlaceList = createAsyncThunk( 'fileResource/getFilePlaceList', async () => await getFilePlace({}) );
export const getFileResourcesList = createAsyncThunk( 'fileResource/getFileResourcesList', async () => await getFileResources({}) );
export const fileFormSubmit   = createAsyncThunk( 'fileResource/fileFormSubmit', async ( data ) => await fileSubmit(data) );

export const fileResourceSlice = createSlice({
  name: 'fileResource',
  initialState,
  reducers: {

    clearFileForm: (state) => {
      state.loading = false;
      state.fileAction = null;
      state.fileResourceName = null;
      state.fileValue = null;
      state.fileReasons = null;
      state.filePlaceList = [];
      state.filePlace = null;
      state.filePeriod = null;
      state.fileDate = null;
      state.fileResourceManager = null;
      state.fileManagerAccess = null;
      state.fileNotes = null;
      state.fileUsers = [];
      state.fileBoss = null;
      state.fileModResource = null;

    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setFileAction: (state, action) => {
      state.fileAction = action.payload;
    },

    setFileResourceName: (state, action) => {
      if ( action.payload === '' ) state.fileResourceName = null;
      else state.fileResourceName = action.payload;
    },

    setFileValue: (state, action) => {
      // console.log(++action.payload);
      // console.log(Number.isInteger(++action.payload));
      
      if ( Number.isInteger(+action.payload) ) 
        state.fileValue = action.payload;
      else state.fileValue = null;
    },

    setFileReasons: (state, action) => {
      state.fileReasons = action.payload;
    },

    setFilePlace: (state, action) => {
      state.filePlace = action.payload;
    },

    setFilePeriod: (state, action) => {
      state.filePeriod = action.payload;
    },

    setfileDate: (state, action) => {
      state.fileDate = action.payload;
    },

    setFileResourceManager: (state, action) => {
      state.fileResourceManager = action.payload;
    },

    setFileManagerAccess: (state, action) => {
      state.fileManagerAccess = action.payload;
    },

    setFileNotes: (state, action) => {
      state.fileNotes = action.payload;
    },

    addFileUser: (state, action) => {
      if ( !state.fileUsers.length || !state.fileUsers.find(item => item.person.id === action.payload.person.id) )
        state.fileUsers = [...state.fileUsers, action.payload];
    },

    delFileUser: (state, action) => {
      state.fileUsers = state.fileUsers.filter(item => item.person.id !== action.payload);
    },

    cleanFileUserList: (state, action) => {
      state.fileUsers = [];
    },

    setFileBoss: (state, action) => {
      state.fileBoss = action.payload;
    },

    setFileModResource: (state, action) => {
      state.fileModResource = action.payload;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(getFilePlaceList.pending, ( state ) => { state.loading = true })
      .addCase(getFilePlaceList.fulfilled, ( state, action ) => {
        state.loading = false;
        state.filePlaceList = action.payload;
      })

      .addCase(getFileResourcesList.pending, ( state ) => { state.loading = true })
      .addCase(getFileResourcesList.fulfilled, ( state, action ) => {
        state.loading = false;
        state.fileResourcesList = [...action.payload];
      })

      .addCase(fileFormSubmit.pending, ( state ) => { state.loading = true })
      .addCase(fileFormSubmit.fulfilled, ( state, action ) => {
        state.loading = false;
        state.fileOrder = action.payload;
      })

  }
});

export const { setFileAction, setFileResourceName, setFileValue, setFileReasons, setFilePlace, setFilePeriod, 
  setFileResourceManager, setFileManagerAccess, setFileNotes, addFileUser, delFileUser, clearFileForm, 
  cleanFileUserList, setFileBoss, setfileDate, setLoading, setFileModResource, } = fileResourceSlice.actions;

export const loading = ( state ) => state.fileResource.loading;
export const fileAction = ( state ) => state.fileResource.fileAction;
export const fileResourceName = ( state ) => state.fileResource.fileResourceName;
export const fileValue = ( state ) => state.fileResource.fileValue;
export const fileReasons = ( state ) => state.fileResource.fileReasons;
export const filePlaceList = ( state ) => state.fileResource.filePlaceList;
export const filePlace = ( state ) => state.fileResource.filePlace;
export const filePeriod = ( state ) => state.fileResource.filePeriod;
export const fileResourceManager = ( state ) => state.fileResource.fileResourceManager;
export const fileManagerAccess = ( state ) => state.fileResource.fileManagerAccess;
export const fileNotes = ( state ) => state.fileResource.fileNotes;
export const fileUsers = ( state ) => state.fileResource.fileUsers;
export const fileBoss = ( state ) => state.fileResource.fileBoss;
export const fileDate = ( state ) => state.fileResource.fileDate;

export const fileResourcesList = ( state ) => state.fileResource.fileResourcesList;
export const fileModResource = ( state ) => state.fileResource.fileModResource;
export const fileOrder = ( state ) => state.fileResource.fileOrder;

export default fileResourceSlice.reducer;
