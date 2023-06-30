
const controllerButtonBack = () => {
    const buttonBack = document.querySelector('.register__button-back-login')

    buttonBack.addEventListener('click', () => {
        location.replace('../../index.html')
    })
}

controllerButtonBack() 