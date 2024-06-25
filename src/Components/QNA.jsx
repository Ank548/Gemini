import React, { useCallback, useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { useSelector } from 'react-redux'
import MarkdownRenderer from './MarkdownRenderer'
import geminiCall from '../Custom Hooks/GeminiCall'

function QNA() {
    const { recentPrompt, geminiResponse } = useSelector((state) => state.prompts);
    const [speaking, setSpeaking] = useState(false);
    const [response, setResponse] = useState("")
    const GeminiRef = useRef("");
    const imgRef = useRef("");
    const gemini = geminiCall();

    const speak = () => {
        if (window.speechSynthesis) {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                setSpeaking(false)
                return;
            }
            const utterance = new SpeechSynthesisUtterance(geminiResponse);
            window.speechSynthesis.speak(utterance);
            setSpeaking(true);
        } else {
            alert('Your browser does not support text-to-speech.');
        }
    }

    const copy = () => {
        navigator.clipboard.writeText(GeminiRef.current.innerText)
        imgRef.current.src = assets.check_icon
        setTimeout(() => {
            imgRef.current.src = assets.copy_icon
        }, 2000);
    }

    const refresh = () => {
        setResponse("")
        gemini(recentPrompt);
    }

    useEffect(() => {
        setResponse("")
        const responseArr = geminiResponse.split(" ");
        let timeoutIds = [];

        for (let i = 0; i < responseArr.length; i++) {
            const timeoutId = setTimeout(() => {
                setResponse((prev) => prev + responseArr[i] + " ");
            }, i * 100);
            timeoutIds.push(timeoutId);
        }

        return () => {
            timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
        };
    }, [geminiResponse]);

    return (
        <div className="QNA">
            <div className="user">
                <p>{recentPrompt}</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="geminiAi">
                <img src={assets.gemini_icon} alt="" />
                <p ref={GeminiRef}>
                    <MarkdownRenderer text={response} />
                </p>
                <div className='responseFeatures'>
                    <img
                        src={speaking ? assets.stop_icon : assets.speaker_icon}
                        alt=""
                        onClick={speak}
                    />
                    <img
                        src={assets.copy_icon}
                        alt=""
                        onClick={copy}
                        ref={imgRef}
                    />
                    <img
                        src={assets.refresh_icon}
                        alt=""
                        onClick={refresh}
                    />
                </div>
            </div>
        </div>
    )
}

export default QNA
