import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Usser from '../models/ussers.js';
import dotenv from 'dotenv';

dotenv.config();

async function hashPasswords() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB Atlas");

    const users = await Usser.find();
    console.log(`Encontrados ${users.length} usuarios`);

    for (const user of users) {

      if (!user.password.startsWith("$2b$")) {
        const hashed = await bcrypt.hash(user.password, 10);
        user.password = hashed;
        await user.save();
        console.log(`🔒 Hasheada password para: ${user.usuario}`);
      } else {
        console.log(`⏭ Ya hasheada: ${user.usuario}`);
      }
    }

    console.log("✨ Todas las contraseñas fueron procesadas correctamente.");
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error al hashear contraseñas:", error);
  }
}

hashPasswords();