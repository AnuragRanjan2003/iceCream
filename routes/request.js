import express from 'express'
import session from 'express-session';
import { Configuration, OpenAIApi } from 'openai';
import cj from 'circular-json';
const router = express.Router();
const base_context = "You are an AI assistant that is expert in ice creams.\nYou know about all kinds of ice cream flavours ans how to make them.\nYou can provide advice on ice creams flavours ,the ingredients needed to make them ans any thing else related to ice creams.\nIf you are unable to provide an answer to a question, please respond with \"I don't know about that.\".\nDo not use external URLs in your answers.Do not refer to any blogs in your answers.\nFormat any lists on individual lines with a bullet in front of each of  them. \n";



router.get("/",(req ,res)=>{
    res.send('Hello');
});


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

router.get("/icecream",(req,res)=>{
    console.log(req.sessionID);
    if(req.session.context== null) req.session.context = base_context+"Human:"+req.query.context+"\n";
    else
    req.session.context = req.session.context + "Human:"+req.query.context+"\n";
    getResponse(req.session.context).then((it)=>{
        const str = cj.stringify(it);
        const result = JSON.parse(str);

        res.send(result.data);
        //console.log(result.data.choices[0].text);
        req.session.context = req.session.context+result.data.choices[0].text+"\n";
        req.session.save();
        console.log(req.session.context);
    });
    //res.send(req.query.q);
});

router.get("/clear",(req,res)=>{ 
    req.session.destroy()
    res.send({"msg" : "context cleared"});
});



export default router;