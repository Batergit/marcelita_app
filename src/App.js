import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import PortalAdministrador from './components/PortalAdministrador';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/*" element={<Inicio />} />
                <Route path="/portal-administrador" element={<PortalAdministrador />} />
            </Routes>
        </>
    );
}
 
export default App;