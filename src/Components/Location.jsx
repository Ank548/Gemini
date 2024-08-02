import React from 'react'
import useLocation from '../Custom Hooks/LocationApi';

function Location() {

    const { location, error } = useLocation();
    return (
        <div className='location'>
            {location && (
                <>
                    <span className='dot'>•</span>
                    <span>{`${location?.address?.county}, ${location?.address?.state}, ${location?.address?.country}`}</span>
                </>
            )}
            {error && <span>{error}</span>}
        </div>
    )
}

export default Location
