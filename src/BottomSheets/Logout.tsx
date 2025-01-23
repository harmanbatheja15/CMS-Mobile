import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { themeAtom } from '../atoms';
import { useRecoilValue } from 'recoil';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackParamList } from '../Tabs/Account';

type NavigationProps = NavigationProp<StackParamList>;

const Logout = () => {
    const navigation = useNavigation<NavigationProps>();
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <View
            className={`h-52 ${isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFF]'}`}
        >
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                onClose={() => {
                    bottomSheetRef.current?.close();
                }}
                backgroundStyle={{
                    backgroundColor: isDarkTheme ? '#020817' : '#FFFFFF',
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: isDarkTheme ? '#1E293B' : '#E2E8F0',
                }}
                handleIndicatorStyle={{
                    backgroundColor: isDarkTheme ? '#64748B' : '#94A3B8',
                }}
            >
                <BottomSheetView
                    className={`${
                        isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFF]'
                    }`}
                >
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                        } text-2xl font-bold text-center `}
                    >
                        Logout
                    </Text>
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#64748B]' : 'text-[#94A3B8]'
                        } text-xs font-medium text-center `}
                    >
                        Are you sure you want to logout?
                    </Text>
                    <View className="flex flex-row items-center justify-center w-full mt-2 mb-6">
                        <TouchableOpacity
                            onPress={() => {}}
                            className={`${
                                isDarkTheme
                                    ? 'bg-[#020817] border-[#1E293B]'
                                    : 'bg-[#FFFFFF] border-[#E2E8F0]'
                            } border rounded-xl p-4 flex-1 mx-2`}
                        >
                            <Text
                                className={`${
                                    isDarkTheme
                                        ? 'text-[#94A3B8]'
                                        : 'text-[#64748B]'
                                } text-center`}
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Landing')}
                            className={`${
                                isDarkTheme ? 'bg-[#C32518]' : 'bg-[#C32518]'
                            } rounded-xl p-4 flex-1 mx-2`}
                        >
                            <Text
                                className={`${
                                    isDarkTheme
                                        ? 'text-[#FFFFFF]'
                                        : 'text-[#FFFFFF]'
                                } text-center`}
                            >
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
};

export default Logout;
