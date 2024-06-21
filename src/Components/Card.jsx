import React from 'react'
import geminiCall from '../Custom Hooks/GeminiCall'

function Card({ cardPrompt, cardIcon }) {

    const gemini = geminiCall();

    const clickGemini = () => {
        gemini(cardPrompt);
    }
    return (
        <div onClick={clickGemini}>
            <div className='cardPrompt'>
                <p>{cardPrompt}</p>
            </div>
            <div className='icon'>
                <img src={cardIcon} alt="" />
            </div>
        </div>
    )
}

export default Card
