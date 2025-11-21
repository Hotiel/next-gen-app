import { players } from "../playersData";
import { gamesData } from "../gamesData";
import { arrayToGamesObject } from "./transformGamesArray";

export async function generarTablaFinal() {

    const resPlayers = await fetch('http://localhost:3001/api/players');
    const storedPlayers = await resPlayers.json();

    const resGames = await fetch('http://localhost:3001/api/games');
    const rareGames = await resGames.json();
    const storedGames = arrayToGamesObject(rareGames)

    const playersWithTotals = storedPlayers.map(player => {
        const totalJugados = (player.pes.tot + player.patojuego.tot + player.padel.tot + player.otros.tot);
        const totalGanados = (player.pes.win + player.patojuego.win + player.padel.win + player.otros.win);
        return { ...player, totalJugados, totalGanados };
    });

    const playersWithPresence = playersWithTotals.map(player => {
        const presencia = player.totalJugados > 0 && storedGames.general.totalGames > 0
        ? (player.totalJugados / storedGames.general.totalGames * 100)
        : 0;
        return { ...player, presencia: presencia.toFixed(2) };
    });

    const playersWithEfficacy = playersWithPresence.map(player => {
        const puntos = (player.totalGanados * 3 + player.empates);
        const eficacia = player.totalJugados > 0 ? ((puntos / (player.totalJugados * 3)) * 100) : 0;
        return { ...player, puntos, eficacia: eficacia.toFixed(2) };
    });

    const pactivo = playersWithEfficacy.filter(player => player.presencia >= 40);
    const poff = playersWithEfficacy.filter(player => player.presencia < 40);

    const pactivoOrdenado = pactivo.sort((a,b) => b.eficacia - a.eficacia);
    const poffOrdenado = poff.sort((a,b) => b.eficacia - a.eficacia);

    return [...pactivoOrdenado, ...poffOrdenado];
}