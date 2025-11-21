export function generateRoundRobin(players) {

    const ids = players.map(p => (typeof p === 'object' ? p.id : p));
    const n0 = ids.length;
    const playersList = [...ids];


    const n = playersList.length;
    const rounds = [];

    for (let round = 0; round < n - 1; round++) {
        const matches = [];
        for (let i = 0; i < n / 2; i++) {
            const a = playersList[i];
            const b = playersList[n - 1 - i];
        matches.push({ a, b });
        }
        rounds.push(matches);

    
    const fixed = playersList[0];
    const rest = playersList.slice(1);
    rest.unshift(rest.pop());
    playersList.length = 0;
    playersList.push(fixed, ...rest);
    }

    return rounds; 
}