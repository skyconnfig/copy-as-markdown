export function localize(): void {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (key) {
            const argsAttr = el.getAttribute('data-i18n-args');
            const args = argsAttr ? argsAttr.split(',') : [];
            const message = browser.i18n.getMessage(key, args);
            if (message) {
                if (el instanceof HTMLInputElement && (el.type === 'button' || el.type === 'submit')) {
                    el.value = message;
                } else if (message.includes('<') || message.includes('&')) {
                    el.innerHTML = message;
                } else {
                    el.textContent = message;
                }
            }
        }
    });
}
