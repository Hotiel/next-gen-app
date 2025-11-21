import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    nombre: { type: String, required: true },
    empates: { type: Number, default: 0 },

    pes: {
        win: { type: Number, default: 0 },
        tot: { type: Number, default: 0 }
    },

    patojuego: {
        win: { type: Number, default: 0 },
        tot: { type: Number, default: 0 }
    },

    padel: {
        win: { type: Number, default: 0 },
        tot: { type: Number, default: 0 }
    },

    otros: {
        win: { type: Number, default: 0 },
        tot: { type: Number, default: 0 }
    }
});

const Player = mongoose.model("Player", playerSchema);

export default Player;