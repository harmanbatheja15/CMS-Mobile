import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { themeAtom } from '../atoms';
import { useRecoilValue } from 'recoil';
import { ScrollView } from 'react-native-gesture-handler';

const Content = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';

    return (
        <ScrollView
            className={`border ${
                isDarkTheme
                    ? 'bg-[#020817] border-[#1E293B]'
                    : 'bg-[#FFFFFFF2] border-[#E2E8F0]'
            }`}
            showsVerticalScrollIndicator={false}
        >
            <View className={``}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                        setIsDropdownOpen(isDropdownOpen => !isDropdownOpen)
                    }
                >
                    <View
                        className={`${
                            isDarkTheme
                                ? 'bg-[#020817] border-[#1E293B]'
                                : 'bg-[#fff] border-[#E2E8F0]'
                        } flex flex-row items-center justify-between border-b py-6 px-4`}
                    >
                        <View>
                            <Text
                                className={`${
                                    isDarkTheme
                                        ? 'text-[#94A3B8]'
                                        : 'text-[#64748B]'
                                }`}
                            >
                                Week 1
                            </Text>
                            <Text
                                className={`${
                                    isDarkTheme
                                        ? 'text-[#94A3B8]'
                                        : 'text-[#64748B]'
                                }`}
                            >
                                0/3 Lectures
                            </Text>
                        </View>
                        <Image
                            source={require('../assets/chevron-down-icon.png')}
                            className="w-6 h-6"
                        />
                    </View>
                </TouchableOpacity>

                <View className={`${isDropdownOpen ? 'flex' : 'hidden'}`}>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'bg-[#64748B1A] border-[#1E293B]'
                                : 'bg-[#64748B1A] border-[#E2E8F0]'
                        } flex flex-row items-center justify-between border-b py-6 px-4`}
                    >
                        <View>
                            <Text
                                className={`${
                                    isDarkTheme
                                        ? 'text-[#94A3B8]'
                                        : 'text-[#64748B]'
                                }`}
                            >
                                Introduction to HTML
                            </Text>
                        </View>
                        <View className="flex flex-row items-center justify-center">
                            <Image
                                source={require('../assets/bookmark-icon.png')}
                                className="w-6 h-6"
                            />
                            <Image
                                source={require('../assets/bookmark-icon.png')}
                                className="w-6 h-6"
                            />
                        </View>
                    </View>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'bg-[#64748B1A] border-[#1E293B]'
                                : 'bg-[#64748B1A] border-[#E2E8F0]'
                        } flex flex-row items-center justify-between border-b py-6 px-4`}
                    >
                        <View>
                            <Text
                                className={`${
                                    isDarkTheme
                                        ? 'text-[#94A3B8]'
                                        : 'text-[#64748B]'
                                }`}
                            >
                                HTML Advanced
                            </Text>
                        </View>
                        <View className="flex flex-row items-center justify-center">
                            <Image
                                source={require('../assets/bookmark-icon.png')}
                                className="w-6 h-6"
                            />
                            <Image
                                source={require('../assets/bookmark-icon.png')}
                                className="w-6 h-6"
                            />
                        </View>
                    </View>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'bg-[#64748B1A] border-[#1E293B]'
                                : 'bg-[#64748B1A] border-[#E2E8F0]'
                        } flex flex-row items-center justify-between border-b py-6 px-4`}
                    >
                        <View>
                            <Text
                                className={`${
                                    isDarkTheme
                                        ? 'text-[#94A3B8]'
                                        : 'text-[#64748B]'
                                }`}
                            >
                                CSS
                            </Text>
                        </View>
                        <View className="flex flex-row items-center justify-center">
                            <Image
                                source={require('../assets/bookmark-icon.png')}
                                className="w-6 h-6"
                            />
                            <Image
                                source={require('../assets/bookmark-icon.png')}
                                className="w-6 h-6"
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Content;
