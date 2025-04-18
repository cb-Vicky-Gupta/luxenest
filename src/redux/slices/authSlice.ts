import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

interface AuthState {
    user : {
        id : number;
        name : string;
        email : string;
        image : string;
        role : {
            id : number;
            name : string;
        };
    } | null;
    token: string | null;
    isAuthenticated : Boolean;
}

const initialState :AuthState = {
    user : null,
    token : null,
    isAuthenticated : false
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : ( state,
            action: PayloadAction<{ user: AuthState['user']; token: string }> )=>{
                state.user = action.payload.user,
                state.token= action.payload.token,
                state.isAuthenticated = true
            },
        logout : (state)=>{
            state.user = null;
            state.token= null;
            state.isAuthenticated = false;
        }

    }
})

export const {login , logout} = authSlice.actions;
export default authSlice.reducer;