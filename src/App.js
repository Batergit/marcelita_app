import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import Login from './components/Login';
import PortalAdministrador from './components/PortalAdministrador';

const App = () => {
    const [log, setLog] = useState(false)

    return (
        <>
            <Routes>
                <Route path="/*" element={<Inicio />} />
                <Route path="/portal-administrador" element={log === false ? <Login setLog={setLog} /> : <PortalAdministrador setLog={setLog} />} />
            </Routes>
        </>
    );
}
 
export default App;