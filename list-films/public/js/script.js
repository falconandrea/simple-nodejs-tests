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
  if (
    document.getElementById('yearFilm').value !== '' &&
    document.getElementById('titleFilm').value !== ''
  ) {
    const data = {
      year: document.getElementById('yearFilm').value,
      title: document.getElementById('titleFilm').value
    }
    fetch('/api/film', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        window.location.href = '/'
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
  event.preventDefault()
  return false
})

// Delete button
document.querySelectorAll('td.delete-button').forEach((item) => {
  item.addEventListener('click', () => {
    fetch(`/api/film/${item.getAttribute('data-id')}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then(() => {
        window.location.href = '/'
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  })
})
