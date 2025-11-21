const juegos = ['pes', 'patojuego', 'padel', 'otros'];


export const gamesData = {
    general: { totalGames: 0, ultimoTorneo: null },
    ...Object.fromEntries(juegos.map(j => [j, { totalGames: 0, ultimoTorneo: null }])),
};