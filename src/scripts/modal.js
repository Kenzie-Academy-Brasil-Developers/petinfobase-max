
export const controlOpenModal = (buttonClass) => {
    const button = document.querySelector(`.${buttonClass}`)

    if (button.id === 'open') {
        const modalPostController = document.querySelector('.modal-post__controller')

        button.addEventListener('click', () => {
            modalPostController.showModal()
            closeModal(button.id)
        })
    } else if (button.id === 'edit') {
        const modalEditController = document.querySelector('.modal-edit__controller')

        button.addEventListener('click', () => {
            modalEditController.showModal()
            closeModal(button.id)
        })
    } else if (button.id === 'delete'){
        const modalDeleteController = document.querySelector('.modal-delete__controller')

        button.addEventListener('click', () => {
            modalDeleteController.showModal()
            closeModal(button.id)
        })
    } else {
        const modalCreateController = document.querySelector('.modal-create__controller')

        button.addEventListener('click', () => {
            modalCreateController.showModal()
            closeModal(button.id)
        })
    }
}

export const closeModal = (typeModal) => {
    if (typeModal === 'open') {
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
    } else if (typeModal === 'edit') {
        const modalEditController = document.querySelector('.modal-edit__controller')
        const buttonEditX = document.querySelector('.modal-edit-close__button')
        const buttonCancel = document.querySelector('.modal-edit__button-cancel')
        const body = document.querySelector('body')
        const closeButton = () => modalEditController.close()

        body.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal-edit__controller')) {
                const modal = document.querySelector('.modal-edit__controller')
                modal.close()
            }
        })

        buttonEditX.addEventListener('click', closeButton)
        buttonCancel.addEventListener('click', closeButton)
    } else if (typeModal === 'delete'){
        const buttonDeleteX = document.querySelector('.modal-delete-close__button')
        const buttonCancel = document.querySelector('.modal-delete__button-cancel')
        const modalDeleteController = document.querySelector('.modal-delete__controller')
        const body = document.querySelector('body')
        const closeButton = () => modalDeleteController.close()

        body.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal-delete__controller')) {
                const modal = document.querySelector('.modal-delete__controller')

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
        const closeButton = () => modalCreateController.close()

        body.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal-create__controller')) {
                const modal = document.querySelector('.modal-create__controller')

                modal.close()
            }
        })

        buttonCreateX.addEventListener('click', closeButton)
        buttonCancel.addEventListener('click', closeButton)
    }
}