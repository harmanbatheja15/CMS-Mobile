import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { authService } from '../services/auth';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { userAtom } from '../atoms';

type User = {
    id: string;
    email: string;
    name: string;
} | null;

type AuthState = {
    user: User;
    token: string | null;
};

type NavigationProps = NavigationProp<RootStackParamList>;

export const useAuth = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const navigation = useNavigation<NavigationProps>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        token: null,
    });

    // Load stored auth state
    useEffect(() => {
        const loadAuthState = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (token) {
                    authService.setAuthToken(token);
                    setAuthState(prev => ({ ...prev, token }));
                }
            } catch (error) {
                console.error('Error loading auth state:', error);
            }
        };

        loadAuthState();
    }, []);

    const handleLogin = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.login({ email, password });

            if (response.data) {
                const { token, user } = response.data;

                // Store token
                await AsyncStorage.setItem('authToken', token);
                authService.setAuthToken(token);

                setAuthState({ user, token });
                setUser(user);
                await AsyncStorage.setItem('userData', JSON.stringify(user));
                navigation.navigate('BottomTabs');
            }
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'An unexpected error occurred',
            );
            console.log('Login Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.removeItem('userData');
            authService.clearAuthToken();
            setAuthState({ user: null, token: null });
            setUser({
                id: '',
                email: '',
                name: '',
            });
            navigation.navigate('Landing');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleUserData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userData');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.log('Error reading data:', error);
            return null;
        }
    };

    return {
        isLoading,
        error,
        user: authState.user,
        token: authState.token,
        isAuthenticated: !!authState.token,
        login: handleLogin,
        logout: handleLogout,
        getUserData: handleUserData,
    };
};
