import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getServerPlace, getServerGroup, getOperSystems, getServerResouces, serverSubmit } from "./serverResourceSliceAPI";

const initialState = {
  loading: false,
  serverAction: null,
  serverReasons: null,
  serverPlace: null,
  serverPlacesList: [],
  serverType: null,
  serverGroupList: [],
  serverGroup: null,
  serverOperSystemList: [],
  serverOperSystem: null,
  serverResourceManager: null,
  serverResourceName: null,
  servCores: null,
  servMem: null,
  servStorage: null,
  sorageComment: null,
  serverNets: null,
  netsComment: null,
  serverPeriod: null,
  serverDate: null,
  serverComment: null,
  serverResouceList: [],
  serverModResource: null,
  serverOrder: {},
}

export const getServerPlaceList = createAsyncThunk( 'serverResource/getServerPlaceList', async () => await getServerPlace({}) );
export const getServerGroupList = createAsyncThunk( 'serverResource/getServerGroupList', async () => await getServerGroup({}) );
export const getOperSystemsList = createAsyncThunk( 'serverResource/getOperSystemsList', async () => await getOperSystems({}) );
export const getServerResouceList = createAsyncThunk( 'serverResource/getServerResouceList', async () => await getServerResouces({}) );
export const serverFormSubmit   = createAsyncThunk( 'serverResource/serverFormSubmit', async ( data ) => await serverSubmit(data) );

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
      state.serverGroup = null;
      state.serverOperSystem = null;
      state.serverResourceManager = null;
      state.serverResourceName = null;
      state.servCores = null;
      state.servMem = null;
      state.servStorage = null;
      state.sorageComment = null;
      state.serverNets = null;
      state.netsComment = null;
      state.serverPeriod = null;
      state.serverDate = null;
      state.serverComment = null;
      state.serverModResource = null;
      
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

    setServerGroup: (state, action) => {
      state.serverGroup = action.payload;
    },

    setServerOperSystem: (state, action) => {
      state.serverOperSystem = action.payload;
    },

    setServerResourceManager: (state, action) => {
      state.serverResourceManager = action.payload;
    },

    setServerResourceName: (state, action) => {
      state.serverResourceName = action.payload;
    },

    setServCores: (state, action) => {
      // state.servCores = action.payload;
      if ( Number.isInteger(+action.payload) ) 
        state.servCores = action.payload;
      else state.servCores = null;
    },

    setServMem: (state, action) => {
      // state.servMem = action.payload;
      if ( Number.isInteger(+action.payload) ) 
        state.servMem = action.payload;
      else state.servMem = null;
    },

    setServStorage: (state, action) => {
      // state.servStorage = action.payload;
      if ( Number.isInteger(+action.payload) ) 
        state.servStorage = action.payload;
      else state.servStorage = null;
    },

    setSorageComment: (state, action) => {
      state.sorageComment = action.payload;
    },

    setServerNets: (state, action) => {
      // state.serverNets = action.payload;
      if ( Number.isInteger(+action.payload) ) 
        state.serverNets = action.payload;
      else state.serverNets = null;
    },

    setNetsComment: (state, action) => {
      state.netsComment = action.payload;
    },

    setServerPeriod: (state, action) => {
      state.serverPeriod = action.payload;
    },

    setServerDate: (state, action) => {
      state.serverDate = action.payload;
    },

    setServerComment: (state, action) => {
      state.serverComment = action.payload;
    },

    setServerModResource: (state, action) => {
      state.serverModResource = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getServerPlaceList.pending, ( state ) => { state.loading = true })
      .addCase(getServerPlaceList.fulfilled, ( state, action ) => {
        state.loading = false;
        state.serverPlacesList = action.payload;
      })

      .addCase(getServerGroupList.pending, ( state ) => { state.loading = true })
      .addCase(getServerGroupList.fulfilled, ( state, action ) => {
        state.loading = false;
        state.serverGroupList = action.payload;
      })

      .addCase(getOperSystemsList.pending, ( state ) => { state.loading = true })
      .addCase(getOperSystemsList.fulfilled, ( state, action ) => {
        state.loading = false;
        state.serverOperSystemList = action.payload;
      })

      .addCase(getServerResouceList.pending, ( state ) => { state.loading = true })
      .addCase(getServerResouceList.fulfilled, ( state, action ) => {
        state.loading = false;
        state.serverResouceList = action.payload;
      })

      .addCase(serverFormSubmit.pending, ( state ) => { state.loading = true })
      .addCase(serverFormSubmit.fulfilled, ( state, action ) => {
        state.loading = false;
        state.serverOrder = action.payload;
      })
  }
});

export const { clearServerForm, setServerAction, setServerReasons, setServerPlace, setServerType,
  setServerGroup, setServerOperSystem, setServerResourceManager, setServerResourceName, setServCores,
  setServMem, setServStorage, setSorageComment, setServerNets, setNetsComment, setServerPeriod,
  setServerDate, setServerComment, setServerModResource, 
 } = serverResourceSlice.actions;

export const loading = ( state ) => state.serverResource.loading;
export const serverAction = ( state ) => state.serverResource.serverAction;
export const serverReasons = ( state ) => state.serverResource.serverReasons;
export const serverPlace = ( state ) => state.serverResource.serverPlace;
export const serverPlacesList = ( state ) => state.serverResource.serverPlacesList;
export const serverType = ( state ) => state.serverResource.serverType;
export const serverGroupList = ( state ) => state.serverResource.serverGroupList;
export const serverGroup = ( state ) => state.serverResource.serverGroup;
export const serverOperSystemList = ( state ) => state.serverResource.serverOperSystemList;
export const serverOperSystem = ( state ) => state.serverResource.serverOperSystem;
export const serverResourceManager = ( state ) => state.serverResource.serverResourceManager;
export const serverResourceName = ( state ) => state.serverResource.serverResourceName;
export const servCores = ( state ) => state.serverResource.servCores;
export const servMem = ( state ) => state.serverResource.servMem;
export const servStorage = ( state ) => state.serverResource.servStorage;
export const sorageComment = ( state ) => state.serverResource.sorageComment;
export const serverNets = ( state ) => state.serverResource.serverNets;
export const netsComment = ( state ) => state.serverResource.netsComment;
export const serverPeriod = ( state ) => state.serverResource.serverPeriod;
export const serverDate = ( state ) => state.serverResource.serverDate;
export const serverComment = ( state ) => state.serverResource.serverComment;
export const serverResouceList = ( state ) => state.serverResource.serverResouceList;
export const serverModResource = ( state ) => state.serverResource.serverModResource;
export const serverOrder = ( state ) => state.serverResource.serverOrder;

export default serverResourceSlice.reducer;
