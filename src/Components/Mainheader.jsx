import React from 'react'
import { assets } from '../assets/assets'
import { Card } from './'

function Mainheader() {
    return (
        <div>
            <div className='intro'>
                <p>Hello, Dev.</p>
                <p>How can i help you today?</p>
            </div>
            <div className='cards'>
                <Card cardPrompt={`Suggest beautiful places to see on upcoming road trip`} cardIcon={assets.compass_icon} />
                <Card cardPrompt={`Briefly summerize this concept:urban planning`} cardIcon={assets.bulb_icon} />
                <Card cardPrompt={`Brainstorm team bonding activities for our work retreat`} cardIcon={assets.message_icon} />
                <Card cardPrompt={`Improve the readability of following code`} cardIcon={assets.code_icon} />
            </div>
        </div>
    )
}

export default Mainheader
