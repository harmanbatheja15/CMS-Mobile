import axios from 'axios';
import { BASE_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchCourseContent = async () => {
    try {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {
            throw new Error('User data not found');
        }
        const token = await AsyncStorage.getItem('token');

        const response = await axios.get(`${BASE_URL}/courses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default fetchCourseContent;
