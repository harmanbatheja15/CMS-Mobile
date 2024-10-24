import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import { FILE_DATA } from '../data/constants';
import { FlashList } from '@shopify/flash-list';
import FileCard from '../components/FileCard';

type NavigationProps = NavigationProp<RootStackParamList>;

const FileView = () => {
    const navigation = useNavigation<NavigationProps>();

    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';

    if (!FILE_DATA || FILE_DATA.length === 0) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>No videos available</Text>
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
                    data={FILE_DATA}
                    estimatedItemSize={100}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <FileCard data={item} />}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </GestureHandlerRootView>
    );
};

export default FileView;
