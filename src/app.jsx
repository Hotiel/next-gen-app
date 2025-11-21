import { Route, Routes } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";

import { Home } from './components/routes/Home.jsx';
import { Table } from './components/routes/Table.jsx';
import { Fixture } from './components/routes/Fixture.jsx';
import { Menu } from './components/UI/Menu.jsx';
import { LoadingScreen } from './components/utils/LoadingScreen.jsx';
import { Profile } from './components/routes/Profile.jsx';
import { Feed } from './components/routes/Feed.jsx'
import { LoginModal } from './components/UI/LoginModal.jsx';
import { Footer } from './components/UI/Footer.jsx';

export function App () {

    const [loginModal, setLoginModal] = useState(false);
    
    return (
        <>
            
            <Menu setLoginModal={ setLoginModal }/>
            {<LoadingScreen />}
            {loginModal ? <LoginModal onClose={() => setLoginModal(prevLoginModal => !prevLoginModal)}/> : ""}
            <div className='main-container'>
            <main className='container min-vw-100 min-vh-100 pt-4 bg-black text-white'>
                <Routes>
                    <Route path='/' element= { <Home/> } />
                    <Route path='/Table' element={ <Table/> } />
                    <Route path='/Feed' element={ <Feed/>} />
                    <Route path='/Fixture' element={ <Fixture/> } />
                    <Route path='/Profile' element={ <Profile/> } />
                </Routes>
            </main>
            <footer className='footer-container'><Footer/></footer>
            </div>
            <div className='neon-background'></div>
        </>
    );
}