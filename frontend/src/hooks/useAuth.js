import { useRecoilState } from 'recoil';
import { authAtom } from '../atoms/authAtom';
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';
import {generateAKey, saveKey} from "../components/UtilityFunctions.jsx";
import {useNavigate} from "react-router-dom";

export const useAuth = () => {
    const [authState, setAuthState] = useRecoilState(authAtom);
    const navigate = useNavigate();

    const login = async (credentials) => {
        try {
            const {data} = await axios.post('/user/login', credentials);
            setAuthState({ isAuthenticated: true, user: data.user});
            toast.success('Logged in successfully');
            navigate("/");
        } catch (error) {
            toast.error('Login failed');
        }
    };

    const registerUser = async (details) => {
        try {
            const {data} = await axios.post('/user/register', details);
            setAuthState({ isAuthenticated: true, user: data.user});

            let aesKey = await generateAKey();
            const key = await saveKey(aesKey, data.user.email);
            console.log("Key generated and saved:", key);

            toast.success('Registered successfully');
            navigate("/");
        } catch (error) {
            toast.error('Registration failed');
        }
    };

    const logout = async () => {
        try {
            await axios.get('/user/logout');
            setAuthState({ isAuthenticated: false, user: null});
            toast.success('Logged out successfully');

            navigate("/sign-in");
        } catch (error) {
            toast.error('Logout failed');
        }
    };

    const checkAuth = async () => {
        try {
            const {data} = await axios.get('/user/auth-check');

            if(data.isAuthenticated){
                setAuthState({ isAuthenticated: true, user: data.user});
            }else{
                setAuthState({ isAuthenticated: false, user: null});
                toast.info(data.msg);
            }
        } catch (error) {
            setAuthState({ isAuthenticated: false, user: null});
        }
    };

    return { login, registerUser, logout, checkAuth, authState };
};
