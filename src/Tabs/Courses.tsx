import React from 'react';
import { View, TextInput, Image } from 'react-native';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import CourseCard from '../components/CourseCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COURSES_LIST } from '../data/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { FlashList } from '@shopify/flash-list';
import { Text } from 'react-native-svg';

type CoursesProps = NativeStackScreenProps<RootStackParamList, 'Courses'>;

const Courses = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';

    if (!COURSES_LIST || COURSES_LIST.length === 0) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>No folders available</Text>
            </View>
        );
    }

    return (
        <GestureHandlerRootView
            className={`${
                isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
            } flex flex-1`}>
            <View
                className={`px-4 py-2 h-full ${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                }`}>
                {/* Search Field */}
                <View
                    className={`${
                        isDarkTheme ? 'border-[#1E293B]' : 'border-[#E2E8F0]'
                    } flex flex-row items-center border rounded-lg my-4 px-4`}>
                    <Image
                        source={require('../assets/search-icon.png')}
                        className="w-6 h-6 mr-3"
                    />
                    <TextInput
                        placeholder="Search video..."
                        placeholderTextColor={isDarkTheme ? '#fff' : '#64748B'}
                        className={`${
                            isDarkTheme ? 'text-[#fff]' : 'text-[#64748B]'
                        } w-full`}
                    />
                </View>
                <FlashList
                    data={COURSES_LIST}
                    estimatedItemSize={100}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <CourseCard data={item} />}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </GestureHandlerRootView>
    );
};

export default Courses;
