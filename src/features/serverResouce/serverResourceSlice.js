import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getServerPlace } from "./serverResourceSliceAPI";

const initialState = {
  loading: false,
  serverAction: null,
  serverReasons: null,
  serverPlace: null,
  serverPlacesList: [],
  serverType: null,

}

export const getServerPlaceList = createAsyncThunk( 'serverResource/getServerPlaceList', async () => await getServerPlace({}) );

export const serverResourceSlice = createSlice({
  name: 'serverResource',
  initialState,
  reducers: {

    clearServerForm: (state) => {
      state.loading = false;
      state.serverAction = null;
      state.serverReasons = null;
      state.serverPlace = null;
      state.serverType = null;
      
    },

    setServerAction: (state, action) => {
      state.serverAction = action.payload;
    },

    setServerReasons: (state, action) => {
      state.serverReasons = action.payload;
    },

    setServerPlace: (state, action) => {
      state.serverPlace = action.payload;
    },

    setServerType: (state, action) => {
      state.serverType = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getServerPlaceList.pending, ( state ) => { state.loading = true })
      .addCase(getServerPlaceList.fulfilled, ( state, action ) => {
        state.loading = false;
        state.serverPlacesList = action.payload;
      })

  }
});

export const { clearServerForm, setServerAction, setServerReasons, setServerPlace, setServerType } = serverResourceSlice.actions;

export const loading = ( state ) => state.serverResource.loading;
export const serverAction = ( state ) => state.serverResource.serverAction;
export const serverReasons = ( state ) => state.serverResource.serverReasons;
export const serverPlace = ( state ) => state.serverResource.serverPlace;
export const serverPlacesList = ( state ) => state.serverResource.serverPlacesList;
export const serverType = ( state ) => state.serverResource.serverType;

export default serverResourceSlice.reducer;
