const modal = document.getElementById('modal-new-film')
const form = document.getElementById('modal-form')
const btnModal = document.getElementById('modal-new-film-button')
const modalBtnClose = document.getElementById('modal-btn-close')

btnModal.addEventListener('click', () => {
  modal.classList.toggle('hidden')
})

modalBtnClose.addEventListener('click', () => {
  modal.classList.toggle('hidden')
})

form.addEventListener('submit', (event) => {
  if (document.getElementById('yearFilm').value !== '' && document.getElementById('titleFilm').value !== '') return true
  event.preventDefault()
})
