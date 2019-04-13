// node
import path from 'path'
import fs from 'fs'

// express and react
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

// UI application
import App from '../src/App'

// server bootstrap
const PORT = 8080
const app = express()
const router = express.Router()

// render server helper
const serverRenderer = (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err, 'Read build file error')
      return res.status(500).end()
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    )
  })
}

router.use('^/$', serverRenderer)

router.use(
  express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
)

app.use(router)

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`)
})
