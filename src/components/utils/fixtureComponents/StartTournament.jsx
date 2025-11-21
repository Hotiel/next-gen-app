import { React, useState } from "react";

export function StartTournament({ started, setStarted}) {
    
    return(
        <>
        <article className={`container d-flex justify-content-center align-items-center ${started ? 'd-none' : '' }`}>
            
            <div className='glass-card card-start'>
                <button className="glitch-button start-button" onClick={() => setStarted(true)}>
                    <span></span>
                    <h3>START</h3>
                </button>
            </div>
        </article>
        </>
    )

}
