export const toastRender = (message, text, image, color) => {
    const toastContainer = document.createElement('section')
    const toastFigure = document.createElement('figure')
    const toastImg = document.createElement('img')
    const toastMessage = document.createElement('figcaption')
    const toastText = document.createElement('div') 

    toastContainer.classList.add('toast__container')
    toastContainer.classList.add('hidden-toast')
    toastFigure.classList.add('toast__figure')
    toastImg.classList.add('toast__image')
    toastMessage.classList.add('toast__message')
    toastText.classList.add('toast__text')
    
    if (image === 'erroIndex'){
        toastImg.src = './src/assets/error-icon.svg'
    } else if(image === 'erroCreate' || image === 'erroDashboard'){
        toastImg.src = '../assets/error-icon.svg'
    } else if(image === 'login'){
        toastImg.src = './src/assets/check-true.svg'
    } else {
        toastImg.src = '../assets/check-true.svg'
    }
    
    toastMessage.style.color = color
    toastMessage.innerText = message
    toastText.innerHTML = text

    toastContainer.append(toastFigure, toastText)
    toastFigure.append(toastImg, toastMessage)

    return toastContainer
}