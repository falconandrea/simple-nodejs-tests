const express = require('express')
const router = express.Router()
const ejs = require('ejs')

const filmController = require('../controllers/film.controller')

router.get('/', async (req, res) => {
  const films = await filmController.getList()
  console.log('refresh list')
  res.render('pages/list', {
    films: films
  })
})

router.post('/new-film', async (req, res) => {
  try {
    if(!req.body.year) throw new Error('Missing year')
    if(!req.body.title) throw new Error('Missing title')

    await filmController.newFilm(req.body)
    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
})

router.post('/delete-film/:id', async (req, res) => {
  try {
    if(!req.params.id) throw new Error('Missing ID')
    const result = await filmController.deleteFilm(req.params.id)
    if(result) res.redirect('/')
    else throw new Error('Film not found')
  }
  catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
})

module.exports = router
