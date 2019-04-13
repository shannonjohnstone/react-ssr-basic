// node
import path from 'path'
import fs from 'fs'

// express and react
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

// UI application
import App from '../src/App'

// server bootstrap
const PORT = 8080
const app = express()
const router = express.Router()

const errorHandler = (err, req, res, next) => {
  console.error(err.msg)

  if (process.env.NODE === 'production') {
    return res.status(500).end()
  }

  return res.status(500).json({ error: err, stack: err.stack })
}

// render server helper
const serverRenderer = (req, res, next) => {
  const context = {}
  const indexFile = path.resolve('./build/index.html');

  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  )


  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      err.msg = 'Read build file error'
      return next(err)
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${app}</div>`
      )
    )
  })
}

router.use('^/$', serverRenderer)

router.use(
  express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
)

app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`)
})
