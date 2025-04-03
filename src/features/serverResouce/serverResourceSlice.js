import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getResourceTypes } from "./serverResourceSliceAPI";

const initialState = {
  loading: false,
}

export const getResourceList = createAsyncThunk( 'serverResource/getResourceList', async () => await getResourceTypes({}) );

export const serverResourceSlice = createSlice({
  name: 'serverResource',
  initialState,
  reducers: {

    setTheme: (state, action) => {
      state.darkTheme = action.payload;
      localStorage.setItem(`darkTheme`, JSON.stringify(action.payload));
    },

    setLangMode: (state, action) => {
      state.langMode = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getResourceList.pending, ( state ) => { state.loading = true })
      .addCase(getResourceList.fulfilled, ( state, action ) => {
        state.loading = false;
        state.resourceTypes = action.payload;
      })

  }
});

export const { setTheme, setLangMode } = serverResourceSlice.actions;

export const loading = ( state ) => state.serverResource.loading;

export default serverResourceSlice.reducer;
