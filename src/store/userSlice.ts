import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  id: string;
  email: string;
  role: "Admin" | "Doctor" | "Patient";
  first_name: string;
  last_name: string;
}

interface UserState {
  user: UserData | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;


