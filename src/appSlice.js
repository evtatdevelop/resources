import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getResourceTypes, submit } from "./appSliceAPI";

const initialState = {
  loading: false,
  darkTheme: false,
  langMode: null,
  resourceTypes: [],
  resourceType: null,
  order: {},
}

export const getResourceList = createAsyncThunk( 'app/getResourceList', async () => await getResourceTypes({}) );
export const formSubmit   = createAsyncThunk( 'app/formSubmit', async ( data ) => await submit(data) );

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {

    setTheme: (state, action) => {
      state.darkTheme = action.payload;
      localStorage.setItem(`darkTheme`, JSON.stringify(action.payload));
    },

    setLangMode: (state, action) => {
      state.langMode = action.payload;
    },

    setResourceType: (state, action) => {
      state.resourceType = action.payload;
      state.order = {};
    },

    clearOrder: (state, action) => {
      state.order = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getResourceList.pending, ( state ) => { state.loading = true })
      .addCase(getResourceList.fulfilled, ( state, action ) => {
        state.loading = false;
        state.resourceTypes = action.payload;
      })

      .addCase(formSubmit.pending, ( state ) => { state.loading = true })
      .addCase(formSubmit.fulfilled, ( state, action ) => {
        state.loading = false;
        state.order = action.payload;
      })
  }
});

export const { setTheme, setLangMode, setResourceType, clearOrder } = appSlice.actions;

export const darkTheme = ( state ) => state.app.darkTheme;
export const langMode = ( state ) => state.app.langMode;
export const loading = ( state ) => state.app.loading;
export const resourceTypes = ( state ) => state.app.resourceTypes;
export const resourceType = ( state ) => state.app.resourceType;
export const order = ( state ) => state.app.order;

export default appSlice.reducer;
