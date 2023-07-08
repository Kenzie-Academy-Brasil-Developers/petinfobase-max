// import { showDash } from "./dashboard.js"
import { closeModal } from "./modal.js"

export const renderPosts = (array = []) => {
    const listPost = document.querySelector('.dashboard__controller-lists')

    listPost.innerHTML = ''

    array.forEach(post => {
        const card = createCard(post)

        listPost.appendChild(card)
    })
}

const createCard = (bodyPost) => {
    const { id, title, content, createdAt, user } = bodyPost
    const userId = localStorage.getItem('@petinfo:id')

    const postContainer = document.createElement('li')
    const postInfoUser = document.createElement('div')
    const postUserController = document.createElement('div')
    const postImgUser = document.createElement('img')
    const postNameUser = document.createElement('p')
    const postLine = document.createElement('span')
    const postDate = document.createElement('p')

    const postTitle = document.createElement('h2')
    const postText = document.createElement('p')
    const postButtonAcess = document.createElement('button')

    postContainer.classList.add('dashboard__list')
    postInfoUser.classList.add('dashboard__info-user')
    postUserController.classList.add('dashboard__img-list-controller')
    postImgUser.classList.add('dashboard__img-user-list')
    postNameUser.classList.add('dashboard__name-user')
    postDate.classList.add('dashboard__date-publisher')
    postText.classList.add('resume-description')
    postButtonAcess.classList.add('dashboard__button-acess-publication')


    postImgUser.src = user.avatar
    verifyImg(postImgUser)

    postNameUser.innerText = user.username
    postLine.innerText = '|'
    postDate.innerText = formatDate(createdAt)
    postTitle.innerText = title

    if (content.length >= 145){
        postText.innerText = `${content.substring(0, 145)}...`
    } else {
        postText.innerText = content
    }
    

    postButtonAcess.innerText = 'Acessar publicação'
    postButtonAcess.dataset.postId = id
    postButtonAcess.id = 'openPostButton'

    postButtonAcess.addEventListener('click', () => {
        const modalContainer = document.querySelector('.modal-post__controller')
        modalContainer.innerHTML = ''

        modalContainer.appendChild(renderOpenPostModal(bodyPost))

        modalContainer.showModal()
        closeModal(postButtonAcess.id)
    })

    if (userId === user.id) {
        const postButtonController = document.createElement('div')
        const postButtonEdit = document.createElement('button')
        const postButtonDelete = document.createElement('button')

        postButtonController.classList.add('dashboard__buttons-list-controller')
        postButtonEdit.classList.add('dashboard__button-edit')
        postButtonDelete.classList.add('dashboard__button-delete')

        postButtonEdit.innerText = 'Editar'
        postButtonEdit.dataset.postId = id
        postButtonEdit.id = 'editPostButton'

        postButtonDelete.innerText = 'Excluir'
        postButtonDelete.dataset.postId = id
        postButtonDelete.id = 'deletePostButton'

        postButtonController.append(postButtonEdit, postButtonDelete)
        postInfoUser.append(postUserController, postButtonController)

    } else {
        postInfoUser.append(postUserController)
    }

    postContainer.append(postInfoUser, postTitle, postText, postButtonAcess)
    postUserController.append(postImgUser, postNameUser, postLine, postDate)

    return postContainer
}

const renderOpenPostModal = ({title, content, createdAt, user }) => {
    const modalContainer = document.createElement('section')
    const modalPostTopContainer = document.createElement('section')
    const modalDescContainer = document.createElement('div')
    const modalImg = document.createElement('img')
    const modalNameUser = document.createElement('p')
    const modalLine = document.createElement('span')
    const modalDate = document.createElement('p')
    const modalCloseButton = document.createElement('button')
    const modalPostContainer = document.createElement('section')
    const modalTitle = document.createElement('h2')
    const modalText = document.createElement('p')

    modalContainer.classList.add('modal-post__section')
    modalPostTopContainer.classList.add('modal-post-top__container')
    modalDescContainer.classList.add('modal-post-desc__container')
    modalImg.classList.add('modal-post__img-user-list')
    modalNameUser.classList.add('modal-post__name-user')
    modalDate.classList.add('modal-post__date-publisher')
    modalCloseButton.classList.add('modal-post-close__button')
    modalPostContainer.classList.add('modal-post__container')
    modalTitle.classList.add('modal-post__title')
    modalText.classList.add('modal-post__text')


    modalImg.src = user.avatar
    verifyImg(modalImg)

    modalNameUser.innerText = user.username
    modalLine.innerText = '|'
    modalDate.innerText = formatDate(createdAt)
    modalCloseButton.innerText = 'X'
    modalTitle.innerText = title
    modalText.innerText = content

    modalContainer.append(modalPostTopContainer, modalPostContainer)
    modalPostTopContainer.append(modalDescContainer, modalCloseButton)
    modalDescContainer.append(modalImg, modalNameUser, modalLine, modalDate)
    modalPostContainer.append(modalTitle, modalText)

    return modalContainer
}

export const renderDeletePostModal = (idPost) => {
    const modalContainer = document.createElement('section')
    const modalTopContainer = document.createElement('div')
    const modalTitleConfirm = document.createElement('h2')
    const modalButtonClose = document.createElement('button')
    const modalItensContainer = document.createElement('div')
    const modalTitle = document.createElement('h2')
    const modalText = document.createElement('p')
    const modalButtonContainer = document.createElement('div')
    const modalButtonDiv = document.createElement('div')
    const modalButtonCancel = document.createElement('button')
    const modalButtonDelete = document.createElement('button')
    const modalErroText = document.createElement('p')

    modalContainer.classList.add('modal-delete__section')
    modalTopContainer.classList.add('modal-delete__container-top')
    modalButtonClose.classList.add('modal-delete-close__button')
    modalItensContainer.classList.add('modal-delete-itens__container')
    modalButtonContainer.classList.add('modal-delete__buttons-div')
    modalButtonCancel.classList.add('modal-delete__button-cancel')
    modalButtonDelete.classList.add('modal-delete__button-delete')
    modalErroText.classList.add('modal__erro-text-all')
    modalErroText.classList.add('modal__show-erro-delete')
    modalErroText.classList.add('hidden')
    

    modalTitleConfirm.innerText = 'Confirmação de exclusão'
    modalButtonClose.innerText = 'X'
    modalTitle.innerText = 'Tem certeza que deseja excluir este post?'
    modalText.innerText = 'Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir'
    modalButtonCancel.innerText = 'Cancelar'

    modalButtonDelete.innerText = 'Sim, excluir este post'
    modalButtonDelete.dataset.postId = idPost

    modalContainer.append(modalTopContainer, modalItensContainer, modalButtonContainer)
    modalTopContainer.append(modalTitleConfirm, modalButtonClose)
    modalItensContainer.append(modalTitle, modalText)
    modalButtonContainer.append(modalButtonDiv, modalErroText)
    modalButtonDiv.append(modalButtonCancel, modalButtonDelete)

    return modalContainer
}

export const renderEditPostModal = ({id, title, content}) => {
    const modalContainer = document.createElement('form')
    const modalTopContainer = document.createElement('section')
    const modalTitleModal = document.createElement('h2')
    const modalButtonClose = document.createElement('button')

    const modalItensContainer = document.createElement('section')
    const modalDivTitle = document.createElement('div')
    const modalTitle = document.createElement('h3')
    const modalInputTitle = document.createElement('input')

    const modalDivText = document.createElement('div')
    const modalTextTitle = document.createElement('h3')
    const modalInputText = document.createElement('textarea')

    const modalButtonContainer = document.createElement('div')
    const modalErroText = document.createElement('p')

    const modalButtonDiv = document.createElement('div')
    const modalButtonCancel = document.createElement('button')
    const modalButtonSave = document.createElement('button')
    

    modalContainer.classList.add('modal-edit__section')
    modalTopContainer.classList.add('modal-edit__container-top')
    modalButtonClose.classList.add('modal-edit-close__button')
    modalItensContainer.classList.add('modal-edit-itens__container')
    modalDivTitle.classList.add('modal-edit__div-title')
    modalInputTitle.classList.add('modal-edit__title-post')
    modalDivText.classList.add('modal-edit__div-content')
    modalInputText.classList.add('modal-edit__content-post')
    modalButtonContainer.classList.add('modal-edit__buttons-div')
    modalErroText.classList.add('modal__erro-text-all')
    modalErroText.classList.add('modal__show-erro-edit')
    modalErroText.classList.add('hidden')
    modalButtonCancel.classList.add('modal-edit__button-cancel')
    modalButtonSave.classList.add('modal-edit__button-save')

    modalErroText.innerText = 'teste'

    modalTitleModal.innerText = 'Edição'
    modalButtonClose.innerText = 'X'
    modalButtonClose.type = 'button'

    modalTitle.innerText = 'Título do post'
    modalInputTitle.value = title
    modalInputTitle.type = 'text'
    modalInputTitle.name = 'title'
    modalInputTitle.id = 'title'

    modalTextTitle.innerText = 'Conteúdo do post'
    modalInputText.value = content

    modalInputText.name = 'content'
    modalInputText.id = 'contentEdit'
    modalInputText.wrap = 'soft'

    modalButtonCancel.innerText = 'Cancelar'
    modalButtonCancel.type = 'button'

    modalButtonSave.innerText = 'Salvar Alterações'
    modalButtonSave.type = 'button'
    modalButtonSave.dataset.postId = id


    modalContainer.append(modalTopContainer, modalItensContainer, modalButtonContainer)
    modalTopContainer.append(modalTitleModal, modalButtonClose)
    modalItensContainer.append(modalDivTitle, modalDivText)
    modalDivTitle.append(modalTitle, modalInputTitle)
    modalDivText.append(modalTextTitle, modalInputText)
    modalButtonContainer.append(modalErroText, modalButtonDiv)
    modalButtonDiv.append(modalButtonCancel, modalButtonSave)

    return modalContainer
}

export const toastRender = (message, text, type, color) => {
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

    if (type === 'erroIndex') {
        toastImg.src = './src/assets/error-icon.svg'
    } else if (type === 'erroDashboard') {
        toastImg.src = '../assets/error-icon.svg'
    } else if (type === 'login') {
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

export const formatDate = (dateString) => {
    const dateIten = new Date(dateString);
    const monthArray = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const month = monthArray[dateIten.getMonth()];
    const year = dateIten.getFullYear();
    const dateFormated = month + ' de ' + year;

    return dateFormated;
}

export const verifyImg = (imgClass) => {
    const imgSrcEmpt = 'https://imgs.search.brave.com/dmNsyBvLmS4jetkOvFsxVmpaniEqqxT8BaNBAI-_7jM/rs:fit:416:416:1/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vcGhvdG9z/L2ljb24tb2YtYS1i/dXNpbmVzc21hbi1h/dmF0YXItb3ItcHJv/ZmlsZS1waWMtcGlj/dHVyZS1pZDQ3NDAw/MTg5Mj9rPTYmbT00/NzQwMDE4OTImcz0x/NzA2NjdhJnc9MCZo/PWF0cVpzV0YtVWNM/QkQ1dTJCTVpqcE11/cjZKOW56aVFyclBh/aXFaaDU3S1k9'

    imgClass.addEventListener("error", function () {
        this.src = imgSrcEmpt //Inplementa imagem padrão caso erro
    })
}