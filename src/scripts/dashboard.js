import { closeModal, closeModalOutlineClick } from "./modal.js"

const controlModal = () => {
    const buttonModal = document.querySelector('.dashboard__button-acess-publication')
    const modalController = document.querySelector('.modal__controller')

    buttonModal.addEventListener('click', () => {
        modalController.showModal()
        closeModalOutlineClick()
        closeModal()
    })
}

controlModal()
