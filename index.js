import express from 'express';
import bodeParser from 'body-parser';
import routes from './routes/request.js';


const app = express();
const port  = 5000;


app.use(bodeParser.json());
app.use('/request',routes);

app.listen(port,()=>{
    console.log('I am live at http://localhost:5000');
});

