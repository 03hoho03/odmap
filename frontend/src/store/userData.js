import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './thunkFunction';

const initialState = {
  userData: {
    id: '',
    email: '',
    name: '',
    role: 0,
    image: ''
  },
  isAuth: false,
  isLoading: false,
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
        localStorage.setItem('accessToken', action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.error = action.payload;
      });
  }
});

export default userSlice.reducer;
