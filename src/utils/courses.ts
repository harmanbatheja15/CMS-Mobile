import axios from 'axios';
import { BASE_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchUserCourses = async () => {
    try {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {
            throw new Error('User data not found');
        }
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            throw new Error('Authentication token not found');
        }

        const response = await axios.get(`${BASE_URL}/courses`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching courses', error);
        throw error;
    }
};

export default fetchUserCourses;
