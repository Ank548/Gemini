import React, { useState } from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets';
import { useDispatch, useSelector } from 'react-redux';
import geminiCall from '../../Custom Hooks/GeminiCall';
import { setRecentPrompt } from '../../Store/PromptSlice';
import HoverPopup from '../HoverPopup';
import Location from '../Location';

function SideBar() {
    const [hamburger, setHamburger] = useState(false);
    const { prompts } = useSelector((state) => state.prompts);
    const dispatch = useDispatch();
    const gemini = geminiCall();

    return (
        <div className={`sidebar ${!hamburger ? "hamburger" : "hamburgerOpen animate-slide"}`}>
            <div className='SidebarTop'>
                <div
                    className={`menuIcon ${hamburger ? "change" : ""} group relative`}
                    onClick={() => setHamburger((prev) => !prev)}
                >
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                    <HoverPopup text={hamburger ? 'Collapse Menu' : 'Expand Menu'} position={'top-8'} />
                </div>
                <div
                    className='newChat iconText group relative'
                    onClick={() => dispatch(setRecentPrompt(""))}
                >
                    <img src={assets.plus_icon} alt="" />
                    {hamburger && <p>New chat</p>}
                    <HoverPopup text={'New Chat'} position={'top-14 left-5'} />
                </div>
                {hamburger && <div className='recent'>
                    <div className='recentHeading'>Recent</div>
                    <div>

                        {prompts.map((prompt) => (
                            <div className='iconText group relative' key={prompt} onClick={() => gemini(prompt)}>
                                <img src={assets.message_icon} alt="" />
                                <p>{prompt.length > 15 ? prompt.slice(0, 15) + "..." : prompt}</p>
                                <HoverPopup text={prompt} position={'left-44'} />
                            </div>
                        ))}

                    </div>
                </div>}
            </div>
            <div className='SidebarBottom'>
                <div className='iconText group relative'>
                    <img src={assets.question_icon} alt="" />
                    {hamburger && <p>Help</p>}
                    {!hamburger && <HoverPopup text='Help' position={'left-14'} />}
                </div>
                <div className='iconText group relative'>
                    <img src={assets.history_icon} alt="" />
                    {hamburger && <p>Activity</p>}
                    {!hamburger && <HoverPopup text='Activity' position={'left-14'} />}
                </div>
                <div className='iconText group relative'>
                    <img src={assets.setting_icon} alt="" />
                    {hamburger && <p>Settings</p>}
                    {!hamburger && <HoverPopup text='Settings' position={'left-14'} />}
                </div>
                {hamburger && <div><Location /></div>}
            </div>
        </div>
    )
}

export default SideBar
