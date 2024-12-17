import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ThemeProvider from './components/ThemeProvider'
import SiteHeader from './components/SiteHeader'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProfilePage from './pages/ProfilePage'
import ViewCardsPage from './pages/ViewCardsPage'
import NotFoundPage from './pages/NotFoundPage'
import { Loader } from './components/ui/Loader'
import { useAuth } from "./hooks/useAuth.js";
import  {useRecoilValue} from "recoil";
import {authAtom} from "./atoms/authAtom.js";
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

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
        return <Loader />
    }
    // const [loading, setLoading] = useState(true);

    // // Simulate loader finish after 5 seconds
    // useEffect(() => {
    //   const timer = setTimeout(() => setLoading(false), 5000);
    //   return () => clearTimeout(timer);
    // }, []);

    // return (
    //   <div>
    //     <Loader isLoading={loading} />
    //   </div>
    // );

    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <div className="min-h-screen bg-background font-sans antialiased">
                <SiteHeader />
                <Routes>
                    <Route path="/" element={isAuthenticated ? <HomePage />: <Login />} />
                    <Route path="/sign-in" element={
                        isAuthenticated ? <HomePage/> : <Login />
                    } />

                    <Route path="/register" element={
                        isAuthenticated ? <HomePage/> : <Register />
                    } />

                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/cards" element={ isAuthenticated ? <ViewCardsPage />: <Login/>} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </ThemeProvider>
    )
}

export default App


// import './App.css';
// import Login from './pages/Login.jsx';
// import Register from './pages/Register.jsx';
// import { Route, Routes } from 'react-router-dom';
// import NoMatch from './pages/NoMatch.jsx';
// import Header from './components/Header.jsx';
// import Footer from './components/Footer.jsx';
// import Dashboard from './pages/Dashboard.jsx';
// import ViewCard from './pages/ViewCard.jsx';
// import { useAuth } from "./hooks/useAuth.js";
// import { useState, useEffect } from "react";
// import  {useRecoilValue} from "recoil";
// import {authAtom} from "./atoms/authAtom.js";
// import SiteHeader from "./components/SiteHeader.jsx";
//
// function App() {
//     const [loading, setLoading] = useState(false);
//     const {isAuthenticated} = useRecoilValue(authAtom);
//     const { checkAuth } = useAuth();
//
//     useEffect(() => {
//         const authenticate = async () =>{
//             await checkAuth();
//         }
//
//         authenticate();
//         setLoading(true);
//     }, []);
//
//     if(!loading){
//         return <h1>Loading...</h1>
//     }
//
//     return (
//         <>
//             <Header />
//             <SiteHeader />
//             <Routes>
//                 <Route path="/sign-in" element={
//                     isAuthenticated ? <Dashboard/> : <Login />
//                 } />
//
//                 <Route path="/register" element={
//                     isAuthenticated ? <Dashboard/> : <Register />
//                 } />
//
//                 <Route path="/" element={
//                     isAuthenticated ? <Dashboard/> : <Login />
//                 } />
//                 <Route path="/list" element={
//                         isAuthenticated ? <ViewCard />: <Login/>
//                 } />
//
//                 <Route path="*" element={<NoMatch />} />
//             </Routes>
//             <Footer />
//         </>
//     );
// }
//
// export default App;
