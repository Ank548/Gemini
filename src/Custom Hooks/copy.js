import { assets } from "../assets/assets";

function Copy(text, e) {
    let copyElement;
    if (e.target.closest('.copy')) {
        copyElement = e.target.closest('.copy')
    }
    else {
        const children = Array.from(e.target.closest('div').children);
        copyElement = children.find(child => child.classList.contains('copy'));
    }

    navigator.clipboard.writeText(text);

    copyElement.src = assets.check_icon
    setTimeout(() => {
        copyElement.src = assets.copy_icon
    }, 2000);
}

export default Copy
