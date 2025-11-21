import mongoose from "mongoose";

const usserSchema = new mongoose.Schema({
        "id": {type: Number, required: true, unique: true},
        "usuario": {type: String, required: true, unique: true},
        "password": {type: String, required: true},
        "role": {type: String, required: true},
        "avatar": {type: String},
        "settings": {
            "theme": {type: String}, 
            "sound": {type: Boolean},},
        "loginCount": {type: Number},
        "lastLogin": {type: Date, default: Date.now},
        "isActive": {type: Boolean, default: true},
        "createdAt": {type: Date, default: Date.now},
        "passwordHint": {type: String},
    })

    const Usser = mongoose.model("Usser", usserSchema);

    export default Usser