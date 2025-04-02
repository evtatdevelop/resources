import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setUserLang, getRemoteUser } from './userSliceAPI';

const initialState = {
  remoteLoading: false,
  langLoading: false,
  data: [],
}

export const getRemote = createAsyncThunk( 'user/getRemote', async () => await getRemoteUser({}) )
export const setLang   = createAsyncThunk( 'user/setLang', async ( data ) => await setUserLang(data) )

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getRemote.pending, ( state ) => { state.remoteLoading = true })
      .addCase(getRemote.fulfilled, ( state, action ) => {
        state.remoteLoading = false;
        state.data = action.payload;
      })

      .addCase(setLang.pending, ( state ) => { 
        state.data.lang = null;
        state.langLoading = true 
      })
      .addCase(setLang.fulfilled, ( state, action ) => {
        state.data.lang = action.payload;
        state.langLoading = false;
      })
  }
});

export const remoteLoading      = ( state ) => state.user.remoteLoading;
export const langLoading  = ( state ) => state.user.langLoading;
export const remoteUser   = ( state ) => state.user.data;

export default userSlice.reducer;
