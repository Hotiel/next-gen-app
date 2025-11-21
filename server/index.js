import express from 'express'
import cors from 'cors';
import fs from 'node:fs'
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDB from './db.js';
import GameData from './models/gamesData.js'
import Player from './models/playersData.js'
import Usser from './models/ussers.js'
import registerRoutes from './routes/indexRoutes.js';

dotenv.config();
connectDB()

const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}));

const PORT = 3001;
const DATA_PATH = './data.json';

app.use(express.json());
app.use(cookieParser());
app.use(helmet());




// Llamadas ------------

registerRoutes(app);

// DB Files


app.get('/api/games', async (req, res) => {
    try {
        const gamesDataDB = await GameData.find();
        res.json(gamesDataDB)
    } catch (error) {
        console.error('Error al cargar gamesDataDB desde Mongo:', error);
        res.status(500).json({message: 'error al obtener gamesDataDB'});
    }
});

app.get("/api/test", (req, res) => {
    console.log("Ping recibido");
    res.json({ ok: true, message: "Backend vivo y conectado" });
});

app.get('/api/players', async (req, res) => {
    try {
        const playersDataDB = await Player.find();
        res.json(playersDataDB)
    } catch (error) {
        console.error('Error al cargar playersDataDB desde MOngo:', error);
        res.status(500).json({message: 'error al obtener playersDataDB'});
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const ussers = await Usser.find().sort({ id: 1 });
        res.json(ussers);
    } catch (error) {
        res.status(500).json({message: 'error al cargar los usuarios'});
    }
})

app.post('/api/guardar-jornada', async (req, res) => {
    try {
        const { updatedGamesData, updatedPlayers } = req.body;

        if (!updatedGamesData || typeof updatedGamesData !== 'object') {
            return res.status(400).json({ message: 'updatedGamesData inválido o faltante' }); 
        }
        if (!Array.isArray(updatedPlayers)) {
            return res.status(400).json({ message: 'updatedPlayers debe ser un array' });
        }


        if (updatedPlayers.length > 0) {
        
            const playerOps = updatedPlayers.map(p => {
                if (typeof p.id === 'undefined') {
                console.warn('Jugador sin id, saltando:', p);
                return null;
            }

            return {
                updateOne: {
                    filter: { id: p.id },     
                    update: { $set: p },      
                    upsert: true              
                }
            };
            }).filter(Boolean);

        if (playerOps.length > 0) {
            const bulkResult = await Player.bulkWrite(playerOps);
        }
        }

        const tipos = Object.keys(updatedGamesData);
        for (const gameKey of tipos) {
            const entry = updatedGamesData[gameKey];

            if (!entry || typeof entry !== 'object') {
                console.warn(`Entry inválido para game ${gameKey}, saltando.`);
                continue;
            }

            const updated = await GameData.findOneAndUpdate(
                    { game: gameKey },
                {
                    game: gameKey,
                    totalGames: typeof entry.totalGames === 'number' ? entry.totalGames : 0,
                    ultimoTorneo: entry.ultimoTorneo ?? null
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );


        }

        return res.json({ message: 'Jornada guardada correctamente en DB' });

    } catch (err) {
        console.error('Error en /api/guardar-jornada:', err);
        return res.status(500).json({ message: 'Error interno guardando la jornada' });
    }
});

app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`)
})