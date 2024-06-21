import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prompts: []
};

const promptSlice = createSlice({
    name: "prompts",
    initialState,
    reducers: {
        addPrompts(state, action) {
            state.prompts.push(action.payload)
        }
    }
})

export const { addPrompts } = promptSlice.actions;

export default promptSlice.reducer