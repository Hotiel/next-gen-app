import { useState, useEffect, } from 'react';
import { arrayToGamesObject } from '../../../public/data/utils/transformGamesArray'
import { generarTablaFinal } from '../../../public/data/utils/calcs';

export function Table() {

    const [tablaFinal, setTablaFinal] = useState(null);
    const [storedGames, setStoredGames] = useState(null);
    
    useEffect(() => {
        async function fletchData() {
            try {
                const resGames = await fetch(`${import.meta.env.VITE_API_URL}/api/games`);
                const games = await resGames.json();
                
                const tabla = await generarTablaFinal();
                setStoredGames(arrayToGamesObject(games));
                setTablaFinal(tabla);
            }catch (error) {
                console.error('🟥 Error cargando datos:', error);
            }
        }
        fletchData();
    }, [])

    useEffect(() => {
            document.title = "Table — Next Gen";
        }, []);
    

    if (!tablaFinal || !storedGames){
        return (
            
            <section className='container text-center'>
                <h2 className='mt-2'>Tabla de posiciones</h2>
                    <div className='cargando-datos'>
                        <div className="spinner-border text-info m-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </div><p>CARGANDO DATOS...</p>
                    </div>
            </section>
        );
    }
    return (
        <>
        <section className='container text-center'>
        <h2 className='mt-2'>Tabla de posiciones</h2>

        <div className='my-4'><p className='fs-4'> {`Torneos totales: ${storedGames.general.totalGames} || Ultimo torneo ${new Date (storedGames.general.ultimoTorneo).toLocaleString()}`} </p></div>

        <article className='container mt-3 p-2 py-4 border border-secondary-subtle rounded-2 d-flex justify-content-evenly'>
            <div className='table-responsive rounded-2'>
                <table className="table table-dark text-center fulltable">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Eficacia</th>
                            <th scope="col">Presencia</th>
                            <th scope="col">Puntos</th>
                            <th scope="col">Ganados</th>
                            <th scope="col">Jugados</th>
                            <th scope="col">EMPATOS</th>
                            <th scope="col" colSpan="2" className='table-active'>PES</th>
                            <th scope="col" colSpan="2">Patojuego</th>
                            <th scope="col" colSpan="2" className='table-active'>Padel</th>
                            <th scope="col" colSpan="2">Otros</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tablaFinal.map((player, index) => (
                            <tr key={player.nombre}>
                                <th>{index + 1}</th>
                                <td>{player.nombre}</td>
                                <td>{player.eficacia}</td>
                                <td>{player.presencia}</td>
                                <td>{player.puntos}</td>
                                <td>{player.totalGanados}</td>
                                <td>{player.totalJugados}</td>
                                <td>{player.empates}</td>
                                <td colSpan="2" className='table-active'>G: {player.pes.win} | J: {player.pes.tot}</td>
                                <td colSpan="2">G: {player.patojuego.win} | J: {player.patojuego.tot}</td>
                                <td colSpan="2" className='table-active'>G: {player.padel.win} | J: {player.padel.tot}</td>
                                <td colSpan="2">G: {player.otros.win} | J: {player.otros.tot}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </article>
</section>
        </>
    );
}

