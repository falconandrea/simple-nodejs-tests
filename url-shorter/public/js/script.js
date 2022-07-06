const form = document.getElementById('shortenerForm')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const originalUrl = document.getElementById('shortenerInput').value || ''

  if (originalUrl) {
    fetch('/api/url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        originalUrl
      })
    })
      .then((res) => res.json())
      .then((data) => {
        // Reset input
        document.getElementById('shortenerInput').value = ''
        document.getElementById('results').innerHTML = ''

        // Print data
        const link = `<p class="mt-4 block text-gray-700 text-sm font-bold">Here your short URL: <a href="${data.shortUrl}" class="underline text-blue-700 text-sm font-normal" title="" target="_blank">${data.shortUrl}</a></p>`
        document.getElementById('results').insertAdjacentHTML('beforeend', link)
      })
  }
})
