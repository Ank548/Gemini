import React, { useEffect } from 'react';
import HTMLReactParser from 'html-react-parser';
import markdownToHtml from '../Custom Hooks/markdownToHtml';
import Copy from '../Custom Hooks/copy';

const MarkdownRenderer = ({ markdownContent }) => {
    const htmlContent = markdownToHtml(markdownContent);

    useEffect(() => {
        const handleCopyClick = (event) => {
            const copyButton = event.target.closest('.copyButton');
            if (copyButton) {
                const codeElement = copyButton.closest('.codeCopy').querySelector('pre');
                if (codeElement) {
                    const code = codeElement.innerText;
                    Copy(code, event);
                }
            }
        };

        document.body.addEventListener('click', handleCopyClick);

        return () => {
            document.body.removeEventListener('click', handleCopyClick);
        };
    }, [markdownContent]);

    return <div>{HTMLReactParser(htmlContent)}</div>;
};

export default MarkdownRenderer;
