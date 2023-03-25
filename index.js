import express from 'express';
import bodeParser from 'body-parser';
import routes from './routes/request.js';
import ngrok from 'ngrok';


const app = express();
const port  = 5000;
const url = await ngrok.connect()
    .then(url=>{
        console.log(url);
    })
    .catch(err=> console.error(err));  //http://localhost:80

app.use(bodeParser.json());
app.use('/request',routes);

app.listen(port,()=>{
    console.log('I am live at http://localhost:5000');
});

