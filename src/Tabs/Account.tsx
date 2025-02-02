import { useEffect, useState } from 'react';
import {
    Image,
    Switch,
    Text,
    TouchableOpacity,
    View,
    Linking,
    Alert,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRecoilState, useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import {
    GestureHandlerRootView,
    ScrollView,
} from 'react-native-gesture-handler';
import Logout from '../BottomSheets/Logout';
import { useAuth } from '../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config';

export type StackParamList = {
    Account: undefined;
    EditProfile: undefined;
    ChangePassword: undefined;
    Landing: undefined;
};

type NavigationProps = NavigationProp<StackParamList>;

const Stack = createNativeStackNavigator<StackParamList>();

const openTnC = async () => {
    try {
        const tncUrl = 'https://app.100xdevs.com/tnc';
        const canOpen = await Linking.canOpenURL(tncUrl);
        if (canOpen) {
            await Linking.openURL(tncUrl);
        } else {
            Alert.alert('Error', 'Cannot open this URL');
        }
    } catch (error) {
        Alert.alert('Error', 'Something went wrong while opening the URL');
    }
};

const openPrivacyPolicy = async () => {
    try {
        const privacyPolicyUrl = 'https://app.100xdevs.com/privacy-policy';
        const canOpen = await Linking.canOpenURL(privacyPolicyUrl);
        if (canOpen) {
            await Linking.openURL(privacyPolicyUrl);
        } else {
            Alert.alert('Error', 'Cannot open this URL');
        }
    } catch (error) {
        Alert.alert('Error', 'Something went wrong while opening the URL');
    }
};

const AccountNavigation = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    return (
        <Stack.Navigator
            initialRouteName="Account"
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
            }}
        >
            <Stack.Screen
                name="Account"
                component={AccountPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ title: 'Edit Profile' }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{ title: 'Change Password' }}
            />
        </Stack.Navigator>
    );
};

const AccountPage = () => {
    const [name, setName] = useState<string | null>('');
    const [email, setEmail] = useState<string | null>('');
    const { logout, getUserData } = useAuth();
    const [isLogoutSheetVisible, setIsLogoutSheetVisible] = useState(false);
    const navigation = useNavigation<NavigationProps>();
    const [theme, setTheme] = useRecoilState(themeAtom);
    const isDarkTheme = theme === 'dark';
    const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState(
        isDarkTheme ? true : false,
    );
    const toggleSwitch = () =>
        setIsDarkThemeEnabled(previousState => !previousState);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const userData = await getUserData();
                const name = userData && userData?.name;
                const email = userData && userData?.email;
                setName(name);
                setEmail(email);
            } catch (e) {
                console.log('error: ', e);
            }
        };
        fetchUsername();
    }, []);

    setTheme(isDarkThemeEnabled ? 'dark' : 'light');

    const handleLogout = async () => {
        await logout();
    };

    return (
        <GestureHandlerRootView
            className={`${
                isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
            } flex flex-1`}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    className={`${
                        isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                    } p-4 flex-1`}
                >
                    <View className="flex flex-row items-center justify-between">
                        <Text
                            className={`${
                                isDarkTheme ? 'text-[#fff]' : 'text-[#020817]'
                            } text-xl font-bold`}
                        >
                            My Account
                        </Text>
                        <View className="flex flex-row items-center justify-center">
                            <Switch
                                trackColor={{
                                    false: '#767577',
                                    true: '#3259E8',
                                }}
                                thumbColor={
                                    isDarkThemeEnabled ? '#fff' : '#f4f3f4'
                                }
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isDarkThemeEnabled}
                            />
                            <Text
                                className={`${
                                    isDarkTheme
                                        ? 'text-[#fff]'
                                        : 'text-[#020817]'
                                } ml-3`}
                            >
                                Dark Mode
                            </Text>
                        </View>
                    </View>
                    <View
                        className={`${
                            isDarkTheme ? 'bg-[#0F172A]' : 'bg-[#F1F5F9]'
                        } w-32 h-32 rounded-2xl flex items-center justify-center mx-auto mt-6`}
                    >
                        <Text
                            className={`${
                                isDarkTheme
                                    ? 'text-[#94A3B8]'
                                    : 'text-[#64748B]'
                            } font-bold text-xl`}
                        >
                            HB
                        </Text>
                    </View>
                    <View className="gap-2 mb-6 mt-2">
                        <Text
                            className={`${
                                isDarkTheme
                                    ? 'text-[#F8FAFC]'
                                    : 'text-[#020817]'
                            } font-bold text-center`}
                        >
                            {name}
                        </Text>
                        <Text
                            className={`${
                                isDarkTheme
                                    ? 'text-[#94A3B8]'
                                    : 'text-[#64748B]'
                            } font-medium text-center`}
                        >
                            {email}
                        </Text>
                    </View>

                    <View className="space-y-4">
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('EditProfile')}
                        >
                            <View
                                className={`${
                                    isDarkTheme
                                        ? 'bg-[#0F172A] border-[#1E293B]'
                                        : 'bg-[#E2E8F0] border-[#E2E8F0]'
                                } flex flex-row items-center justify-between border p-4 rounded-2xl`}
                            >
                                <View className="flex flex-row items-center justify-center">
                                    <Image
                                        source={require('../assets/user-icon.png')}
                                        className="w-6 h-6 mr-3"
                                    />
                                    <Text
                                        className={`${
                                            isDarkTheme
                                                ? 'text-[#F8FAFC]'
                                                : 'text-[#020817]'
                                        }`}
                                    >
                                        Edit Profile
                                    </Text>
                                </View>
                                <Image
                                    source={require('../assets/chevron-right-icon.png')}
                                    className="w-6 h-6 mr-3"
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() =>
                                navigation.navigate('ChangePassword')
                            }
                        >
                            <View
                                className={`${
                                    isDarkTheme
                                        ? 'bg-[#0F172A] border-[#1E293B]'
                                        : 'bg-[#E2E8F0] border-[#E2E8F0]'
                                } flex flex-row items-center justify-between border p-4 rounded-2xl`}
                            >
                                <View className="flex flex-row items-center justify-center">
                                    <Image
                                        source={require('../assets/lock-icon.png')}
                                        className="w-6 h-6 mr-3"
                                    />
                                    <Text
                                        className={`${
                                            isDarkTheme
                                                ? 'text-[#F8FAFC]'
                                                : 'text-[#020817]'
                                        }`}
                                    >
                                        Change Password
                                    </Text>
                                </View>
                                <Image
                                    source={require('../assets/chevron-right-icon.png')}
                                    className="w-6 h-6 mr-3"
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.7} onPress={openTnC}>
                            <View
                                className={`${
                                    isDarkTheme
                                        ? 'bg-[#0F172A] border-[#1E293B]'
                                        : 'bg-[#E2E8F0] border-[#E2E8F0]'
                                } flex flex-row items-center justify-between border p-4 rounded-2xl`}
                            >
                                <View className="flex flex-row items-center justify-center">
                                    <Image
                                        source={require('../assets/info-icon.png')}
                                        className="w-6 h-6 mr-3"
                                    />
                                    <Text
                                        className={`${
                                            isDarkTheme
                                                ? 'text-[#F8FAFC]'
                                                : 'text-[#020817]'
                                        }`}
                                    >
                                        Terms & Conditions
                                    </Text>
                                </View>
                                <Image
                                    source={require('../assets/chevron-right-icon.png')}
                                    className="w-6 h-6 mr-3"
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={openPrivacyPolicy}
                        >
                            <View
                                className={`${
                                    isDarkTheme
                                        ? 'bg-[#0F172A] border-[#1E293B]'
                                        : 'bg-[#E2E8F0] border-[#E2E8F0]'
                                } flex flex-row items-center justify-between border p-4 rounded-2xl`}
                            >
                                <View className="flex flex-row items-center justify-center">
                                    <Image
                                        source={require('../assets/shield-icon.png')}
                                        className="w-6 h-6 mr-3"
                                    />
                                    <Text
                                        className={`${
                                            isDarkTheme
                                                ? 'text-[#F8FAFC]'
                                                : 'text-[#020817]'
                                        }`}
                                    >
                                        Privacy Policy
                                    </Text>
                                </View>
                                <Image
                                    source={require('../assets/chevron-right-icon.png')}
                                    className="w-6 h-6 mr-3"
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            // onPress={() => setIsLogoutSheetVisible(true)}
                            onPress={handleLogout}
                        >
                            <View
                                className={`${
                                    isDarkTheme
                                        ? 'bg-[#0F172A] border-[#1E293B]'
                                        : 'bg-[#E2E8F0] border-[#E2E8F0]'
                                } flex flex-row items-center justify-between border p-4 rounded-2xl`}
                            >
                                <View className="flex flex-row items-center justify-center">
                                    <Image
                                        source={require('../assets/logout-icon.png')}
                                        className="w-6 h-6 mr-3"
                                    />
                                    <Text className="text-[#DD503F]">
                                        Logout
                                    </Text>
                                </View>
                                <Image
                                    source={require('../assets/chevron-right-red-icon.png')}
                                    className="w-6 h-6 mr-3"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {isLogoutSheetVisible && <Logout />}
        </GestureHandlerRootView>
    );
};

const Account = () => {
    return <AccountNavigation />;
};

export default Account;
