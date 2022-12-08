const express = require('express')
const cors = require('cors')

const app = express()


app.use(express.json())
app.use(cors())

const {getEvents, addEvents, deleteEvents, updateEvents} = require('./controller')

app.get('/events', getEvents)
app.post('/addEvents', addEvents)
app.delete('/deleteEvents/:id', deleteEvents)
app.put('/updateEvents/:id', updateEvents)

app.listen(4020, () => console.log('ports 4020 reached'))

