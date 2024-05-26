import { useState } from 'react'

import './App.css'

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {Route, Routes} from "react-router-dom";
import NoMatch from "./pages/NoMatch.jsx";
import ViewCard from "./pages/ViewCard.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route path="/sign-in" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/list" element={<ViewCard />}></Route>
            <Route path="*" element={<NoMatch />}></Route>
        </Routes>
    </>
  )
}

export default App
