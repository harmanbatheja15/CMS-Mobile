import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import {
    GestureHandlerRootView,
    ScrollView,
} from 'react-native-gesture-handler';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';

type NavigationProps = NavigationProp<RootStackParamList>;

const Landing = () => {
    const navigation = useNavigation<NavigationProps>();
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';

    return (
        <GestureHandlerRootView className="flex flex-1">
            <ScrollView>
                <View
                    className={`${
                        isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                    } h-screen px-4 py-2`}>
                    <View className="w-full flex flex-row justify-center">
                        {isDarkTheme ? (
                            <Image
                                source={require('../assets/logo-dark.png')}
                            />
                        ) : (
                            <Image
                                source={require('../assets/logo-light.png')}
                            />
                        )}
                    </View>
                    {/* <View className="w-full h-full">
                        <Image
                            source={require('../assets/landing-image.png')}
                            className="w-full h-full"
                        />
                    </View> */}
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                        } font-bold text-2xl text-center`}>
                        Be a <Text className="text-[#3259E8]">100xDev</Text>{' '}
                        because 10x isn't enough
                    </Text>
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#94A3B8]' : 'text-[#64748B]'
                        } font-medium text-sm text-center`}>
                        Unlock your potential with coding cohorts. Learn,
                        collaborate, and grow beyond limits.
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Login')}
                        className="mt-8">
                        <Text
                            className={`bg-[#3259E8] text-[#FFFFFF] rounded-2xl py-4 px-6 text-center`}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Login')}
                        className="mt-8">
                        <Text
                            className={`${
                                isDarkTheme
                                    ? 'bg-[#020817] text-[#94A3B8] border-[#1E293B]'
                                    : 'bg-[#FFFFFF] text-[#64748B] border-[#E2E8F0]'
                            } border rounded-2xl py-4 px-6 text-center`}>
                            Sign Up Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    );
};

export default Landing;
