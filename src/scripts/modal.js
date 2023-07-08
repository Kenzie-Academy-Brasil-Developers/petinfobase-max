export const openModalCreatePost = () => {
    const button = document.querySelector('.dashboard__button-publication')

    const modalCreateController = document.querySelector('.modal-create__controller')

    button.addEventListener('click', () => {
        modalCreateController.showModal()
        closeModal(button.id)
    })
}

export const closeModal = (typeModal) => {
    

    if (typeModal === 'openPostButton') {
        const modalPostController = document.querySelector('.modal-post__controller')
        const buttonPostX = document.querySelector('.modal-post-close__button')
        const body = document.querySelector('body')
        const closeButton = () => modalPostController.close()

        body.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal-post__controller')) {
                const modal = document.querySelector('.modal-post__controller')
                modal.close()
            }
        })

        buttonPostX.addEventListener('click', closeButton)
    } else if (typeModal === 'editPostButton') {
        const modalEditController = document.querySelector('.modal-edit__controller')
        const buttonEditX = document.querySelector('.modal-edit-close__button')
        const buttonCancel = document.querySelector('.modal-edit__button-cancel')
        const body = document.querySelector('body')
        const errorText = document.querySelector('.modal__show-erro-edit')

        const closeButton = () => {
            modalEditController.close()
            errorText.classList.add('hidden')
        }

        body.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal-edit__controller')) {
                const modal = document.querySelector('.modal-edit__controller')
                errorText.classList.add('hidden')
                modal.close()
            }
        })

        buttonEditX.addEventListener('click', closeButton)
        buttonCancel.addEventListener('click', closeButton)
    } else if (typeModal === 'deletePostButton') {
        const buttonDeleteX = document.querySelector('.modal-delete-close__button')
        const buttonCancel = document.querySelector('.modal-delete__button-cancel')
        const modalDeleteController = document.querySelector('.modal-delete__controller')
        const body = document.querySelector('body')
        const errorText = document.querySelector('.modal__show-erro-delete')
        const closeButton = () => {
            modalDeleteController.close()
            errorText.classList.add('hidden')
        }

        body.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal-delete__controller')) {
                const modal = document.querySelector('.modal-delete__controller')
                errorText.classList.add('hidden')
                modal.close()
            }
        })

        buttonDeleteX.addEventListener('click', closeButton)
        buttonCancel.addEventListener('click', closeButton)
    } else {
        const buttonCreateX = document.querySelector('.modal-create-close__button')
        const buttonCancel = document.querySelector('.modal-create__button-cancel')
        const modalCreateController = document.querySelector('.modal-create__controller')
        const body = document.querySelector('body')
        const errorText = document.querySelector('.modal__show-erro-create')
        const limpaInputs = () => {
            const inputsCreate = document.querySelectorAll('.create__post')
            inputsCreate.forEach(input => {
                input.value = ''
            })
        }

        const closeButton = () => {
            limpaInputs()
            modalCreateController.close()
            errorText.classList.add('hidden')
        }

        body.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal-create__controller')) {
                const modal = document.querySelector('.modal-create__controller')
                limpaInputs()
                errorText.classList.add('hidden')
                modal.close()
            }
        })

        buttonCreateX.addEventListener('click', closeButton)
        buttonCancel.addEventListener('click', closeButton)
    }
}