// src/components/ProtectedRoute.js
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../atoms/authAtom';
import {useEffect} from "react";
import {useAuth} from "../hooks/useAuth.js";

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useRecoilValue(authAtom);
    const location = useLocation(); // Import useLocation to get the current pathname
    const {checkAuth}  = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = () => {
            return new Promise(async (resolve, reject) => {
                try{
                    await checkAuth();
                    resolve();
                }catch (e) {
                    reject();
                }
            })
        };

        authenticate().then(() => {
            console.log("Authentication check complete");
        }).catch((error) => {
            navigate("/sign-in");
        });
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children: null;
}

export default ProtectedRoute;
