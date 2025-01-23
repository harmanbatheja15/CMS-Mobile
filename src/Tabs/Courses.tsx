import { useCallback, useState } from 'react';
import {
    View,
    TextInput,
    Image,
    RefreshControl,
    ScrollView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import CourseCard from '../components/CourseCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FlashList } from '@shopify/flash-list';
import fetchUserCourses from '../utils/courses';
import { Course } from '../services/types';
import { Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';

const Courses = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    const [refreshing, setRefreshing] = useState(false);

    const {
        data: courses,
        isLoading,
        error,
        refetch,
        isRefetching,
    } = useQuery({
        queryKey: ['courses'],
        queryFn: fetchUserCourses,
    });

    const onRefresh = useCallback(() => {
        refetch();
    }, [refetch]);

    if (isLoading) {
        return (
            <View
                className={`${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                } p-4 flex flex-1 justify-center items-center`}
            >
                <ActivityIndicator />
            </View>
        );
    }

    if (error) {
        return (
            <View
                className={`${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                } p-4 flex flex-1 justify-center items-center`}
            >
                <Text
                    className={`${
                        isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                    } text-center text-base`}
                >
                    An error occurred.
                </Text>
            </View>
        );
    }

    const NoCourseContent = () => {
        return (
            <View
                className={`${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                } p-4 flex flex-1 justify-center items-center`}
            >
                <View
                    className={`${
                        isDarkTheme ? 'border-[#1E293B]' : 'border-[#E2E8F0]'
                    } w-full h-full flex items-center justify-center border rounded-2xl p-6 gap-2`}
                >
                    <Image source={require('../assets/info-icon.png')} />
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                        } text-center text-base`}
                    >
                        Purchase Required
                    </Text>
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#94A3B8]' : 'text-[#64748B]'
                        } text-center text-xs`}
                    >
                        You haven't purchased a course yet.
                    </Text>
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#94A3B8]' : 'text-[#64748B]'
                        } text-center text-xs`}
                    >
                        Visit our website to explore and buy one.
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <GestureHandlerRootView
            className={`${
                isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
            } flex flex-1`}
        >
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}
            >
                <View
                    className={`px-4 py-2 h-full ${
                        isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                    }`}
                >
                    {/* Search Field */}
                    <View
                        className={`${
                            isDarkTheme
                                ? 'border-[#1E293B]'
                                : 'border-[#E2E8F0]'
                        } flex flex-row items-center border rounded-lg mb-4 px-4 ${
                            Platform.OS === 'ios' ? 'py-2' : 'py-0'
                        }`}
                    >
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
                    <FlashList
                        data={courses?.data}
                        estimatedItemSize={100}
                        ListEmptyComponent={<NoCourseContent />}
                        keyExtractor={(item: Course) => item.id.toString()}
                        renderItem={({ item }) => <CourseCard data={item} />}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefetching}
                                onRefresh={onRefresh}
                            />
                        }
                    />
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    );
};

export default Courses;
