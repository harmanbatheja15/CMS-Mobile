import { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import Courses from './Courses';
import Downloads from './Downloads';
import Bookmarks from './Bookmarks';
import History from './History';
import { Text, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import AccountScreen from './Account';

const BottomTabs = () => {
    const { getUserData } = useAuth();
    const theme = useRecoilValue(themeAtom);
    const [username, setUsername] = useState<string | null>('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserData();
                const username =
                    (userData && userData?.name.split(' ')[0]) || 'User';
                setUsername(username);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

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
                    // height: 60,
                    // borderTopLeftRadius: 10,
                    // borderTopRightRadius: 10,
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
            })}
        >
            <Tab.Screen
                name="My Courses"
                component={Courses}
                options={{
                    tabBarLabelStyle: {
                        paddingBottom: 10,
                    },
                    header: () => (
                        <View
                            className={`${
                                isDarkTheme ? 'bg-[#000]' : 'bg-[#fff]'
                            } p-4`}
                        >
                            <View className="flex flex-row items-center">
                                <View
                                    className={`${
                                        isDarkTheme
                                            ? 'bg-[#0F172A]'
                                            : 'bg-[#F1F5F9]'
                                    } w-12 h-12 rounded-full items-center justify-center`}
                                >
                                    <Text
                                        className={`${
                                            isDarkTheme
                                                ? 'text-[#94A3B8]'
                                                : 'text-[#64748B]'
                                        } font-medium text-base`}
                                    >
                                        HB
                                    </Text>
                                </View>
                                <Text
                                    className={`${
                                        isDarkTheme
                                            ? 'text-[#F8FAFC]'
                                            : 'text-[#020817]'
                                    } font-bold text-xl ml-2`}
                                >
                                    Hi, {username}
                                </Text>
                            </View>
                            <Text
                                className={`${
                                    isDarkTheme
                                        ? 'text-[#F8FAFC]'
                                        : 'text-[#020817]'
                                } font-bold mt-4 text-2xl`}
                            >
                                My Courses
                            </Text>
                        </View>
                    ),
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
                component={AccountScreen}
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
