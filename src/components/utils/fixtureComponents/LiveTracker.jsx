    import React, { useState, useMemo } from 'react';
    import { generateRoundRobin } from './RoundRobin.jsx';
    import { useAuth } from '../AuthContext.jsx';
    import { useLocation, useNavigate } from "react-router-dom";
    
    export function LiveTracker({players, selectedPlayers, selectedGame, onFinish, tournamentSummary}) {
    
        const livePlayers = players.filter(player => selectedPlayers.includes(player.id));
        const { user } = useAuth();
        const isGuest = user?.role == "guest";


        const finalPlayers = useMemo(() => {
            const arr = [...livePlayers];
            if (arr.length % 2 === 1) arr.push ({id: 999, nombre: 'Libre'});
            return arr;
        }, [livePlayers])

        const rounds = useMemo(() => {
            const ids = finalPlayers.map(player => player.id);
            return generateRoundRobin(ids).map((round, ri) => 
                round.map((m, mi) => ({
                id: `${ri}-${mi}`,
                a: m.a,
                b: m.b,
            }))
        )
        }, [finalPlayers])

        const [results, setResults] = useState({});
        const [livePoints, setLivePoints] = useState({});
        const [finished, setFinished] = useState(false);
        const navigate = useNavigate();


        const setResult = (roundIdx, matchIdx, value) => {
            setResults(prev => ({ ...prev, [`${roundIdx}-${matchIdx}`]: value }));

            setLivePoints(prev => {
                const newPoints = { ...prev };
                const match = rounds[roundIdx][matchIdx];
                const { a, b } = match;

                // Inicializamos jugadores si aún no existen
                if (a !== 999 && !newPoints[a]) newPoints[a] = 0;
                if (b !== 999 && !newPoints[b]) newPoints[b] = 0;

    // Eliminamos los puntos anteriores de ese partido si había uno
                const key = `${roundIdx}-${matchIdx}`;
                const previousResult = results[key];
                if (previousResult) {
                if (previousResult === "A" && a !== 999) newPoints[a] -= 3;
                if (previousResult === "B" && b !== 999) newPoints[b] -= 3;
                if (previousResult === "empate") {
                    if (a !== 999) newPoints[a] -= 1;
                    if (b !== 999) newPoints[b] -= 1;
                }
            }

    // Sumamos los nuevos puntos
            if (value === "A" && a !== 999) newPoints[a] += 3;
            if (value === "B" && b !== 999) newPoints[b] += 3;
            if (value === "empate") {
                if (a !== 999) newPoints[a] += 1;
                if (b !== 999) newPoints[b] += 1;
        }

        return newPoints;
    });
};

        const handleFinish = () => {
    // calculamos puntos por player
            const points = {};
            let empate = false;
            let empatados = [];
            finalPlayers.forEach(p => { if (p.id !== 999) points[p.id] = livePoints[p.id] || 0; });

            rounds.forEach((r, ri) => {
                r.forEach((m, mi) => {
                const key = `${ri}-${mi}`;
                const res = results[key];
                if (!res) return; // partido sin resultado
                const { a, b } = m;
                if (res === "A" && a !== 999) points[a] += 3;
                if (res === "B" && b !== 999) points[b] += 3;
                if (res === "empate") {
                if (a !== 999) points[a] += 1;
                if (b !== 999) points[b] += 1;
                }
            });
        });

            const sorted = Object.entries(points).sort(([, pa], [, pb]) => pb - pa);

            const maxPoints = sorted[0][1]; // valor más alto de puntos
            empatados = sorted
            .filter(([id, pts]) => pts === maxPoints)
            .map(([id]) => Number(id));
                
            if (empatados.length > 1) {
            empate = true;
            }

            const winnerId = empate ? null : Number(sorted[0][0]);
            
            const tournamentSummary = {
                id: `t-${Date.now()}`,
                date: new Date().toISOString(),
                game: selectedGame,
                players: selectedPlayers,
                empate: empate,
                empatados: empatados.length < 2 ? null : empatados,
                winner: empate ? null : winnerId,
                points,
            };

            onFinish && onFinish(tournamentSummary);
            setFinished(prev => !prev);
        };

        const allMatchesResolved = rounds.every((round, ri) =>
            round.every((match, mi) => {
                if (match.a === 999 || match.b === 999) return true;
                return Boolean(results[`${ri}-${mi}`]);
            })
        );

        return (
            <>
            <article className='container d-flex flex-wrap justify-content-center align-items-center'>

                <div className='glass-card card-live'>
                    
                    <div className='live-container'>
                        <h5>Fixture (en vivo)</h5>

                        {rounds.map((round, ri) => (
                        <div key={ri} className='live-rounds'>
                            <h6>Ronda {ri + 1}</h6>
                                {round.map((m, mi) => {
                                    const playerA = players.find(p => p.id === m.a);
                                    const playerB = players.find(p => p.id === m.b);
                                    const key = `${ri}-${mi}`;
                                    const isAlibre = m.a === 999;
                                    const isBlibre = m.b === 999;
                                    return (
                                        <div key={key} className={`live-game ${isAlibre || isBlibre ? 'free-game' : ''}`}>
                                        <div className='match-card'>
                                        <label className={`live-player player-a ${results[`${ri}-${mi}`] === "A" ? 'winer' : ''}`}>
                                            <input type="radio" hidden name={key} onChange={() => setResult(ri, mi, "A")} disabled={isAlibre || isBlibre} />
                                            <div className='player-text'>{playerA ? playerA.nombre : "Libre"}</div>
                                        </label>
                                        <label className={`live-player player-draw ${results[`${ri}-${mi}`] === "empate" ? 'winer' : ''}`}>
                                            <input type="radio" hidden name={key} onChange={() => setResult(ri, mi, "empate")} disabled={isAlibre || isBlibre} />
                                            <div className='player-text'>Draw</div>
                                        </label>
                                        <label className={`live-player player-b ${results[`${ri}-${mi}`] === "B" ? 'winer' : ''}`}>
                                            <input type="radio" hidden name={key} onChange={() => setResult(ri, mi, "B")} disabled={isAlibre || isBlibre}/>
                                            <div className='player-text'>{playerB ? playerB.nombre : "Libre"}</div>
                                        </label>
                                    </div>
                                
                            </div>
                        );
                    })}
                </div>
            ))}

                        <button className='my-selector-button' disabled={!allMatchesResolved || !user || isGuest} onClick={handleFinish}>{user ? "FINALIZAR JORNADA" : "INICIAR SESION"}</button>
                        {!user || isGuest ? <p className='guest-p'>Función solo disponible para miembros</p> : null}
                    </div>

                </div>

                <div className='glass-card card-live-table'>
                    <div className='live-table-container'>
                        <h5>Tabla (en vivo)</h5>
                        <table className='table table-dark table-striped'>
                            <thead>
                                <tr>
                                <th>Jugador</th>
                                <th>Puntos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(livePoints)
                                .sort(([, a], [, b]) => b - a)
                                .map(([id, pts]) => {
                                    const player = players.find(p => p.id === Number(id));
                                    return (
                                    <tr key={id}>
                                        <td>{player ? player.nombre : "Desconocido"}</td>
                                        <td>{pts}</td>
                                    </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </article>

            {finished ? (
                <div className="complete-window-modal-login">
                    <div className='finished-message'>
                        <h5>Torneo cerrado</h5>
                        <p>
                            {tournamentSummary ? (
                                        tournamentSummary.empate ? (
                                        (() => {
                                            const empatePlayers = players.filter(p =>
                                            tournamentSummary.empatados?.includes(p.id)
                                        );                          
                                            return `🍻 Empate 🍻: 
                                            ${empatePlayers
                                            .map(ep => ep.nombre)
                                            .join(", ")}`;
                                        })()                        
                                        ) : (
                                            (() => {
                                                    const winnerPlayer = players.find(
                                                    p => p.id === tournamentSummary.winner
                                        );                          
                                    return `🏆 Ganador 🏆: 
                                    ${winnerPlayer?.nombre ?? "Desconocido"}`;
                                    }) ()
                                )                           
                            ) : null}
                            </p>
                        <button onClick={() => navigate("/")}> Volver al inicio </button>
                    </div>
                </div> ) : null}
            </>
        )
}



