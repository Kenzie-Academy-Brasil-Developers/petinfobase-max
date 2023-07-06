import { toastRender } from "./render.js"

export const toastOpen = (message, text, color, type) => {
    const body = document.querySelector('body')
    let messageItem = ''
    let textItem = ''
    
    if (type === 'erroIndex' || type === 'erroCreate') {
        messageItem = message
        textItem = text

        const henderToast = toastRender(messageItem, textItem, type, color)
        
        body.appendChild(henderToast)
    } else if (type === 'login') {
        messageItem =  'Login feito com sucesso!'
        textItem = 'Aguarde que você será redirecionado a pagina de dashboard'

        const henderToast = toastRender(messageItem, textItem, 'login', color)
        
        body.appendChild(henderToast)
    } else if (type === 'register') {
        messageItem = 'Sua conta foi criada com sucesso! teste'
        textItem = 'Agora você pode acessar os conteúdos utilizando seu usuário e senha da página de login: <a href="../../index.html">Acessar página</a>'

        const henderToast = toastRender(messageItem, textItem, '', color)
        
        body.appendChild(henderToast)
    } else if (type === 'delete') {
        messageItem = 'Post deletado com sucesso!'
        textItem = 'O post selecionado para exclusão foi deletado, a partir de agora não aparecerá no seu feed'

        const henderToast = toastRender(messageItem, textItem, '', color)
        
        body.appendChild(henderToast)
    }

    const toastContainer = document.querySelector('.toast__container')

    toastContainer.classList.remove('hidden-toast')

    setTimeout(() => {
        toastContainer.classList.add('toast__out')
    },3000)

    setTimeout(() =>{
        toastContainer.remove()
    },4500)
}