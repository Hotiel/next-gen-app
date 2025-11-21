import React from 'react'
import { useState, useEffect, } from 'react';
import { generarTablaFinal } from '../../../public/data/utils/calcs';
import HomeLogin from '../utils/loginmodals/HomeLogin';
import HomeFeed from '../UI/HomeFeed';

export function Home () {

    const [tablaFinal, setTablaFinal] = useState(null);
    
    useEffect(() => {
        async function fletchData() {
            try {
                const tabla = await generarTablaFinal();
                setTablaFinal(tabla);
            }catch (error) {
                console.error('🟥 Error cargando datos:', error);
            }
        }
        fletchData();
    }, [])

    useEffect(() => {
            document.title = "Home — Next Gen";
        }, []);
    

    return (
    <> 
        <section className='container text-center'>
            
            <h1>Next Gen</h1>
            
            <div className="podium-container container mt-5 border border-secondary-subtle rounded-2">
                <h3 className='mt-4'>El podio</h3>
                <article className="d-flex justify-content-center align-items-end gap-3 mt-5 mb-1">
                
                <div className="d-flex flex-column align-items-center w-25">
                    <p className="mb-2 fw-medium fs-6 text">{tablaFinal? tablaFinal[2].nombre : <span className='podium-name-hold'>cargando datos... </span>} 🥉</p>
                    <div className="podium rounded-top w-100" style={{ minHeight: "75px" }}></div>
                </div>
            
                <div className="d-flex flex-column align-items-center w-25">
                    <p className="mb-2 fw-medium fs-4 text">{tablaFinal? tablaFinal[0].nombre : <span className='podium-name-hold'>cargando datos... </span>} 🥇</p>
                    <div className="podium rounded-top w-100" style={{ minHeight: "150px" }}></div>
                </div>
            
                <div className="d-flex flex-column align-items-center w-25">
                    <p className="mb-2 fw-medium fs-5 text">{tablaFinal? tablaFinal[1].nombre : <span className='podium-name-hold'>cargando datos... </span>} 🥈</p>
                    <div className="podium rounded-top w-100 h-100" style={{ minHeight: "100px" }}></div>
                </div>
            
                </article>
            </div>

            <div className='container mt-3 p-1 border border-secondary-subtle rounded-2 d-flex flex-wrap justify-content-xl-evenly home-feed'>
                {tablaFinal ? (
                <article className=' p-2 border border-secondary-subtle rounded-2 m-1 home-feed-item'>
                    <div className='table-responsive-sm mw-100'>
                    <table className="home-table table table-dark mw-100">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Eficacia</th>
                                <th scope="col">Puntos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tablaFinal.slice(0, 5).map((player, index) => (
                                <tr key={player.nombre}>
                                    <th>{index + 1}</th>
                                    <td>{player.nombre}</td>
                                    <td>{player.eficacia}</td>
                                    <td>{player.puntos}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>

                </article> ) : (
                    <section className='container text-center p-2 border border-secondary-subtle rounded-2 m-1 home-feed-item'>
                        <h5 className='mt-2'>Tabla de posiciones</h5>
                        <div className='cargando-datos'>
                            <div className="spinner-border text-info m-3" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div><p>CARGANDO DATOS...</p>
                    </div>
                    </section>
                )}

                <aside className='p-2 border border-neon rounded-2 m-1 home-feed-item'>
                    <HomeFeed/>
                </aside>
            </div>
        </section>
    </>
    
    )
}