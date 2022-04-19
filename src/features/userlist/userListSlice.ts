import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiClient from '../../apiClient';

export interface User {
  name: {
    first: string;
  };
  picture: {
    thumbnail: string;
  };
}

export interface UserListState {
  users: User[];
  loading: boolean;
  error: boolean;
  nextPage: number;
}

const initialState: UserListState = {
  users: [],
  loading: false,
  error: false,
  nextPage: 1,
};

export const fetchUsers = createAsyncThunk<{users: User[]}, {page: Number}>(
  'fetchUsers',
  async ({page}) => {
    const response = await apiClient.fetchUsers(page, 25);
    if (response.kind === 'success' && response.body) {
      return {users: response.body};
    }
    throw 'Error fetching users';
  },
);

const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = [...state.users, ...action.payload.users];
        state.loading = false;
        state.nextPage += 1;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default userListSlice.reducer;
