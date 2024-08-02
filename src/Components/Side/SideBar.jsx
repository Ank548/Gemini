import React from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets';
import { useDispatch, useSelector } from 'react-redux';
import geminiCall from '../../Custom Hooks/GeminiCall';
import { setRecentPrompt } from '../../Store/PromptSlice';
import { Location, HoverPopup, Hamburger } from '../index';
import styled from 'styled-components';

const PopUp = styled.div`
    @media (max-width:460px){
        display:none;
    }`

function SideBar() {
    const { hamburger } = useSelector(state => state.hamburger)
    const { prompts, recentPrompt } = useSelector((state) => state.prompts);
    const dispatch = useDispatch();
    const gemini = geminiCall();

    return (
        <div className={`sidebar ${!hamburger ? "hamburger" : "hamburgerOpen animate-slide"}`}>
            <div className='sidebarTop'>
                <Hamburger />
                <div
                    className={`newChat iconText group relative ${recentPrompt && "newChatBlur"}`}
                    onClick={() => dispatch(setRecentPrompt(""))}
                >
                    <img src={assets.plus_icon} alt="" />
                    {hamburger && <p>New chat</p>}
                    <PopUp>
                        <HoverPopup text={'New Chat'} position={'top-14 left-5'} />
                    </PopUp>
                </div>
                {hamburger && <div className='recent'>
                    <div className='recentHeading'>Recent</div>
                    <div>

                        {prompts.map((prompt) => (
                            <div className='iconText group relative' key={prompt} onClick={() => gemini(prompt)}>
                                <img src={assets.message_icon} alt="" />
                                <p>{prompt.length > 15 ? prompt.slice(0, 15) + "..." : prompt}</p>
                                <PopUp>
                                    <HoverPopup text={prompt} position={'left-44'} />
                                </PopUp>
                            </div>
                        ))}

                    </div>
                </div>}
            </div>
            <div className='sidebarBottom'>
                <div className='iconText group relative'>
                    <img src={assets.question_icon} alt="" />
                    {hamburger && <p>Help</p>}
                    {!hamburger && (
                        <PopUp>
                            <HoverPopup text='Help' position={'left-14'} />
                        </PopUp>
                    )}
                </div>
                <div className='iconText group relative'>
                    <img src={assets.history_icon} alt="" />
                    {hamburger && <p>Activity</p>}
                    {!hamburger && (
                        <PopUp>
                            <HoverPopup text='Activity' position={'left-14'} />
                        </PopUp>
                    )}
                </div>
                <div className='iconText group relative'>
                    <img src={assets.setting_icon} alt="" />
                    {hamburger && <p>Settings</p>}
                    {!hamburger && (
                        <PopUp>
                            <HoverPopup text='Settings' position={'left-14'} />
                        </PopUp>
                    )}
                </div>
                <div className={`sidebarLocation ${hamburger ? "block" : "hidden"}`}><Location /></div>
            </div>
        </div>
    )
}

export default SideBar
