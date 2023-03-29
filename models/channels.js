import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})

const model = mongoose.model('Channels', schema);
export default model;