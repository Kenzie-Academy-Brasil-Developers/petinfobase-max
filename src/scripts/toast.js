export const toastOpen = (message, text, color, type) => {
    const toastContainer = document.querySelector('.toast__container')
    const toastMessage = document.querySelector('.toast__message')
    const toastText = document.querySelector('.toast__text')
    const iconToast = document.querySelector('.toast__image')

    toastMessage.style.color = color
    
    if (type === 'erro') {
        toastMessage.innerText = message
        toastText.innerText = text
        iconToast.src = './src/assets/error-icon.svg'
    } else if (type === 'login') {
        toastMessage.innerText =  'Login feito com sucesso!'
        toastText.innerText = 'Aguarde que você será redirecionado a pagina de dashboard'
        iconToast.src = './src/assets/check-true.svg'
    } else if (type === 'register') {
        toastMessage.innerText = 'Sua conta foi criada com sucesso! teste'
        toastText.innerText = 'Agora você pode acessar os conteúdos utilizando seu usuário e senha da página de login: <a href="../../index.html">Acessar página</a>'
        iconToast.src = '../assets/check-true.svg'
    } else if (type === 'delete') {
        toastMessage.innerText = 'Post deletado com sucesso!'
        toastText.innerText = 'O post selecionado para exclusão foi deletado, a partir de agora não aparecerá no seu feed'
        iconToast.src = '../assets/check-true.svg'
    }

    toastContainer.classList.remove('hidden-toast')

    setTimeout(() => {
        toastContainer.classList.add('toast__out')
    },4000)

    setTimeout(() =>{
        toastContainer.classList.add('hidden-toast')
        toastContainer.classList.remove('toast__out')
    },5500)
}