import './App.css';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { Route, Routes } from 'react-router-dom';
import NoMatch from './pages/NoMatch.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ViewCard from './pages/ViewCard.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from "./hooks/useAuth.js";
import { useEffect } from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {authAtom} from "./atoms/authAtom.js";

function App() {
    const {isAuthenticated} = useRecoilValue(authAtom);
    const { checkAuth } = useAuth();

    return (
        <>
            <Header />
            <Routes>
                <Route path="/sign-in" element={
                    // <ProtectedRoute>
                        <Login />
                    // </ProtectedRoute>
                } />

                <Route path="/register" element={
                    // <ProtectedRoute>
                        <Register />
                    // </ProtectedRoute>
                } />

                {/* Protected Routes */}
                <Route path="/" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/list" element={
                    <ProtectedRoute>
                        <ViewCard />
                    </ProtectedRoute>
                } />

                {/* Fallback Route */}
                <Route path="*" element={<NoMatch />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
