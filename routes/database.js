import express from 'express'
import cj from 'circular-json'
import model from '../models/channels.js'
const dbRouter = express.Router()


dbRouter.get('/add', (req, res) => {
    /*console.log(req.query.name)*/
    var new_model = new model();
    new_model.name = req.query.name;
    new_model.id = req.query.id;
    new_model.save().then(() => {
        res.status(200).send({
            "msg": "success",
        });
        console.log(`${req.query.name} added successfully`)
    }).catch(err => console.log(err))
}
)

dbRouter.get('/find', (req, res) => {
    model.find().then(data => {
        res.status(200).send(data);
        console.log(` found successfully`)
    }).catch(err => console.log(err))
})

dbRouter.get('/update', (req, res) => {
    model.findByIdAndUpdate(req.query.uid, {
        name: req.query.name
    }).then(data => {
        res.status(200).send({msg: 'updated successfully'})
    }).catch(err => console.log(err))

})
export default dbRouter;