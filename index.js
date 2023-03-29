import express from 'express';
import bodeParser from 'body-parser';
import routes from './routes/request.js';
import ngrok from 'ngrok';
import Users from './firebaseconfig.js';
import mongoose from 'mongoose';
import session from 'express-session';
import dbRouter from './routes/database.js';
import env from 'dotenv'
env.config()


const app = express();
const port  = process.env.PORT 
const dbUrl = process.env.MONGO_URL
const connectionConfig={
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(dbUrl,connectionConfig).then((it) => {
    console.log("connected to Mongoose")
}).catch((err) => console.error(err));

var url2 =  "";
const id = process.env.FIRECLOUD_ID ;
//console.log(`token ${process.env.GPT_API_KEY}`)
await ngrok.authtoken(process.env.NGROK_TOKEN);
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
    saveUninitialized: true,
    maxage: 600000    
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

