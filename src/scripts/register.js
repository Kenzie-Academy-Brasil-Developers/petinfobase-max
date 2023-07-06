import { createUserRequest } from "./requests.js";
import { toastOpen } from "./toast.js";

const controllerButtonBack = () => {
    const buttonBack = document.querySelectorAll('.back__index-button')

    buttonBack.forEach(element => {
        element.addEventListener('click', () => {
            location.replace('../../index.html')
        })
    });

}

const handleCreateUser = () => {
    const inputs = document.querySelectorAll('.create__input')
    const button = document.querySelector('.register__button-acess')
    let newUserBody = {}
    let count = 0

    button.addEventListener('click', () => {
        inputs.forEach(input => {
            if (input.value.trim() === ''){
                count++
                input.classList.add('input__error-red');
            }
            newUserBody[input.name] = input.value.trim()
        })

        if(count !== 0) {
            count = 0

            return toastOpen('Campo faltando', 'Por favor preencha todos os campos de cadastro', 'var(--alert100)', 'erroCreate')
        } else {
            createUserRequest(newUserBody)
        }
    })
}

const verifyInputsIncorrect = () => {
    const inputEmail = document.getElementById('registerEmail')
    const emailMsgIncorrect = document.querySelector('.register-error__email')
    const inputPassword = document.getElementById('registerPassword')
    const passwordMsgIncorrect = document.querySelector('.register-error__password')
    const inputUser = document.getElementById('registerUser')
    const userMsgIncorrect = document.querySelector('.register-error__user')
    const inputImg = document.getElementById('registerImg')
    const imgMsgIncorrect = document.querySelector('.register-error__img')

    inputEmail.addEventListener('input', () =>{
        inputEmail.classList.remove('input__error-red')
        emailMsgIncorrect.classList.add('hidden')
    })

    inputPassword.addEventListener('input', () =>{
        inputPassword.classList.remove('input__error-red')
        passwordMsgIncorrect.classList.add('hidden')
    })

    inputUser.addEventListener('input', () =>{
        inputUser.classList.remove('input__error-red')
        userMsgIncorrect.classList.add('hidden')
    })

    inputImg.addEventListener('input', () =>{
        inputImg.classList.remove('input__error-red')
        imgMsgIncorrect.classList.add('hidden')
    })
}

verifyInputsIncorrect()
handleCreateUser()
controllerButtonBack() 