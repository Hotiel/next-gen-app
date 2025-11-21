import { react, useState, useEffect } from 'react'

import { StartTournament } from "./StartTournament.jsx";
import { SelectorCard } from "./SelectorCard";
import { LiveTracker } from "./LiveTracker.jsx";
import { updatePlayerStats } from '../../../../public/data/utils/dataUpdater.js';
import { arrayToGamesObject } from '../../../../public/data/utils/transformGamesArray.js';

export function TournamentFlow(){

    const [players, setPlayers] = useState(null);
    const [gamesData, setGamesData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [resPlayers, resGames] = await Promise.all([
                    fetch('http://localhost:3001/api/players'),
                    fetch('http://localhost:3001/api/games')
                ]);

                const playersData = await resPlayers.json();
                const games = await resGames.json();

                setPlayers(playersData);
                setGamesData(arrayToGamesObject(games));

            } catch (error) {
                return (error)
            }
        }

        fetchData();
    }, []);

    const [started, setStarted] = useState(false);
    const [selectedPlayers, setSelectedPlayers] = useState([])
    const [selectedGame, setSelectedGame] = useState('')
    const [completeSelection, setCompleteSelection] = useState(false);
    const [tournamentSummary, setTournamentSummary] = useState(null);
    const handleFinishTournament = (summary) => {
            setTournamentSummary(summary);
            updatePlayerStats(summary);
        };

    return (
        
        <>
            <StartTournament
            started={started}
            setStarted={setStarted}/>
            {started ? (
                players && gamesData ?(
                    <SelectorCard
                        players={players}
                        gamesData={gamesData}
                        selectedPlayers={selectedPlayers}
                        setSelectedPlayers={setSelectedPlayers}
                        selectedGame={selectedGame}
                        setSelectedGame={setSelectedGame}
                        completeSelection={completeSelection}
                        setCompleteSelection={setCompleteSelection}
                    />
                ) : ( <div><h2>CARGANDO DATOS...</h2></div> ) 
            ) : null}
            {completeSelection && selectedPlayers.length > 0 ? (
                <LiveTracker
                players={players}
                selectedPlayers={selectedPlayers} 
                selectedGame={selectedGame} 
                onFinish={handleFinishTournament}
                tournamentSummary={tournamentSummary}
                />
            ) : null}
            
            
        </>
    )
}