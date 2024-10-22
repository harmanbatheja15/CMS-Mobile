import { NavigationContainer } from '@react-navigation/native';
import Courses from './src/Tabs/Courses';
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

export type RootStackParamList = {
    Landing: undefined;
    Login: undefined;
    BottomTabs: undefined;
    Courses: undefined;
    FolderView: undefined;
    FileView: undefined;
    VideoPlayer: undefined;
    Lectures: undefined;
    Slides: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    return (
        <NavigationContainer>
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
        </NavigationContainer>
    );
};

const App = () => {
    return (
        <RecoilRoot>
            <Navigation />
        </RecoilRoot>
    );
};

export default App;
