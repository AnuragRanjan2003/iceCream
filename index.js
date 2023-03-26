import express from 'express';
import bodeParser from 'body-parser';
import routes from './routes/request.js';
import ngrok from 'ngrok';
import Users from './firebaseconfig.js';


const app = express();
const port  = 80;
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
app.use('/request',routes);
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

