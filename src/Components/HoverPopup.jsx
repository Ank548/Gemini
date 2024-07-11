import React from 'react'

function HoverPopup({ text, position }) {

    return (
        <>
            <div className={`absolute z-50 w-max bg-indigo-50 border-2 border-indigo-200 p-1 text-xs hidden group-hover:block ${position}`}>
                <div className='text-indigo-800'>{text}</div>
            </div>
        </>
    )
}

export default HoverPopup
