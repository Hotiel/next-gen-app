import fs from 'node:fs'


const juegos = ['pes', 'patojuego', 'padel', 'otros'];

const gamesData = {
    general: { totalGames: 0, ultimoTorneo: null },
    ...Object.fromEntries(juegos.map(j => [j, { totalGames: 0, ultimoTorneo: null }])),
};

fs.writeFileSync('./data/gamesData.json', JSON.stringify(gamesData, null, 2));

console.log('gamesData.json creado con éxito ✅');console.log('gamesData.json creado con éxito ✅');