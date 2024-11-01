import './App.css';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { Route, Routes } from 'react-router-dom';
import NoMatch from './pages/NoMatch.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ViewCard from './pages/ViewCard.jsx';
import { useAuth } from "./hooks/useAuth.js";
import { useState, useEffect } from "react";
import  {useRecoilValue} from "recoil";
import {authAtom} from "./atoms/authAtom.js";

function App() {
    const [loading, setLoading] = useState(false);
    const {isAuthenticated} = useRecoilValue(authAtom);
    const { checkAuth } = useAuth();

    useEffect(() => {
        const authenticate = async () =>{
            await checkAuth();
        }

        authenticate();
        setLoading(true);
    }, []);

    if(!loading){
        return <h1>Loading...</h1>
    }

    return (
        <>
            <Header />
            <Routes>
                <Route path="/sign-in" element={
                    isAuthenticated ? <Dashboard/> : <Login />
                } />

                <Route path="/register" element={
                    isAuthenticated ? <Dashboard/> : <Register />
                } />

                <Route path="/" element={
                    isAuthenticated ? <Dashboard/> : <Login />
                } />
                <Route path="/list" element={
                        isAuthenticated ? <ViewCard />: <Login/>
                } />

                <Route path="*" element={<NoMatch />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
