import React from 'react';
import { View, TextInput, Image } from 'react-native';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import CourseCard from '../components/CourseCard';
import {
    GestureHandlerRootView,
    ScrollView,
} from 'react-native-gesture-handler';

const Courses = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';

    return (
        <GestureHandlerRootView
            className={`${
                isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
            } flex flex-1`}>
            <ScrollView>
                <View
                    className={`px-4 py-2 h-full ${
                        isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                    }`}>
                    {/* Search Field */}
                    <View
                        className={`${
                            isDarkTheme
                                ? 'border-[#1E293B]'
                                : 'border-[#E2E8F0]'
                        } flex flex-row items-center border rounded-lg my-2 px-4`}>
                        <Image
                            source={require('../assets/search-icon.png')}
                            className="w-6 h-6 mr-3"
                        />
                        <TextInput
                            placeholder="Search video..."
                            placeholderTextColor={
                                isDarkTheme ? '#fff' : '#64748B'
                            }
                            className={`${
                                isDarkTheme ? 'text-[#fff]' : 'text-[#64748B]'
                            } w-full`}
                        />
                    </View>
                    <CourseCard />
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    );
};

export default Courses;
