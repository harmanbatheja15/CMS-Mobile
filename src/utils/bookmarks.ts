import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config';

export const fetchBookmarks = async () => {
    try {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {
            throw new Error('User data not found');
        }
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            throw new Error('Authentication token not found');
        }

        const response = await axios.get(`${BASE_URL}/bookmarks`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching bookmarks', error);
        throw error;
    }
};

export const deleteBookmark = async (id: string) => {
    try {
        const token = await AsyncStorage.getItem('token');
        await axios.delete(`${BASE_URL}/bookmarks`, {
            data: { bookmarkId: id },
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
    } catch (error) {
        console.error('Error deleting bookmark', error);
        throw error;
    }
};
