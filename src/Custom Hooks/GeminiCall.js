import { useDispatch, useSelector } from "react-redux"
import run from '../Gemini/Gemini';
import { addPrompts, newPrompt, setGeminiResponse, setRecentPrompt } from '../Store/PromptSlice';
import { useCallback } from "react";


const geminiCall = () => {

    const { prompt, prompts } = useSelector((state) => state.prompts)
    const dispatch = useDispatch();

    const gemini = useCallback(async (prompt) => {
        dispatch(setGeminiResponse(""))
        dispatch(setRecentPrompt(prompt))
        dispatch(addPrompts(prompt))
        dispatch(newPrompt(""))
        const response = await run(prompt);
        dispatch(setGeminiResponse(response));
    }, [prompt, prompts])

    return gemini;
}


export default geminiCall;