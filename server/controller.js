const events = require('./db.json')
let globalId = 4

module.exports = {
    getEvents: (req, res) => {
        res.status(200).send(events)
    },

    addEvents: (req, res) => {
        const{eventName, eventDate, description, timeSpent, startTime, eventStatus} = req.body

        const newEvent = {
            id: globalId,
            eventName,
            eventDate,
            description,
            timeSpent,
            startTime,
            eventStatus,
        }
        events.push(newEvent)
        console.log(globalId)
        globalId++
        res.status(200).send(events)
    },

    deleteEvents: (req,res) => {
        // const index = events.findIndex((el) => el.id === req.params.id)
        const index = req.params.id - 1
        
        console.log("Delete Event")
        console.log(index)
        events.splice(index,1)

        res.status(200).send(events)
    },

    updateEvents: (req, res) => {
        const index = req.params.id - 1
        events[index].eventStatus = "completed"
        console.log(index)
        console.log("updated event")
        // events[index].status = "incomplete"
        // if(type === "like"){
        //     events[index].status = "Done"
        // } else if (type === 'dislike'){
        //     events[index].likes--
        //}

        res.status(200).send(events)
    }
}
