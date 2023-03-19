import express from 'express';
import bodeParser from 'body-parser';
import routes from './routes/request.js';
import cj from 'circular-json';

const app = express();
const port  = 5000;
const context = "You are an AI assistant that is expert in ice creams.\nYou know about all kinds of ice cream flavours ans how to make them.\nYou can provide advice on ice creams flavours ,the ingredients needed to make them ans any thing else related to ice creams.\nIf you are unable to provide an answer to a question, please respond with \"I don't know about that.\".\nDo not use external URLs in your answers.Do not refer to any blogs in your answers.\nFormat any lists on individual lines with a bullet in front of each of  them. \n"

app.use(bodeParser.json());
app.use('/request',routes);
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);


async function getResponse(prompt){
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: prompt,
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

return response;
}

app.get("/",(req,res)=>{
    getResponse(context+"Human:tell me about ice cream flavours.").then((it)=>{
        const str=  cj.stringify(it);
        res.send(JSON.parse(str));
    });
    //res.send('hi');
});

app.listen(port,()=>{
    console.log('I am live at http://localhost:5000');
});

