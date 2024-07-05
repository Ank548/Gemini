import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { useSelector } from 'react-redux'
import geminiCall from '../Custom Hooks/GeminiCall'
import Copy from '../Custom Hooks/copy'
import MarkdownRenderer from './MarkdownRenderer'

function QNA() {
    const { recentPrompt, geminiResponse } = useSelector((state) => state.prompts);
    const [speaking, setSpeaking] = useState(false);
    const [completedResponse, setCompletedResponse] = useState(false);
    const [response, setResponse] = useState("")
    const GeminiRef = useRef(null);
    const QNARef = useRef(null)
    const gemini = geminiCall();

    const speak = () => {
        if (window.speechSynthesis) {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                setSpeaking(false)
                return;
            }
            const utterance = new SpeechSynthesisUtterance(GeminiRef.current.innerText);
            window.speechSynthesis.speak(utterance);
            setSpeaking(true);
        } else {
            alert('Your browser does not support text-to-speech.');
        }
    }

    const refresh = () => {
        setResponse("")
        gemini(recentPrompt);
    }

    useEffect(() => {
        setResponse("")
        setCompletedResponse(false)

        const responseArr = geminiResponse.split(" ");
        let timeoutIds = [];

        for (let i = 0; i < responseArr.length; i++) {
            const timeoutId = setTimeout(() => {
                setResponse((prev) => `${prev}${responseArr[i]} `);
                if (i === responseArr.length - 1 && i !== 0) {
                    setCompletedResponse(true);
                }
                QNARef.current.scrollTop = QNARef.current.scrollHeight;
            }, i * 100);
            timeoutIds.push(timeoutId);
        }

        return () => {
            timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
        };
    }, [geminiResponse]);

    return (
        <div className="QNA" ref={QNARef}>
            <div className="user">
                <div>
                    <p>{recentPrompt}</p>
                    <img src={assets.user_icon} alt="" />
                </div>
            </div>
            <div className="geminiAi">
                <img src={assets.gemini_icon} alt="" />
                <div ref={GeminiRef} className='geminiResponse'>
                    <MarkdownRenderer markdownContent={response} />
                </div>
                {completedResponse &&
                    <div className='responseFeatures'>
                        <img
                            src={speaking ? assets.stop_icon : assets.speaker_icon}
                            alt=""
                            onClick={speak}
                        />
                        <img
                            src={assets.copy_icon}
                            alt=""
                            onClick={(e) => Copy(GeminiRef.current.innerText, e)}
                            className='copy'
                        />
                        <img
                            src={assets.refresh_icon}
                            alt=""
                            onClick={refresh}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default QNA
