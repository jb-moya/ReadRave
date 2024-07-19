import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: string;
}

const initialState: ThemeState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      document.documentElement.setAttribute("data-theme", action.payload);
      state.theme = action.payload;
    },
  },
});

export default themeSlice.reducer;

export const { setTheme } = themeSlice.actions;