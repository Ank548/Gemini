import React from 'react'
import { assets } from '../assets/assets'
import { useDispatch, useSelector } from 'react-redux'
import { newPrompt } from '../Store/PromptSlice';
import geminiCall from '../Custom Hooks/GeminiCall';
import styled from 'styled-components';

const Mic = styled.span`
    @media (max-width:460px){
        display:none;
    }`

const MicPhone = styled.span`
    @media (min-width: 460px) {
        display:none;
    }`


function Searchbar() {

    const dispatch = useDispatch()
    const { prompt } = useSelector((state) => state.prompts)
    const gemini = geminiCall();

    const geminiCallOnEnter = (e) => {
        if (e.key === "Enter") {
            gemini(prompt)
        }
    }

    return (
        <div className="searchBar">
            <div>
                <input
                    type="text"
                    placeholder='Enter a prompt here'
                    onChange={(e) => dispatch(newPrompt(e.target.value))}
                    value={prompt}
                    onKeyDown={geminiCallOnEnter}
                />
                <img src={assets.gallery_icon} alt="" />

                <Mic>
                    <img src={assets.mic_icon} alt="" />
                </Mic>

                {prompt ?
                    (<img
                        src={assets.send_icon}
                        alt="Send Button"
                        onClick={() => gemini(prompt)}
                    />)
                    :
                    (<MicPhone>
                        <img src={assets.mic_icon} alt="" />
                    </MicPhone>)
                }
            </div>
        </div>
    )
}

export default Searchbar
