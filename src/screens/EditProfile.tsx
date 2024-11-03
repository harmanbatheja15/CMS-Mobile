import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Platform } from 'react-native';
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

const EditProfile = () => {
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
                {/* Name Field */}
                <View>
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                        }`}
                    >
                        Name
                    </Text>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'border-[#1E293B]'
                                : 'border-[#E2E8F0]'
                        } flex flex-row items-center border rounded-lg my-2 px-4 ${
                            Platform.OS === 'ios' ? 'py-2' : 'py-0'
                        }`}
                    >
                        <TextInput
                            placeholder="Enter Name"
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

                {/* Email Field */}
                <View className="mt-4 mb-2">
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                        }`}
                    >
                        Email
                    </Text>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'border-[#1E293B]'
                                : 'border-[#E2E8F0]'
                        } flex flex-row items-center border rounded-lg my-2 px-4 ${
                            Platform.OS === 'ios' ? 'py-2' : 'py-0'
                        }`}
                    >
                        <TextInput
                            placeholder="Enter Email"
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

                {/* Phone Number Field */}
                <View className="mt-4 mb-2">
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                        }`}
                    >
                        Phone Number
                    </Text>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'border-[#1E293B]'
                                : 'border-[#E2E8F0]'
                        } flex flex-row items-center border rounded-lg my-2 px-4 ${
                            Platform.OS === 'ios' ? 'py-2' : 'py-0'
                        }`}
                    >
                        <TextInput
                            placeholder="Enter Phone Number"
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
                        Update Profile
                    </Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
};

export default EditProfile;
