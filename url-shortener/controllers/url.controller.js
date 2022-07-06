const URL = require('../models/url.model')

const getList = async (req, res) => {
  const list = await URL.find({}).select(['originalUrl', 'code'])
  return res.json(list)
}

const generateRandomCode = (length) => {
  let randomString = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    )
  }
  return randomString
}

const findByCode = async (code) => {
  const data = await URL.findOne({ code })

  return data || null
}
const findByOriginalURL = async (originalUrl) => {
  const data = await URL.findOne({ originalUrl })

  return data || null
}

const create = async (req, res) => {
  if (!req.body.originalUrl) {
    return res.status(500).send('Missing originalUrl')
  }

  // Create random code
  /* eslint-disable no-await-in-loop */
  let code = ''
  do code = generateRandomCode(10)
  while (await findByCode(code))
  /* eslint-enable no-await-in-loop */

  const url = new URL({
    originalUrl: req.body.originalUrl,
    code
  })

  return url.save((err, data) => {
    if (err) return res.status(500).send(err)
    return res.json({
      originalUrl: data.originalUrl,
      code: data.code,
      shortUrl:
        `${process.env.URL_DOMAIN}:${process.env.PORT}/${data.code}` ||
        'http://localhost:3000',
      id: data._id
    })
  })
}

const remove = async (req, res) => {
  const data = await URL.findById(req.params.id)

  if (data) {
    await data.delete()
    return res.json({ message: 'Deleted' })
  }
  return res.status(404).send('URL not found')
}

const redirectUrl = async (req, res) => {
  const data = await findByCode(req.params.code)
  return res.redirect(data.originalUrl)
}

module.exports = {
  getList,
  findByCode,
  findByOriginalURL,
  create,
  redirectUrl,
  remove
}
