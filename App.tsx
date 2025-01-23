import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Landing from './src/screens/Landing';
import Login from './src/screens/Login';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { themeAtom } from './src/atoms';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FolderView from './src/screens/FolderView';
import FileView from './src/screens/FileView';
import VideoPlayer from './src/screens/VideoPlayer';
import Lectures from './src/screens/Lectures';
import BottomTabs from './src/Tabs/BottomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export type RootStackParamList = {
    Landing: undefined;
    Login: undefined;
    BottomTabs: undefined;
    Courses: undefined;
    FolderView: { courseId: string | number };
    FileView: { courseId: string | number; collectionId: string | number };
    VideoPlayer: {
        courseId: string | number;
        collectionId: string | number;
        contentId: string | number;
    };
    Lectures: undefined;
    Slides: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const queryClient = new QueryClient();

const Navigation = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await AsyncStorage.getItem('token');
            setIsLoggedIn(token !== null);
        };
        checkLoginStatus();
    }, [isLoggedIn, AsyncStorage.getItem('token')]);

    if (isLoggedIn === null) {
        return null;
    }

    return (
        <NavigationContainer>
            <BottomSheetModalProvider>
                <Stack.Navigator
                    initialRouteName={isLoggedIn ? 'BottomTabs' : 'Landing'}
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: isDarkTheme
                                ? '#020817'
                                : '#FFFFFFF2',
                        },
                        headerTitleStyle: {
                            color: isDarkTheme ? '#F8FAFC' : '#020817',
                            fontSize: 18,
                            fontWeight: '700',
                        },
                        headerTintColor: isDarkTheme ? '#F8FAFC' : '#020817',
                    }}
                >
                    <Stack.Screen
                        name="Landing"
                        component={Landing}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ headerShown: true, title: 'Back' }}
                    />
                    <Stack.Screen
                        name="BottomTabs"
                        component={BottomTabs}
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
            </BottomSheetModalProvider>
        </NavigationContainer>
    );
};

const AppContent = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';

    return (
        <SafeAreaView
            className={`flex-1 ${isDarkTheme ? 'bg-[#000]' : 'bg-[#F1F5F9]'}`}
        >
            <Navigation />
        </SafeAreaView>
    );
};

const App = () => {
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <AppContent />
            </QueryClientProvider>
        </RecoilRoot>
    );
};

export default App;
