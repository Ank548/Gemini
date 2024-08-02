import { configureStore } from "@reduxjs/toolkit";
import PromptSlice from "./PromptSlice";
import HamburgerSlice from "./HamburgerSlice";

const store = configureStore({
    reducer: {
        prompts: PromptSlice,
        hamburger: HamburgerSlice
    }
})

export default store