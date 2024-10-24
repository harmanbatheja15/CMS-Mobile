import React, { useEffect, useState } from 'react';
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

const ChangePassword = () => {
    const navigation = useNavigation<NavigationProps>();
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';

    return (
        <GestureHandlerRootView className="flex flex-1">
            <View
                className={`${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                } h-screen px-4 py-2`}
            >
                {/* Current Password Field */}
                <View>
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                        }`}
                    >
                        Current Password
                    </Text>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'border-[#1E293B]'
                                : 'border-[#E2E8F0]'
                        } flex flex-row items-center border rounded-lg my-2 px-4`}
                    >
                        <TextInput
                            placeholder="Enter Current Password"
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

                {/* New Password */}
                <View className="mt-4 mb-2">
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                        }`}
                    >
                        New Password
                    </Text>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'border-[#1E293B]'
                                : 'border-[#E2E8F0]'
                        } flex flex-row items-center border rounded-lg my-2 px-4`}
                    >
                        <TextInput
                            placeholder="Enter New Password"
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

                {/* New Password Field */}
                <View className="mt-4 mb-2">
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                        }`}
                    >
                        Confirm New Password
                    </Text>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'border-[#1E293B]'
                                : 'border-[#E2E8F0]'
                        } flex flex-row items-center border rounded-lg my-2 px-4`}
                    >
                        <TextInput
                            placeholder="Confirm New Password"
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

                <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
                    <Text
                        className={`bg-[#3259E8] text-[#FFFFFF] rounded-2xl py-4 px-6 text-center`}
                    >
                        Update Password
                    </Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
};

export default ChangePassword;
