import { assets } from "../assets/assets";

function Copy(text, e) {
    const copyDiv = e.target.closest('div');
    const copyElement = copyDiv.querySelector('.copy')

    if (copyElement) {
        navigator.clipboard.writeText(text)
            .then(() => {
                copyElement.src = assets.check_icon;
                setTimeout(() => {
                    copyElement.src = assets.copy_icon;
                }, 2000);
            })
            .catch((error) => {
                console.error('Failed to copy:', error);
            });
    }
}

export default Copy
