import { loginRequest } from "./requests.js"
import { toastOpen } from "./toast.js"

const controllerButtonRegister = () => {
    const buttonRegister = document.querySelector('.index__button-register')
    const spinner = document.querySelector('.spinner')

    spinner.classList.add('hidden')

    buttonRegister.addEventListener('click', () => {
        location.replace('./src/pages/register.html')
    })
}

const handleLogin = () => {
    const inputs = document.querySelectorAll('.login__input')
    const button = document.querySelector('.index__button-acess')
    const spinner = document.querySelector('.spinner')
    let loginBody = {}
    let count = 0

    button.addEventListener('click', async () => {
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                count++
            }
            loginBody[input.name] = input.value.trim()
        })

        if (count !== 0) {
            count = 0

            return toastOpen('Campo faltando', 'Por favor preencha todos os campos de login', 'var(--alert100)', 'erroIndex')
        } else {
            spinner.classList.remove('hidden')
            console.log(spinner)
            await loginRequest(loginBody)
        }
    })
}

const verifyInputsIncorrect = () => {
    const inputEmail = document.getElementById('indexEmail')
    const emailMsgIncorrect = document.querySelector('.index-error__email')
    const inputPassword = document.getElementById('indexPassword')
    const passwordMsgIncorrect = document.querySelector('.index-password__erro')

    inputEmail.addEventListener('input', () =>{
        inputEmail.classList.remove('input__error-red')
        emailMsgIncorrect.classList.add('hidden')
    })

    inputPassword.addEventListener('input', () =>{
        inputPassword.classList.remove('input__error-red')
        passwordMsgIncorrect.classList.add('hidden')
    })
}

verifyInputsIncorrect()
handleLogin()
controllerButtonRegister()


