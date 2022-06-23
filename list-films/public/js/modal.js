const modal = document.getElementById('modal-new-film')
const btnModal = document.getElementById('modal-new-film-button')
const modalBtnClose = document.getElementById('modal-btn-close')

btnModal.addEventListener('click', () => {
  modal.classList.toggle('hidden')
})

modalBtnClose.addEventListener('click', () => {
  modal.classList.toggle('hidden')
})
