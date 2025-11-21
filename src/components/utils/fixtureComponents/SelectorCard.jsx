import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import { useState, useEffect } from 'react'


export function SelectorCard ({players, gamesData, selectedPlayers, setSelectedPlayers, selectedGame, setSelectedGame, completeSelection, setCompleteSelection}) {


    const handleSelect = (playerId) => {
        setSelectedPlayers((prevSelected => 
            prevSelected.includes(playerId) ? prevSelected.filter((id) => id !== playerId ) 
            : [...prevSelected, playerId]))
    };

    const handleSubmit = () => {
        return(selectedPlayers, selectedGame);
    };
    
    return(
        <>
        <article className={`container d-flex flex-column justify-content-center align-items-center ${completeSelection ? 'd-none' : '' }`}>

            <div className='glass-card card-selector'>
                <span></span>
                <Accordion className="accordion-selector" defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                    <Accordion.Header><div className="custom-acc-header">Select Game</div></Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            {Object.keys(gamesData)
                            .filter(gameKey => gameKey !== 'general')
                            .map((gameKey) => (
                            <label key={gameKey} className={`select-game-label ${selectedGame.includes(gameKey) ? 'selected-player' : ''}`}>
                                <li>
                                    <input type="radio" 
                                    name='game' 
                                    value={gameKey}
                                    onChange={() => setSelectedGame(gameKey)}
                                    hidden/>
                                    {gameKey}
                                </li>
                            </label>
                            ))}
                        </ul>
                    </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                    <Accordion.Header>Select Player</Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <ul>
                                {players.map((player) => (
                                    <label key={player.id} className={`select-game-label ${selectedPlayers.includes(player.id) ? 'selected-player' : ''}`}>
                                        <li >
                                            <h5>{player.nombre}</h5>
                                            <input type='checkbox'
                                            hidden
                                            checked={selectedPlayers.includes(player.id)}
                                            onChange={() => handleSelect(player.id)}></input>
                                        </li>
                                    </label>
                                ))}
                            </ul>
                        </div>
                    </Accordion.Body>
                    </Accordion.Item>
                    
                </Accordion>
                <button className='my-selector-button' disabled={!selectedGame || selectedPlayers.length < 2 } onClick={() => {handleSubmit(), setCompleteSelection(true)}}>CONFIRMAR SELECCIÓN</button>
            </div>

        </article>
        </>
    )

}