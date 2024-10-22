import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import Courses from './Courses';
import Downloads from './Downloads';
import Bookmarks from './Bookmarks';
import History from './History';
import Account from './Account';
import CourseStack from './CourseStack';

const BottomTabs = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                // headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'My Courses':
                            iconName = 'play-circle-outline';
                            break;
                        case 'Downloads':
                            iconName = 'download';
                            break;
                        case 'Bookmarks':
                            iconName = 'bookmark';
                            break;
                        case 'History':
                            iconName = 'history';
                            break;
                        case 'Account':
                            iconName = 'person';
                            break;
                        default:
                            iconName = 'circle';
                    }

                    return (
                        <MaterialIcons
                            name={iconName}
                            size={24}
                            color={color}
                        />
                    );
                },
                tabBarStyle: {
                    backgroundColor: isDarkTheme ? '#000' : '#F1F5F9',
                    height: 60,
                    //   borderTopLeftRadius: 10,
                    //   borderTopRightRadius: 10,
                    borderTopWidth: 2,
                    borderTopColor: isDarkTheme ? '#1E293B' : '#E2E8F0',
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '500',
                },
                tabBarActiveTintColor: '#4E7AFF',
                tabBarInactiveTintColor: '#94A3B8',
                headerStyle: {
                    backgroundColor: isDarkTheme ? '#000' : '#F1F5F9',
                    elevation: 0, // for Android
                    shadowOpacity: 0, // for iOS
                    borderBottomWidth: 1,
                    borderBottomColor: isDarkTheme ? '#1E293B' : '#E2E8F0',
                },
                headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: '700',
                    color: isDarkTheme ? '#fff' : '#000',
                },
            })}>
            <Tab.Screen
                name="My Courses"
                component={CourseStack}
                options={{
                    tabBarLabelStyle: {
                        paddingBottom: 10,
                    },
                }}
            />
            <Tab.Screen
                name="Downloads"
                component={Downloads}
                options={{
                    tabBarLabelStyle: {
                        paddingBottom: 10,
                    },
                }}
            />
            <Tab.Screen
                name="Bookmarks"
                component={Bookmarks}
                options={{
                    tabBarLabelStyle: {
                        paddingBottom: 10,
                    },
                }}
            />
            <Tab.Screen
                name="History"
                component={History}
                options={{
                    tabBarLabelStyle: {
                        paddingBottom: 10,
                    },
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarLabelStyle: {
                        paddingBottom: 10,
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
