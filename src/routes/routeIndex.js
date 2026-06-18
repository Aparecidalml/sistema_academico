import express from 'express'
import path from 'path'

const routeIndex = express.Router()

routeIndex.get('/', (req, res) => {
     res.sendFile(path.resolve('./public/html/index.html'))
})

export default routeIndex
