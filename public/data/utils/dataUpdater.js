import { arrayToGamesObject } from "./transformGamesArray";

export async function updatePlayerStats (tournamentSummary) {

    const resGames = await fetch(`${import.meta.env.VITE_API_URL}/api/games`);
    const unsortedGamesData = await resGames.json()
    const gamesData = await arrayToGamesObject(unsortedGamesData)

    const resPlayers = await fetch(`${import.meta.env.VITE_API_URL}/api/players`);
    const players = await resPlayers.json()

    const updatedGamesData = { ...gamesData };
    const updatedPlayers = players.map(p => ({... p}));

    updatedGamesData.general.totalGames++;
    updatedGamesData.general.ultimoTorneo = tournamentSummary.date;

    const game = tournamentSummary.game;
    if (!updatedGamesData[game]) updatedGamesData[game] = {totalGames: 0, ultimoTorneo: null};
    updatedGamesData[game].totalGames++;
    updatedGamesData[game].ultimoTorneo = tournamentSummary.date;

    updatedPlayers.forEach(player => {
        if (tournamentSummary.players.includes(player.id)) {
            if (!player[game]) {
                    player[game] = { tot: 0, win:0 } 
                }   
            player[game].tot++;

            if (tournamentSummary.empate && tournamentSummary.empatados.includes(player.id)){
                player.empates++;
            }
            if (player.id === tournamentSummary.winner) {
                player[game].win++
            }
        }
    });
    
    await fetch(`${import.meta.env.VITE_API_URL}/api/guardar-jornada`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({updatedGamesData, updatedPlayers})
    });

}