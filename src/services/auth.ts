import axios from 'axios';
import { BASE_URL, AUTH_KEY } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    message: string;
    data?: {
        user: {
            id: string;
            email: string;
            name: string;
        };
        token: string;
    };
}

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Auth-Key': AUTH_KEY,
    },
});

export const authService = {
    // Login function
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        try {
            const response = await api.post<LoginResponse>(
                '/signin',
                credentials,
            );
            return response.data;
        } catch (error: any) {
            return error.message;
        }
    },
    // Set auth token
    setAuthToken: async (token: string | null) => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `${token}`;
            await AsyncStorage.setItem('token', token);
        } else {
            delete api.defaults.headers.common['Authorization'];
            await AsyncStorage.removeItem('token');
        }
    },

    // Clear auth token
    clearAuthToken: async () => {
        delete api.defaults.headers.common['Authorization'];
        await AsyncStorage.removeItem('token');
    },
};
