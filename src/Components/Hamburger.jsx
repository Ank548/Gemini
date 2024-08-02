import React from 'react'
import HoverPopup from './HoverPopup'
import { useDispatch, useSelector } from 'react-redux'
import { setHamburger } from '../Store/HamburgerSlice';
import styled from 'styled-components';

const PopUp = styled.div`
    @media (max-width:460px){
        display:none;
    }`

function Hamburger() {
    const { hamburger } = useSelector(state => state.hamburger)
    const dispatch = useDispatch();
    return (
        <div
            className={`menuIcon ${hamburger ? "change" : ""} group relative`}
            onClick={() => dispatch(setHamburger())}
        >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <PopUp>
                <HoverPopup text={hamburger ? 'Collapse Menu' : 'Expand Menu'} position={'top-8'} />
            </PopUp>
        </div>
    )
}

export default Hamburger
