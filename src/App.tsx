import React from 'react';
import './App.css';
import Sidecar from './components/sidecar/sidecar';
import { AuthProvider, UserManager } from 'oidc-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { About } from './pages/about/About';
import { BooksRessourcesList } from './pages/Book/BooksRessourcesList';
import { Basket } from './pages/basket/Basket';
import { BookDetails } from './pages/Book/BookDetails';

export const oidcConfig = {
    authority: 'http://localhost:8080/auth/realms/workshop/',
    redirectUri: window.location.origin,
    clientId: 'spa',
    responseType: 'code',
    loadUserInfo: true,
    scope: 'openid profile offline_access',
    useSilentRefresh: false,
    showDebugInformation: true,
};

function App() {
    return (
        <Sidecar>
            <AuthProvider {...oidcConfig}>
                <Routes>
                    <Route path="about" element={<About/>}/>
                    <Route path="books">
                        <Route index element={<BooksRessourcesList/>}/>
                        <Route path="details/:identifier" element={<BookDetails/>}/>
                    </Route>
                    <Route path="basket" element={<Basket/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </AuthProvider>
        </Sidecar>
    );
}

export default App;
