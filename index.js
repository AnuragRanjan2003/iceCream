import express from 'express';
import bodeParser from 'body-parser';
import routes from './routes/request.js';
import ngrok from 'ngrok';
import Users from './firebaseconfig.js';
import mongoose from 'mongoose';
import session from 'express-session';
import dbRouter from './routes/database.js';


const app = express();
const port  = 80;
const dbUrl = "mongodb+srv://MainUser:XHOqYqtsQ1urwqOD@users.mn6tdzm.mongodb.net/?retryWrites=true&w=majority"
const connectionConfig={
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(dbUrl,connectionConfig).then((it) => {
    console.log("connected to Mongoose")
}).catch((err) => console.error(err));

var url2 =  "";
const id = "0koZqDZp4P19IWKCpRbL";
await ngrok.authtoken("2NUyRNijqG8ozqpeTJY7ng8Lfzo_KUossDse8rgK59BmCURY");
const url = await ngrok.connect()
    .then(url=>{
        console.log(url); 
        url2 = url;
        setUrl(url).then((it)=>{
            console.log("url set");
        }).catch((err)=>{
            console.log(err);
        });

    })
    .catch(err=> console.error(err));  

app.use(bodeParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
    
}))
app.use('/request',routes);
app.use('/databse',dbRouter);
app.get("/",(req,res)=>{
    res.send("hello");
})

async function setUrl(Url){
    const data = {
        url: Url
    }
    await Users.doc(id).update(data);
}

app.listen(port,()=>{
    console.log('I am live at '+url2);
});

