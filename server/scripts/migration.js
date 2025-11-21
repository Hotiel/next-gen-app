import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

import User from "../models/ussers.js";
import Player from "../models/playersData.js";
import GameData from "../models/gamesData.js";

dotenv.config();

// Conectar a Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error al conectar:", err));

const migrateUsers = async () => {
  const usersPath = path.resolve("data/ussers.json");
  const usersData = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

  for (const user of usersData) {
    try {
      const newUser = new User(user);
      await newUser.save();
      console.log(`Usuario ${user.usuario} migrado ✅`);
    } catch (err) {
      console.error(`Error migrando usuario ${user.usuario}:`, err.message);
    }
  }
};

const migratePlayers = async () => {
  const playersPath = path.resolve("data/playersData.json");
  const playersData = JSON.parse(fs.readFileSync(playersPath, "utf-8"));

  for (const player of playersData) {
    try {
      const newPlayer = new Player(player);
      await newPlayer.save();
      console.log(`Jugador ${player.nombre} migrado ✅`);
    } catch (err) {
      console.error(`Error migrando jugador ${player.nombre}:`, err.message);
    }
  }
};

const migrateGames = async () => {
  const gamesPath = path.resolve("data/gamesData.json");
  const gamesData = JSON.parse(fs.readFileSync(gamesPath, "utf-8"));

  for (const game in gamesData) {
    const entry = gamesData[game];
    try {
      const newGame = new GameData({
        game,
        totalGames: entry.totalGames,
        ultimoTorneo: entry.ultimoTorneo
      });
      await newGame.save();
      console.log(`GameData tipo ${game} migrado ✅`);
    } catch (err) {
      console.error(`Error migrando GameData tipo ${game}:`, err.message);
    }
  }
};

const runMigration = async () => {
  await migrateUsers();
  await migratePlayers();
  await migrateGames();
  mongoose.disconnect();
  console.log("🚀 Migración completada");
};

runMigration(); 