import React from 'react';
import { marked } from 'marked';

const MarkdownRenderer = ({ text }) => {
    const createMarkup = () => {
        return { __html: marked(text) };
    };

    return <span dangerouslySetInnerHTML={createMarkup()} ></span>;
};

export default MarkdownRenderer;
