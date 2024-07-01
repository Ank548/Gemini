import React, { useState } from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets'
import { useDispatch, useSelector } from 'react-redux'
import geminiCall from '../../Custom Hooks/GeminiCall';
import { setRecentPrompt } from '../../Store/PromptSlice';

function Sidebar() {

    const [hamburger, setHamburger] = useState(false);
    const { prompts } = useSelector((state) => state.prompts);
    const dispatch = useDispatch();
    const gemini = geminiCall();

    return (
        <div className={`sidebar ${!hamburger ? "hamburger" : ""}`}>
            <div className='SidebarTop'>
                <div
                    className={`menuIcon ${hamburger ? "change" : ""}`}
                    onClick={() => setHamburger((prev) => !prev)}
                >
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div
                    className='newChat iconText'
                    onClick={() => dispatch(setRecentPrompt(""))}
                >
                    <img src={assets.plus_icon} alt="" />
                    {hamburger && <p>New Chat</p>}
                </div>
                {hamburger && <div className='recent'>
                    <div className='recentHeading'>Recent</div>
                    <div>

                        {prompts.map((prompt) => (
                            <div className='iconText' key={prompt} onClick={() => gemini(prompt)}>
                                <img src={assets.message_icon} alt="" />
                                <p>{prompt.length > 15 ? prompt.slice(0, 15) + "..." : prompt}</p>
                            </div>
                        ))}

                    </div>
                </div>}
            </div>
            <div className='SidebarBottom'>
                <div className='iconText'>
                    <img src={assets.question_icon} alt="" />
                    {hamburger && <p>Help</p>}
                </div>
                <div className='iconText'>
                    <img src={assets.history_icon} alt="" />
                    {hamburger && <p>Activity</p>}
                </div>
                <div className='iconText'>
                    <img src={assets.setting_icon} alt="" />
                    {hamburger && <p>Settings</p>}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
