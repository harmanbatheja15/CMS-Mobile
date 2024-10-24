import { useEffect, useState } from 'react';
import { Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRecoilState, useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Logout from '../BottomSheets/Logout';

export type StackParamList = {
    Account: undefined;
    EditProfile: undefined;
    ChangePassword: undefined;
};

type NavigationProps = NavigationProp<StackParamList>;

const Stack = createNativeStackNavigator<StackParamList>();

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
            }}>
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
    const [isLogoutSheetVisible, setIsLogoutSheetVisible] = useState(false);
    const navigation = useNavigation<NavigationProps>();
    const [theme, setTheme] = useRecoilState(themeAtom);
    const isDarkTheme = theme === 'dark';
    const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState(
        isDarkTheme ? true : false,
    );
    const toggleSwitch = () =>
        setIsDarkThemeEnabled(previousState => !previousState);

    setTheme(isDarkThemeEnabled ? 'dark' : 'light');

    return (
        <View
            className={`${
                isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
            } p-4 h-screen`}>
            <View className="flex flex-row items-center justify-between">
                <Text
                    className={`${
                        isDarkTheme ? 'text-[#fff]' : 'text-[#020817]'
                    } text-xl font-bold`}>
                    My Account
                </Text>
                <View className="flex flex-row items-center justify-center">
                    <Switch
                        trackColor={{ false: '#767577', true: '#3259E8' }}
                        thumbColor={isDarkThemeEnabled ? '#fff' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isDarkThemeEnabled}
                    />
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#fff]' : 'text-[#020817]'
                        } ml-3`}>
                        Dark Mode
                    </Text>
                </View>
            </View>
            <View className="gap-2 my-6">
                <Text
                    className={`${
                        isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                    } font-bold text-center`}>
                    Harman Batheja
                </Text>
                <Text
                    className={`${
                        isDarkTheme ? 'text-[#94A3B8]' : 'text-[#64748B]'
                    } font-medium text-center`}>
                    harmanbatheja15@gmail.com
                </Text>
            </View>

            <View className="space-y-4">
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('EditProfile')}>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'bg-[#0F172A] border-[#1E293B]'
                                : 'bg-[#E2E8F0] border-[#E2E8F0]'
                        } flex flex-row items-center justify-between border p-4 rounded-2xl`}>
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
                                }`}>
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
                    onPress={() => navigation.navigate('ChangePassword')}>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'bg-[#0F172A] border-[#1E293B]'
                                : 'bg-[#E2E8F0] border-[#E2E8F0]'
                        } flex flex-row items-center justify-between border p-4 rounded-2xl`}>
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
                                }`}>
                                Change Password
                            </Text>
                        </View>
                        <Image
                            source={require('../assets/chevron-right-icon.png')}
                            className="w-6 h-6 mr-3"
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'bg-[#0F172A] border-[#1E293B]'
                                : 'bg-[#E2E8F0] border-[#E2E8F0]'
                        } flex flex-row items-center justify-between border p-4 rounded-2xl`}>
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
                                }`}>
                                Terms & Conditions
                            </Text>
                        </View>
                        <Image
                            source={require('../assets/chevron-right-icon.png')}
                            className="w-6 h-6 mr-3"
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'bg-[#0F172A] border-[#1E293B]'
                                : 'bg-[#E2E8F0] border-[#E2E8F0]'
                        } flex flex-row items-center justify-between border p-4 rounded-2xl`}>
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
                                }`}>
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
                    onPress={() => setIsLogoutSheetVisible(true)}>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'bg-[#0F172A] border-[#1E293B]'
                                : 'bg-[#E2E8F0] border-[#E2E8F0]'
                        } flex flex-row items-center justify-between border p-4 rounded-2xl`}>
                        <View className="flex flex-row items-center justify-center">
                            <Image
                                source={require('../assets/logout-icon.png')}
                                className="w-6 h-6 mr-3"
                            />
                            <Text className="text-[#DD503F]">Logout</Text>
                        </View>
                        <Image
                            source={require('../assets/chevron-right-red-icon.png')}
                            className="w-6 h-6 mr-3"
                        />
                    </View>
                </TouchableOpacity>
                {/* {isLogoutSheetVisible && <Logout />} */}
            </View>
        </View>
    );
};

const Account = () => {
    return <AccountNavigation />;
};

export default Account;
