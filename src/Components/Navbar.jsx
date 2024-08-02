import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { Hamburger, Profile } from './index'
import styled from 'styled-components';

const Showhamburger = styled.div`
    @media (min-width:960px){
        display:none;
    }`

function Navbar() {
    const [showProfile, setShowProfile] = useState(false)

    const handleClick = (event) => {
        const isProfileClick = event.target.closest('.profile');
        if (!isProfileClick) {
            setShowProfile((prev) => !prev)
        }

        if (event.target.closest('.closeProfile')) {
            setShowProfile(false)
        }
    }

    return (
        <div className='gemini'>
            <div className='geminiHeader'>
                <Showhamburger>
                    <Hamburger />
                </Showhamburger>
                <div className='geminiTitle'>Gemini</div>
            </div>
            <div
                className='showProfile'
                tabIndex={0}
                onClick={handleClick}
                onBlur={() => setShowProfile(false)}
            >
                <img src={assets.user_icon} alt="" />
                {showProfile && <Profile />}
            </div>
        </div>
    )
}

export default Navbar
