import { tablaCompleta } from "./public/data/utils/calcs.js";
import { swipeData } from "./src/components/utils/mySwiperSlideData.js";



function generateRoundRobin(players) {
  // trabajamos con array de ids
  const ids = players.map(p => (typeof p === 'object' ? p.id : p));
  const n0 = ids.length;
  const playersList = [...ids];

  // si impar, añadimos un bye (null)
  const hasBye = playersList.length % 2 === 1;
  if (hasBye) playersList.push(null);

  const n = playersList.length;
  const rounds = [];

  for (let round = 0; round < n - 1; round++) {
    const matches = [];
    for (let i = 0; i < n / 2; i++) {
      const a = playersList[i];
      const b = playersList[n - 1 - i];
      matches.push({ a, b }); // a o b pueden ser null (bye)
    }
    rounds.push(matches);

    // rotate: fija índice 0, rota el resto hacia la derecha
    const fixed = playersList[0];
    const rest = playersList.slice(1);
    rest.unshift(rest.pop());
    playersList.length = 0;
    playersList.push(fixed, ...rest);
  }

  return rounds; // array de rounds, cada uno es array de {a,b}
}



// LiveTracker.jsx (simplificado)
import React, { useMemo, useState } from "react";

/*
 props:
  - playersData: array de objetos { id, nombre, ... } (tu fuente de players)
  - livePlayerIds: array de ids seleccionados
  - game: string
  - onFinish(tournamentSummary) -> callback para guardar o enviar al backend
*/

export function LiveTracker({ players, selectedPlayers, selectedGame, onFinish }) {
  // map ids -> player objects
  const livePlayers = players.filter(player => selectedPlayers.includes(player.id));

  // handle bye
  const finalPlayers = useMemo(() => {
    const arr = [...livePlayers];
    if (arr.length % 2 === 1) arr.push ({id: null, nombre: 'Libre'});
    return arr;
    }, [livePlayers])

  // generate rounds once (memoized)
    const rounds = useMemo(() => {
    const ids = finalPlayers.map(player => player.id);
    // usamos la función definida antes (o reimplementarla aquí)
    return generateRoundRobin(ids).map(round => 
        round.map((m, idx) => ({
            id: `${roundsIndex++}-${idx}`,
            a: m.a,
            b: m.b,
        }))
    )
        }, [finalPlayers])

  // estado para resultados: clave `${r}-${i}` -> "A"|"B"|"empate"
  const [results, setResults] = useState({});

    const setResult = (roundIdx, matchIdx, value) => {
        setResults(prev => ({ ...prev, [`${roundIdx}-${matchIdx}`]: value }));
    };

  const handleFinish = () => {
    // calculamos puntos por player
    const points = {};
    finalPlayers.forEach(p => { if (p.id !== null) points[p.id] = 0; });

    rounds.forEach((r, ri) => {
      r.forEach((m, mi) => {
        const key = `${ri}-${mi}`;
        const res = results[key];
        if (!res) return; // partido sin resultado
        const { a, b } = m;
        if (res === "A" && a !== null) points[a] += 3;
        if (res === "B" && b !== null) points[b] += 3;
        if (res === "empate") {
          if (a !== null) points[a] += 1;
          if (b !== null) points[b] += 1;
        }
      });
    });

    // quien ganó la jornada? el que tenga más puntos
    const sorted = Object.entries(points).sort(([, pa], [, pb]) => pb - pa);
    const top = sorted[0]; // [id, puntos] o undefined
    const winnerId = top ? Number(top[0]) : null;

    // resumen minimal para persistir
    const tournamentSummary = {
      id: `t-${Date.now()}`,
      date: new Date().toISOString(),
      game,
      players: livePlayerIds,
      winner: winnerId,
      points, // opcional: guardar el breakdown
    };

    // entregar al padre para guardar
    onFinish && onFinish(tournamentSummary);
  };

  return (
    <div>
      <h3>Fixture (en vivo)</h3>

      {rounds.map((round, ri) => (
        <div key={ri}>
          <h4>Ronda {ri + 1}</h4>
          {round.map((m, mi) => {
            const playerA = playersData.find(p => p.id === m.a);
            const playerB = playersData.find(p => p.id === m.b);
            const key = `${ri}-${mi}`;
            return (
              <div key={key} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div>{playerA ? playerA.nombre : "Libre"}</div>
                <div>
                  <label>
                    <input type="radio" name={key} onChange={() => setResult(ri, mi, "A")} />
                    A
                  </label>
                  <label>
                    <input type="radio" name={key} onChange={() => setResult(ri, mi, "empate")} />
                    Empate
                  </label>
                  <label>
                    <input type="radio" name={key} onChange={() => setResult(ri, mi, "B")} />
                    B
                  </label>
                </div>
                <div>{playerB ? playerB.nombre : "Libre"}</div>
              </div>
            );
          })}
        </div>
      ))}

      <button onClick={handleFinish}>Finalizar Jornada</button>
    </div>
  );
}


const saveLocal = (t) => {
  const existing = JSON.parse(localStorage.getItem('tournaments') || '[]');
  existing.push(t);
  localStorage.setItem('tournaments', JSON.stringify(existing));
}

fetch('/api/tournaments', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(tournamentSummary)
})
// <bloque>-<elemento>__<sub-elemento>--<modificador>