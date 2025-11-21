import mongoose from "mongoose";

const gameDataSchema = new mongoose.Schema({
    game: { type: String, required: true }, 
    totalGames: { type: Number, default: 0 },
    ultimoTorneo: { type: String, default: "Aún no hay torneos" }
});

const GameData = mongoose.model("GameData", gameDataSchema);
export default GameData;