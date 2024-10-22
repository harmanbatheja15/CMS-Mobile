import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import {
    GestureHandlerRootView,
    ScrollView,
    TextInput,
} from 'react-native-gesture-handler';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';

type NavigationProps = NavigationProp<RootStackParamList>;

const Login = () => {
    const navigation = useNavigation<NavigationProps>();
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';

    return (
        <GestureHandlerRootView className="flex flex-1">
            <View
                className={`${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                } h-screen px-4 py-2`}>
                <View className="flex flex-row items-center mb-7">
                    <View className="space-y-2">
                        <Text
                            className={`${
                                isDarkTheme
                                    ? 'text-[#F8FAFC]'
                                    : 'text-[#020817]'
                            } text-2xl font-bold`}>
                            Login Now
                        </Text>
                        <Text
                            className={`${
                                isDarkTheme
                                    ? 'text-[#94A3B8]'
                                    : 'text-[#64748B]'
                            } text-sm`}>
                            Log in to access your coding cohorts and continue
                            your journey.
                        </Text>
                    </View>
                </View>

                {/* Email/Phone Field */}
                <View>
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                        }`}>
                        Email ID / Phone no.
                    </Text>
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
                            placeholder="Enter Email ID / Phone no."
                            placeholderTextColor={
                                isDarkTheme ? '#94A3B8' : '#64748B'
                            }
                            className={`${
                                isDarkTheme
                                    ? 'text-[#94A3B8]'
                                    : 'text-[#64748B]'
                            } w-full`}
                        />
                    </View>
                </View>

                {/* Password Field */}
                <View className="mt-4 mb-2">
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                        }`}>
                        Password
                    </Text>
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
                            placeholder="Enter Password"
                            placeholderTextColor={
                                isDarkTheme ? '#94A3B8' : '#64748B'
                            }
                            className={`${
                                isDarkTheme
                                    ? 'text-[#94A3B8]'
                                    : 'text-[#64748B]'
                            } w-full`}
                        />
                    </View>
                </View>

                <Text
                    className={`${
                        isDarkTheme ? 'text-[#4E7AFF]' : 'text-[#3259E8]'
                    }`}>
                    Forgot Password?
                </Text>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('BottomTabs')}
                    className="mt-8">
                    <Text
                        className={`bg-[#3259E8] text-[#FFFFFF] rounded-2xl py-4 px-6 text-center`}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
};

export default Login;
