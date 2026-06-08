import express from 'express'

const routeIndex = express.Router()

routeIndex.get('/', (req, res) => {
     res.sendFile(path.resolve('./public/html/index.html'))
})

export default routeIndex
