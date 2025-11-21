import { useState, useEffect } from 'react';
import { TournamentFlow } from '../utils/fixtureComponents/TournamentFlow.jsx'

export function Fixture() {

    useEffect(() => {
                document.title = "Fixture — Next Gen";
            }, []);

    return (
        <>
        
        <div className='neon-background'></div>
        
        <section className='container fixture-container mb-4 text-center'>
        
        <h2 className='my-4 fixture-title'>Fixture</h2>

        <TournamentFlow/>


        </section>
        </>
    );
}