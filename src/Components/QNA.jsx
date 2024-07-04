import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { useSelector } from 'react-redux'
import Markdown from 'marked-react'
import geminiCall from '../Custom Hooks/GeminiCall'
import Copy from '../Custom Hooks/copy'

function QNA() {
    const { recentPrompt, geminiResponse } = useSelector((state) => state.prompts);
    const [speaking, setSpeaking] = useState(false);
    const [completedResponse, setCompletedResponse] = useState(false);
    const [response, setResponse] = useState("")
    const [displayResponse, setDisplayResponse] = useState("")
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
            const utterance = new SpeechSynthesisUtterance(geminiResponse);
            window.speechSynthesis.speak(utterance);
            setSpeaking(true);
        } else {
            alert('Your browser does not support text-to-speech.');
        }
    }

    const refresh = () => {
        setResponse("")
        setDisplayResponse("")
        gemini(recentPrompt);
    }

    useEffect(() => {
        setResponse("")
        setDisplayResponse("")
        setCompletedResponse(false)

        const codeSplit = geminiResponse.split(/```/)
        let formattedResponse = []

        for (let i = 0; i < codeSplit.length; i++) {
            if (i % 2 !== 0) {
                const firstSpaceIndex = codeSplit[i].indexOf("\n");
                const languageName = firstSpaceIndex === -1 ? codeSplit[i] : codeSplit[i].slice(0, firstSpaceIndex).trim();
                const code = codeSplit[i].slice(firstSpaceIndex + 1).trim();
                formattedResponse.push(
                    <div key={`code${i}`} className='codeCopy'>
                        <div>
                            <div>{languageName.charAt(0).toUpperCase() + languageName.slice(1).toLowerCase()}</div>
                            <div onClick={(e) => Copy(code, e)} className='copyButton'>
                                <img
                                    src={assets.copy_icon}
                                    alt=""
                                    className='copy'
                                />
                                <span>Copy code</span>
                            </div>
                        </div>
                        <pre>{code}</pre>
                    </div>
                )
            }
            else {
                formattedResponse.push(<Markdown key={`text${i}`}>{codeSplit[i].trim()}</Markdown>)
            }
        }

        const responseArr = geminiResponse.split(" ");
        let timeoutIds = [];

        for (let i = 0; i < responseArr.length; i++) {
            const timeoutId = setTimeout(() => {
                // if (GeminiRef.current.querySelectorAll('.geminiResponse pre:has([class^="language-"])').length !== 0) {
                //     GeminiRef.current.querySelectorAll('.geminiResponse pre:has([class^="language-"])')[0].innerHTML = 'jdjsadnandnwandjnands'
                // }
                setDisplayResponse((prev) => `${prev}${responseArr[i]} `);
                if (i === responseArr.length - 1 && i !== 0) {
                    setResponse(formattedResponse)
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
                <div ref={GeminiRef} className='geminiResponse'>{response ? response : <Markdown>{displayResponse}</Markdown>}</div>
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
