import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config';

export const fetchContent = async (
    courseId: string | number,
    collectionId: string | number,
) => {
    try {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {
            throw new Error('User data not found');
        }
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            throw new Error('Authentication token not found');
        }
        const folders = await axios.get(`${BASE_URL}/courses/${courseId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        const files = await axios.get(
            `${BASE_URL}/courses/${courseId}/${collectionId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            },
        );
        // const { data: data1 } = folders;
        // const { data: data2 } = files;
        // setFolders(data1.data);
        // setFiles(data2.data);
        return { folders: folders.data.data, files: files.data.data };
    } catch (error) {
        console.error('Error fetching course content:', error);
        throw error;
    }
};

export const addBookmark = async (id: string) => {
    const token = await AsyncStorage.getItem('token');
    await axios.post(
        `${BASE_URL}/bookmarks`,
        {
            contentId: id,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        },
    );
};

export const removeBookmark = async (id: string) => {
    const token = await AsyncStorage.getItem('token');
    await axios.delete(`${BASE_URL}/bookmarks/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    });
};
