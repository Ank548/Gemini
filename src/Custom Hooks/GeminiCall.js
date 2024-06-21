import { useDispatch, useSelector } from "react-redux"
import run from '../Gemini/Gemini';
import { addPrompts, setGeminiResponse, setRecentPrompt } from '../Store/PromptSlice';
import { useCallback } from "react";


const geminiCall = () => {

    const dispatch = useDispatch();
    const { prompts } = useSelector((state) => state.prompts)

    const gemini = useCallback(async (prompt) => {
        dispatch(setGeminiResponse(""))
        dispatch(setRecentPrompt(prompt))
        console.log(prompts)
        // if (prompts.includes(prompt)) {
        dispatch(addPrompts(prompt))
        // }
        const response = await run(prompt);
        dispatch(setGeminiResponse(response))
    }, [prompts])

    return gemini
}


export default geminiCall;