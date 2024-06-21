import { configureStore } from "@reduxjs/toolkit";
import PromptSlice from "./PromptSlice";

const store = configureStore({
    reducer: {
        prompts: PromptSlice
    }
})

export default store