import React from 'react'
import "./Profile.css"
import { assets } from '../../assets/assets'

function Profile() {
    return (
        <div className='profile'>
            <div className='closeProfile change'>
                <div className='bar1'></div>
                <div className='bar2'></div>
                <div className='bar3'></div>
            </div>
            <div className='userEmail'>
                <p>jainank548@gmail.com</p>
            </div>
            <div className='profileContainer'>
                <div className='profileImg'>
                    <img src={assets.user_icon} alt="" />
                    <div className='profileImgEdit'>
                        <img src={assets.pencil_icon} alt="" />
                    </div>
                </div>
                <div className='greetUser'>
                    <h2>Hi, Ankit!</h2>
                </div>
                <div className='ManageAccount'>
                    <span>Manage Your Gemini Account</span>
                </div>
            </div>
            <div className='userMenuContainer'>
                <div className='userAccount'>
                    <div>
                        <img src={assets.user_icon} alt="" />
                    </div>
                    <div>
                        <h2>Ankit Jain</h2>
                        <p>jainank548@gmail.com</p>
                    </div>
                </div>
                <div className='signUp'>
                    <div>
                        <img src={assets.signup_icon} alt="" />
                    </div>
                    <div>
                        <h2>Sign Up</h2>
                    </div>
                </div>
                <div className='signIn'>
                    <div>
                        <img src={assets.login_icon} alt="" />
                    </div>
                    <div>
                        <h2>Sign In</h2>
                    </div>
                </div>
            </div>
            <div className='profileFooter'>
                <span>Privacy Policy</span>
                <span>•</span>
                <span>Terms of Service</span>
            </div>
        </div>
    )
}

export default Profile
