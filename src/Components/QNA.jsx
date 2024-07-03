import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { useSelector } from 'react-redux'
import Markdown from 'marked-react'
import geminiCall from '../Custom Hooks/GeminiCall'

function QNA() {
    const { recentPrompt, geminiResponse } = useSelector((state) => state.prompts);
    const [speaking, setSpeaking] = useState(false);
    const [completedResponse, setCompletedResponse] = useState(false);
    const [response, setResponse] = useState([])
    const GeminiRef = useRef(null);
    const imgRef = useRef(null);
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

    const copy = () => {
        navigator.clipboard.writeText(GeminiRef.current.innerText)
        imgRef.current.src = assets.check_icon
        setTimeout(() => {
            imgRef.current.src = assets.copy_icon
        }, 2000);
    }

    const refresh = () => {
        setResponse([])
        gemini(recentPrompt);
    }

    useEffect(() => {
        setResponse([])
        setCompletedResponse(false)

        const codeSplit = geminiResponse.split(/```/)
        let formattedResponse = []

        for (let i = 0; i < codeSplit.length; i++) {
            if (i % 2 !== 0) {
                const firstSpaceIndex = codeSplit[i].indexOf("\n");
                const languageName = firstSpaceIndex === -1 ? codeSplit[i] : codeSplit[i].slice(0, firstSpaceIndex).trim();
                const code = codeSplit[i].slice(firstSpaceIndex + 1).trim();
                formattedResponse.push(
                    <div key={`code${i}`} style={{ backgroundColor: '#f0f4f9', padding: "12px", borderRadius: "12px" }}>
                        <div>
                            <span>{languageName}</span>
                            <button onClick={handleCopy}>Copy</button>
                        </div>
                        <pre>{code}</pre>
                    </div>
                )

                function handleCopy() {
                    navigator.clipboard.writeText(code)
                }
            }
            else {
                formattedResponse.push(<Markdown key={`text${i}`}>{codeSplit[i].trim()}</Markdown>)
            }
        }

        setResponse(formattedResponse)
        console.log(formattedResponse)

        // const responseArr = geminiResponse.split(" ");
        // let timeoutIds = [];

        // for (let i = 0; i < responseArr.length; i++) {
        //     const timeoutId = setTimeout(() => {
        //         setResponse((prev) => prev + responseArr[i] + " ");
        //         if (i === responseArr.length - 1 && i !== 0) {
        //             setCompletedResponse(true);
        //         }
        //         QNARef.current.scrollTop = QNARef.current.scrollHeight;
        //     }, i * 100);
        //     timeoutIds.push(timeoutId);
        // }

        // return () => {
        //     timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
        // };
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
                    {response}
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
                            onClick={copy}
                            ref={imgRef}
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
