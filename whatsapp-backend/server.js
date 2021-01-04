import express from 'express';
import mongoose from 'mongoose';
import Messages from'./dbMessages.js';
import Pusher from 'pusher';
import cors from "cors";

const app = express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
    appId: "1129590",
    key: "3ae77f6fba5df8332c05",
    secret: "13f9e8b97dd7034aa0f2",
    cluster: "eu",
    useTLS: true
  });
  

app.use(express.json());
app.use(cors());

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
// })


const connection_url = 'mongodb+srv://admin:wVvybBzJPZW3Tuj@cluster0.rdmzz.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection

db.once('open',()=>{
    console.log("Db");

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change)=>{
        console.log(change);

        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
            {
                name: messageDetails.name,
                message:messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
        } else {
            console.log("error triggering pusher")
        }
    });
});



app.get('/',(req,res)=>res.status(200).send('hi'));

app.get('/messages/sync', (req,res)=>{
    Messages.find((err,data)=>{
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req,res)=>{
    const dbMessage= req.body
    
    Messages.create(dbMessage,(err,data)=>{
        if (err) {
             res.status(500).send(err)
        } else {
             res.status(201).send(data)
        }
    })
    
})

app.listen(port,()=>console.log(`work on:${port}`));