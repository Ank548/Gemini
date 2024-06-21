import React from 'react'
import { assets } from '../assets/assets'

function Navbar() {
    return (
        <div className='gemini'>
            <div>Gemini</div>
            <div>
                <img src={assets.user_icon} alt="" />
            </div>
        </div>
    )
}

export default Navbar
