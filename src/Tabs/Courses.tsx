import React from 'react';
import { View, TextInput, Image, useColorScheme } from 'react-native';
import CourseCard from '../components/CourseCard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FolderView from '../screens/FolderView';
import FileView from '../screens/FileView';
import VideoPlayer from '../screens/VideoPlayer';
import {
    GestureHandlerRootView,
    ScrollView,
} from 'react-native-gesture-handler';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import Lectures from '../screens/Lectures';
import Login from '../screens/Login';
import Landing from '../screens/Landing';
import { RootStackParamList } from '../../App';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ListCourses = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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
                    <CourseCard />
                    <CourseCard />
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    );
};

const Courses = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    return (
        <>
            <Stack.Navigator
                initialRouteName="Landing"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: isDarkTheme ? '#020817' : '#FFFFFFF2',
                    },
                    headerTitleStyle: {
                        color: isDarkTheme ? '#F8FAFC' : '#020817',
                        fontSize: 18,
                        fontWeight: '700',
                    },
                    headerTintColor: isDarkTheme ? '#F8FAFC' : '#020817',
                }}>
                <Stack.Screen
                    name="Landing"
                    component={Landing}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Courses"
                    component={ListCourses}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="FolderView"
                    component={FolderView}
                    options={{ title: 'Folder View' }}
                />
                <Stack.Screen
                    name="FileView"
                    component={FileView}
                    options={{ title: 'File View' }}
                />
                <Stack.Screen
                    name="VideoPlayer"
                    component={VideoPlayer}
                    options={{ title: 'Video Player' }}
                />
                <Stack.Screen
                    name="Lectures"
                    component={Lectures}
                    options={{ title: 'Lectures' }}
                />
            </Stack.Navigator>
        </>
    );
};

export default Courses;
