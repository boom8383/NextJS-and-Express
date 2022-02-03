const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV === "production"
const PORT = 3000
const app = next({
    dev,
    dir: "./"
})
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.all("*", (req, res) => {
        return handle(req, res)
    })

    const connection = server.listen(PORT,"127.0.0.1", (error) => {
        if (error) throw error
        console.log(`Listening on ${connection.address().address}:${connection.address().port}`)
    })
})