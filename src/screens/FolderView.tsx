import React from 'react';
import { View } from 'react-native';
import {
    GestureHandlerRootView,
    ScrollView,
} from 'react-native-gesture-handler';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import FolderCard from '../components/FolderCard';
import { FlashList } from '@shopify/flash-list';
import { FOLDER_DATA } from '../data/constants';
import { Text } from 'react-native-svg';

const FolderView = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';

    if (!FOLDER_DATA || FOLDER_DATA.length === 0) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>No folders available</Text>
            </View>
        );
    }

    return (
        <GestureHandlerRootView className="flex flex-1">
            <View
                className={`${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                } flex-1 px-4 py-2`}>
                <FlashList
                    data={FOLDER_DATA}
                    estimatedItemSize={100}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <FolderCard data={item} />}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </GestureHandlerRootView>
    );
};

export default FolderView;
