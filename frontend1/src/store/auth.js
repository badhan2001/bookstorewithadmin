import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,        // user info (e.g., name, email)
//   token: null,       // JWT token or session token
//   isAuthenticated: false,
// };

const authSlice = createSlice({
  name: 'auth',
  initialState:{ isLoggedIn:false,role:"user"},
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    changeRole(state, action){
        const role = action.payload;
        state.role=role;
    }
  },
});

export const authAction= authSlice.actions;

export default authSlice.reducer;
