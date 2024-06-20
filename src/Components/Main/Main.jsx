import { useState } from 'react'
import React from 'react';
import "./Main.css"
import { assets } from '../../assets/assets'
import run from '../../Gemini/Gemini';

function Main() {
    const [prompt, setPrompt] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("")
    const [geminiResponse, setGeminiResponse] = useState("")

    const geminiCall = async () => {
        const response = await run(prompt);
        console.log(response)
        setRecentPrompt(prompt)
        setGeminiResponse(response)
    }


    return (
        <div className='main'>
            <div className='gemini'>
                <div>Gemini</div>
                <div>
                    <img src={assets.user_icon} alt="" />
                </div>
            </div>
            <div className='mainHeader'>
                {recentPrompt === "" ? (
                    <div>
                        <div className='intro'>
                            <p>Hello, Dev.</p>
                            <p>How can i help you today?</p>
                        </div>
                        <div className='cards'>
                            <div>
                                <div className='cardPrompt'>
                                    <p>Suggest beautiful places to see on upcoming road trip</p>
                                </div>
                                <div className='icon'>
                                    <img src={assets.compass_icon} alt="" />
                                </div>
                            </div>
                            <div>
                                <div className='cardPrompt'>
                                    <p>Briefly summerize this concept:urban planning</p>
                                </div>
                                <div className='icon'>
                                    <img src={assets.bulb_icon} alt="" />
                                </div>
                            </div>
                            <div>
                                <div className='cardPrompt'>
                                    <p>Brainstorm team bonding activities for our work retreat</p>
                                </div>
                                <div className='icon'>
                                    <img src={assets.message_icon} alt="" />
                                </div>
                            </div>
                            <div>
                                <div className='cardPrompt'>
                                    <p>Improve the readability of following code</p>
                                </div>
                                <div className='icon'>
                                    <img src={assets.code_icon} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
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
                )}

            </div>
            <div className="searchBar">
                <div>
                    <input
                        type="text"
                        placeholder='Enter a prompt here'
                        onChange={(e) => setPrompt(e.target.value)}
                        value={prompt}
                    />
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    <img
                        src={assets.send_icon}
                        alt="Send Button"
                        onClick={geminiCall}
                    />
                </div>
            </div>
            <div className='footer'>Gemini may display inaccurate info,including about people,so double-check its responses. Your privacy and Gemini Apps</div>
        </div>
    )
}

export default Main

