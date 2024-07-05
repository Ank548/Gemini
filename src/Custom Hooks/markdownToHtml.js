import { marked } from 'marked';
import { assets } from '../assets/assets';

const escapeHtml = (unsafe) => {
    return unsafe.replace(/[&<"']/g, (match) => {
        switch (match) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case "'":
                return '&#039;';
            default:
                return match;
        }
    });
};

const renderer = new marked.Renderer();

renderer.code = (code, language) => {
    const languageName = language || code.lang;
    const escapedCode = escapeHtml(code.text);
    return `
    <div class='codeCopy'>
      <div>
        <div>${languageName.charAt(0).toUpperCase() + languageName.slice(1).toLowerCase()}</div>
        <div class='copyButton'>
          <img src=${assets.copy_icon} alt="" class='copy' />
          <span>Copy code</span>
        </div>
      </div>
      <pre>${escapedCode}</pre>
    </div>
    `;
};

marked.setOptions({
    renderer,
    breaks: true,
    gfm: true,
});

const markdownToHtml = (markdown) => {
    return marked(markdown);
};

export default markdownToHtml
