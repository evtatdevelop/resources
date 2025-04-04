import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFilePlace } from "./fileResourceSliceAPI";

const initialState = {
  loading: false,
  fileAction: null,
  fileResourceName: null,
  fileValue: null,
  fileReasons: null,
  filePlaceList: [],
  filePlace: null,
  filePeriod: null,
  fileResourceManager: null,
  fileManagerAccess: null,
  fileNotes: null,
  fileUsers: [],

}

export const getFilePlaceList = createAsyncThunk( 'fileResource/getFilePlaceList', async () => await getFilePlace({}) );

export const fileResourceSlice = createSlice({
  name: 'fileResource',
  initialState,
  reducers: {

    setFileAction: (state, action) => {
      state.fileAction = action.payload;
    },

    setFileResourceName: (state, action) => {
      state.fileResourceName = action.payload;
    },

    setFileValue: (state, action) => {
      state.fileValue = action.payload;
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
      state.fileUsers = [...state.fileUsers, action.payload];
    },

    delFileUser: (state, action) => {
      state.fileUsers = state.fileUsers.filter(item => item.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFilePlaceList.pending, ( state ) => { state.loading = true })
      .addCase(getFilePlaceList.fulfilled, ( state, action ) => {
        state.loading = false;
        state.filePlaceList = action.payload;
      })

  }
});

export const { setFileAction, setFileResourceName, setFileValue, setFileReasons, setFilePlace, setFilePeriod, 
  setFileResourceManager, setFileManagerAccess, setFileNotes, addFileUser, delFileUser, } = fileResourceSlice.actions;

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

export default fileResourceSlice.reducer;
