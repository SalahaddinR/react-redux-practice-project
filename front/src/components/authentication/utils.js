export const focusHandle = (event) => {
    const label = event.currentTarget.querySelector('.inputLabel');
    label.style.cssText = `
        top: -12px; 
        left: 15px; 
        color: #e41053;
        font-weight: 600;
        transition: .2s linear;
        z-index: 10;
    `
}

export const blurHandle = (event) => {
    const label = event.currentTarget.querySelector('.inputLabel');
    
    if (event.currentTarget.querySelector('.inputField').value === '') {
        label.removeAttribute('style');
    }

}