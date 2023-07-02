
export const closeModalOutlineClick = () => {
    const body = document.querySelector('body')

    body.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal__controller')) {
            const modal = document.querySelector('.modal__controller')

            modal.close()
        }
    })
}

export const closeModal = () => {
    const buttonX = document.querySelector('.modal-close__button')
    const modalController = document.querySelector('.modal__controller')

    const buttonsEvent = () => {
        modalController.close()
    }

    buttonX.addEventListener('click', buttonsEvent)
}