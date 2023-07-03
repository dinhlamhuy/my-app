import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Loginservice } from 'services/AuthServices';
import { RootState } from 'store';
interface UserInfo {
    User_ID: string;
    User_Password: string;
    User_Serial_Key: string;
    User_Name: string;
    Group_Serial_Key: string;
    Start_Date: string;
    Leave_Date: string;
    Login_Date: string;
    UUser_Serial_Key: string;
    TLLanguage: string;
}

interface LoginState {
    loading: boolean;
    error: string | null;
    isLoggedIn: boolean;
    user: UserInfo | null;
}

const initialState: LoginState = {
    loading: false,
    error: null,
    isLoggedIn: false,
    user: null,
};


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<UserInfo>) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});


export const login = createAsyncThunk(
    'login/login',
    async (credentials: { User_ID: string; Password: string }, { rejectWithValue }) => {
        try {
            const response = await Loginservice(credentials.User_ID, credentials.Password);
            console.log(response)
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);



export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
