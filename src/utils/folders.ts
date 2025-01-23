import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config';

export const fetchFolders = async (courseId: string | number) => {
    try {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {
            throw new Error('User data not found');
        }

        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token not found');
        }

        const response = await axios.get(`${BASE_URL}/courses/${courseId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching course content:', error);
        throw error;
    }
};
