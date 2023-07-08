import { closeModal, openModalCreatePost } from './modal.js'
import { renderDeletePostModal, renderEditPostModal, renderPosts, verifyImg } from './render.js'
import { createPost, deletePostById, getPosts, getUserProfile, updatePostById } from './requests.js'

const authentication = () => {
    const token = localStorage.getItem('@petinfo:token')

    if (!token) {
        location.replace('../../index.html')
    }
}

export const showDash = async () => {
    const allPosts = await getPosts()

    renderPosts(allPosts.reverse())

    handleDeletPost()
    handleEditPost(allPosts)
}

const userData = async () => {
    const userProfile = await getUserProfile()
    const userImage = document.querySelector('.dashboard__img-user')
    const nameUser = document.querySelector('.nav__item')

    nameUser.innerText = `@${userProfile.username}`
    userImage.src = userProfile.avatar
    verifyImg(userImage)
    localStorage.setItem('@petinfo:id', userProfile.id)
    localStorage.setItem('@petinfo:username', userProfile.username)
}

const handleNewPost = () => {
    const inputs = document.querySelectorAll('.create__post')
    const button = document.querySelector('#addPostSubmit')
    const modalController = document.querySelector('.modal-create__controller')
    const newPostBody = {}
    let count = 0

    button.addEventListener('click', async () => {
        const errorText = document.querySelector('.modal__show-erro-create')

        errorText.classList.add('hidden')

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                count++

                input.classList.add('input__error-red');
            }
            newPostBody[input.name] = input.value.trim()
        })

        errorText.innerText = ''

        if (count !== 0) {
            count = 0
            errorText.classList.remove('hidden')
            
            errorText.innerHTML = 'Preencha todos os campos'
 
        } else {
            await createPost(newPostBody)

            showDash()

            inputs.forEach(input => {
                input.value = ''
            })

            modalController.close()
        }
    })
}

const handleDeletPost = () => {
    const deleteButtons = document.querySelectorAll('.dashboard__button-delete')

    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const modalContainer = document.querySelector('.modal-delete__controller')

            modalContainer.innerHTML = ''

            modalContainer.appendChild(renderDeletePostModal(event.target.dataset.postId))

            modalContainer.showModal()

            closeModal(event.target.id)
            handleConfirmDeletePost(event.target.dataset.postId)
        })

    })
}

const handleConfirmDeletePost = (idPost) => {
    const modalButtonDelete = document.querySelector('.modal-delete__button-delete')

    modalButtonDelete.addEventListener('click', async () => {
        const modal = document.querySelector('.modal-delete__controller')
        await deletePostById(idPost)
        showDash()
        modal.close()
    })
}

const handleEditPost = (editBody) => {
    const editButtons = document.querySelectorAll('.dashboard__button-edit')

    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const modalContainer = document.querySelector('.modal-edit__controller')
            const idPost = event.target.dataset.postId

            modalContainer.innerHTML = ''

            editBody.forEach(array => {
                if (array.id === idPost) {
                    modalContainer.appendChild(renderEditPostModal(array))
                }
            })

            modalContainer.showModal()

            closeModal(event.target.id)

            handleConfirmEditPost(idPost)
        })
    })
}

const handleConfirmEditPost = (idPost) => {
    const modalButtonEdit = document.querySelector('.modal-edit__button-save')
    const inputTitle = document.querySelector('.modal-edit__title-post')
    const inputText = document.querySelector('.modal-edit__content-post')
    const editPostBody = {}

    modalButtonEdit.addEventListener('click', async () => {
        const modal = document.querySelector('.modal-edit__controller')

        editPostBody[inputTitle.name] = inputTitle.value
        editPostBody[inputText.name] = inputText.value
        await updatePostById(idPost, editPostBody)
        showDash()
        modal.close()
    })
}

const navMenuController = () => {
    const navContainer = document.querySelector('.nav__container');
    const imgUser = document.querySelector('.dashboard__img-user');
    const buttonExit = document.querySelector('.nav__button')

    buttonExit.addEventListener('click', () => {
        localStorage.clear()
        authentication()        
    })

    imgUser.addEventListener('mouseenter', () => {
        navContainer.classList.add('show-menu');
        navContainer.classList.remove('hidde-menu');
    });

    navContainer.addEventListener('mouseleave', () => {
        navContainer.classList.remove('show-menu');
        navContainer.classList.add('hidde-menu');
        navContainer.addEventListener('animationend', () => {
            navContainer.classList.remove('hidde-menu');
        });
    });
}

navMenuController()
authentication()
userData()
showDash()
openModalCreatePost()
handleNewPost()