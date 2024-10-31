import { atom, selector } from 'recoil';
import axios from '../api/axiosInstance';

export const authAtom = atom({
    key: 'authState',
    default: {
        isAuthenticated: false,
        user: null,
    },
});

// Selector to check authentication status on app load
export const authCheckSelector = selector({
    key: 'authCheckSelector',
    get: async () => {
        try {
            const {data} = await axios.get('/user/auth-check');
            if (data.isAuthenticated) {
                return { isAuthenticated: true, user: data.user };
            }else{
                return {isAuthenticated: false, user: null}
            }
        } catch (error) {
            // console.error('Auth check failed', error);
            return { isAuthenticated: false, user: null };
        }
    },
    set: ({ set }, newValue) => {
        set(authAtom, newValue);
    },
});
