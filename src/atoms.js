import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'recoil';

export const themeAtom = atom({
    key: 'themeAtom',
    default: 'dark',
});

export const userAtom = atom({
    key: 'userAtom',
    default: {
        id: '',
        name: '',
        email: '',
    },
});

export const coursesAtom = atom({
    key: 'coursesAtom',
    default: [],
});
