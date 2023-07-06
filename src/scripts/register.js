
const controllerButtonBack = () => {
    const buttonBack = document.querySelectorAll('.back__index-button')

    buttonBack.forEach(element => {
        element.addEventListener('click', () => {
            location.replace('../../index.html')
        })
    });

}

controllerButtonBack() 