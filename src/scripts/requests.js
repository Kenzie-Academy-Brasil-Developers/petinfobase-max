import { toastOpen } from "./toast.js"

const baseUrl = 'http://localhost:3333'
const greenToast = 'var(--sucess100)'
export const redToast = 'var(--alert100)'

export const loginRequest = async (loginBody) => {
    const tokenReturn = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginBody)
    })
    .then(async (res) => {
        const resJson = await res.json()

        if(res.ok) {
            localStorage.setItem('@petinfo:token', resJson.token)

            toastOpen('',  '', greenToast, 'login')

            setTimeout(() => {
                location.replace('./src/pages/dashboard.html')
            }, 2000)

            return resJson
        } else {
            throw new Error(resJson.message)
        }
    })
    .catch(err =>{

        if (err.message === 'O email está incorreto'){
            const inputEmail = document.getElementById('indexEmail')
            const emailMsgIncorrect = document.querySelector('.index-error__email')

            toastOpen(err.message, 'Tente novamente', redToast, 'erroIndex')

            inputEmail.classList.add('input__error-red')
            emailMsgIncorrect.classList.remove('hidden')

        } else if (err.message === 'A senha está incorreta'){
            const inputPassword = document.getElementById('indexPassword')
            const passwordMsgIncorrect = document.querySelector('.index-password__email')

            toastOpen(err.message, 'Tente novamente', redToast, 'erroIndex')

            inputPassword.classList.add('input__error-red')
            passwordMsgIncorrect.classList.remove('hidden')
        } else {
            toastOpen(err.message, 'Tente novamente mais tarde', redToast, 'erroIndex')
        }
    })

    return tokenReturn
}

export const createUserRequest = async (newUserBody) => {
    const createUser = await fetch(`${baseUrl}/users/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserBody) 
    })
    .then(async (res) => {
        const resJson = await res.json()

        if (res.ok){
            localStorage.setItem('@petinfo:user', JSON.stringify(resJson))

            toastOpen('',  '', greenToast, 'register') 

            setTimeout(() => {
                location.replace('../../index.html')
            }, 2000)

        } else {  
            throw new Error(res.message)
        }
    })
    .catch(err =>{
        toastOpen('Erro no cadastro', 'Usuario ou email já cadastrado', redToast, 'erroCreate')       
    })

    return createUser
}

