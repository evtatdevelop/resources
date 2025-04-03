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

export const { setFileAction, setFileResourceName, setFileValue, setFileReasons, setFilePlace, } = fileResourceSlice.actions;

export const loading = ( state ) => state.fileResource.loading;
export const fileAction = ( state ) => state.fileResource.fileAction;
export const fileResourceName = ( state ) => state.fileResource.fileResourceName;
export const fileValue = ( state ) => state.fileResource.fileValue;
export const fileReasons = ( state ) => state.fileResource.fileReasons;
export const filePlaceList = ( state ) => state.fileResource.filePlaceList;
export const filePlace = ( state ) => state.fileResource.filePlace;

export default fileResourceSlice.reducer;
