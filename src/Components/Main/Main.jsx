import React from 'react';
import "./Main.css";
import { useSelector } from 'react-redux';
import { Navbar, Mainheader, QNA, Searchbar, Footer } from '../'

function Main() {
    const { recentPrompt } = useSelector((state) => state.prompts)

    return (
        <div className='main'>
            <Navbar />
            <div className='mainHeader'>
                {recentPrompt === "" ? (<Mainheader />) : (<QNA />)}
            </div>
            <Searchbar />
            <Footer />
        </div>
    )
}

export default Main



