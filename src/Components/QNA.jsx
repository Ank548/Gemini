import React from 'react'
import { assets } from '../assets/assets'
import { useSelector } from 'react-redux'

function QNA() {
    const { recentPrompt, geminiResponse } = useSelector((state) => state.prompts)
    return (
        <div className="QNA">
            <div className="user">
                <p>{recentPrompt}</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="geminiAi">
                <img src={assets.gemini_icon} alt="" />
                <p>{geminiResponse}</p>
            </div>
        </div>
    )
}

export default QNA
