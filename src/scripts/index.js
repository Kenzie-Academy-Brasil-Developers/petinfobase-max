/* Desenvolva seu código aqui */

const controllerButtonRegister = () => {
    const buttonRegister = document.querySelector('.index__button-register')

    buttonRegister.addEventListener('click', () => {
        location.replace('./src/pages/register.html')
    })
}

controllerButtonRegister()