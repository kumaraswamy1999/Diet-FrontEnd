import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('accessToken');
const initialState ={
    authToken:null,
    isLoggedIn: !!token,
    profile:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action){
            localStorage.setItem('accessToken',action.payload.accessToken);
            localStorage.setItem('profile',JSON.stringify(action.payload.user));
            state.profile = action.payload.user
            state.isLoggedIn = true;
        },
        logout(state){
            localStorage.clear();
            state.isLoggedIn = false;
            state.profile = null;
        }
    }
})

export const {login,logout} = authSlice.actions;
export default authSlice.reducer;