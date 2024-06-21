import React from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets'
import { useSelector } from 'react-redux'
import geminiCall from '../../Custom Hooks/GeminiCall';

function Sidebar() {

    const { prompts } = useSelector((state) => state.prompts);
    const gemini = geminiCall();

    return (
        <div className='sidebar'>
            <div className='SidebarTop'>
                <div className='menuIcon'>
                    <img src={assets.menu_icon} alt="" />
                </div>
                <div className='newChat iconText'>
                    <img src={assets.plus_icon} alt="" />
                    <p>New Chat</p>
                </div>
                <div className='recent'>
                    <div className='recentHeading'>Recent</div>
                    <div>

                        {prompts.map((prompt) => (
                            <div className='iconText' key={prompt} onClick={() => gemini(prompt)}>
                                <img src={assets.message_icon} alt="" />
                                <p>{prompt.slice(0, 15) + "..."}</p>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <div className='SidebarBottom'>
                <div className='iconText'>
                    <img src={assets.question_icon} alt="" />
                    <p>Help</p>
                </div>
                <div className='iconText'>
                    <img src={assets.history_icon} alt="" />
                    <p>Activity</p>
                </div>
                <div className='iconText'>
                    <img src={assets.setting_icon} alt="" />
                    <p>Settings</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
