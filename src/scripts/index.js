/* Desenvolva seu código aqui */

import { toastOpen } from "./toast.js"

const controllerButtonRegister = () => {
    const buttonRegister = document.querySelector('.index__button-register')

    buttonRegister.addEventListener('click', () => {
        location.replace('./src/pages/register.html')
    })
}

controllerButtonRegister()

//  toastOpen('',  '', '', 'login')