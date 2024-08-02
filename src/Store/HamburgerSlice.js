import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hamburger: false
}

const HamburgerSlice = createSlice({
    name: "hamburger",
    initialState,
    reducers: {
        setHamburger(state, action) {
            state.hamburger = !state.hamburger
        }
    }
})

export const { setHamburger } = HamburgerSlice.actions;

export default HamburgerSlice.reducer;

