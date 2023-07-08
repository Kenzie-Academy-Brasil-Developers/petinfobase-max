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
        const spinner = document.querySelector('.spinner')
        spinner.classList.add('hidden')

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
            throw new Error(resJson.message)
        }
    })
    .catch(err => toastOpen('Erro no cadastro', err.message, redToast, 'erroDashboard'))

    return createUser
}

export const getUserProfile = async () => {
    const token = localStorage.getItem('@petinfo:token')
    const getUser = await fetch(`${baseUrl}/users/profile`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            throw new Error('Problemas no servidor, tente novamente mais tarde')
        }
    })
    .catch(err => toastOpen('Erro no servidor', err, redToast, 'erroDashboard')
    )

    return getUser
}

export const createPost = async (postBody) => {
    const token = localStorage.getItem('@petinfo:token')
    const newPost = await fetch(`${baseUrl}/posts/create`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(postBody)
    })
    .then(async (res) => {
        const resJson = await res.json()

        if (res.ok){
            toastOpen('Post criado com sucesso!', 'O post foi criado e está disponível para visualização no seu feed', greenToast, '')

            return resJson            
        } else {
            throw new Error(resJson.message)
        }
    })
    .catch(err => {
        const errorText = document.querySelector('.modal__show-erro-create')
        errorText.classList.remove('hidden')
        errorText.innerText = err.message
        console.log(errorText)
    })

    return newPost
}

export const getPosts = async () => {
    const token = localStorage.getItem('@petinfo:token')
    const allPosts = fetch(`${baseUrl}/posts`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then (res =>{
        if (res.ok){
            return res.json()
        } else {
            throw new Error('Problemas no servidor, tente novamente mais tarde')
        }
    })
    .catch (err => toastOpen('Erro no servidor', err, redToast, 'erroDashboard'))

    return allPosts
}

export const updatePostById = async (postId, requestBody) => {
    const token = localStorage.getItem('@petinfo:token')
   
    const post = await fetch(`${baseUrl}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(async (res) => {
      const resJson = await res.json()
  
      if(res.ok) {
        toastOpen('Post editado com sucesso!', 'O post foi editado e está disponível para visualização no seu feed', greenToast, '')
  
        return resJson
      } else {
        throw new Error(resJson.message)
      }
    })
    .catch(err => {
        const errorText = document.querySelector('.modal__show-erro-edit')
        errorText.classList.remove('hidden')
        errorText.innerText = err.message
    })
  
    return post
}

export const deletePostById = async (postId) => {
    const token = localStorage.getItem('@petinfo:token')
    const post = await fetch(`${baseUrl}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(async (res) => {
      const resJson = await res.json()
  
      if(res.ok) {
        toastOpen('', '' , greenToast, 'delete')
  
        return resJson
      } else {
        throw new Error(resJson.message)
      }
    })
    .catch(err => {
        const errorText = document.querySelector('.modal__show-erro-delete')
        errorText.classList.remove('hidden')
        errorText.innerText = err.message
    })
  
    return post
}

