// const mongoose = require("mongoose")
// const Document = require('./Document')

// mongoose.connect("mongodb://localhost/documentEdits", {
//     dbName: 'documentEdits',
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

// const dbconnect = async () => {
//     await mongoose.connect('mongodb://localhost/documentEdits');
//     console.log("Connected to Database");
// }

// dbconnect()
//     .catch((err) => console.error(err))

const io = require('socket.io')(5000, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
})

const defaultValue = ""

io.on("connection", socket => {

    socket.on('get-document', documentId => {
        // const document = findOrCreateDocument(documentId)
        data = " "
        socket.join(documentId)
        socket.emit('load-document', data)

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        })

        // socket.on('save-document', async data => {
        //     await Document.findByIdAndUpdate(documentId, { data })
        // })

    })
})



// async function findOrCreateDocument(id) {
//     if (id == null) return

//     const document = await Document.findById(id)

//     if (document) return document

//     return await Document.create({ _id: id, data: defaultValue })
// }