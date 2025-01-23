import { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    Alert,
} from 'react-native';
import { themeAtom } from '../atoms';
import { useRecoilValue } from 'recoil';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../config';

const DownloadedSlides = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    const [slides, setSlides] = useState<string>('');

    return (
        <ScrollView
            className={`${isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'}`}
            showsVerticalScrollIndicator={false}
        >
            <View className={`py-4 px-2 space-y-4`}>
                <TouchableOpacity activeOpacity={0.7}>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'bg-[#0F172A] border-[#1E293B]'
                                : 'bg-[#F1F5F9] border-[#E2E8F0]'
                        } flex flex-row items-center justify-between p-4 rounded-lg border`}
                    >
                        <View className="flex flex-row items-center w-[60%]">
                            <View
                                className={`${
                                    isDarkTheme
                                        ? 'border-[#1E293B]'
                                        : 'border-[#E2E8F0]'
                                } border p-4 mr-3 rounded-md`}
                            >
                                <Image
                                    source={require('../assets/file-icon.png')}
                                    className="w-6 h-6"
                                />
                            </View>
                            <View>
                                <Text
                                    className={`${
                                        isDarkTheme
                                            ? 'text-[#F8FAFC]'
                                            : 'text-[#020817]'
                                    } text-sm`}
                                >
                                    HTML Introduction
                                </Text>
                            </View>
                        </View>
                        <View className="flex flex-row gap-2">
                            <Image
                                source={require('../assets/download-icon.png')}
                                className="w-10 h-10"
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default DownloadedSlides;
