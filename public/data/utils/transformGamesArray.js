export function arrayToGamesObject(gamesArray) {
    return gamesArray.reduce((acc, game) => {
        acc[game.game] = game;
        return acc;
    }, {});
}