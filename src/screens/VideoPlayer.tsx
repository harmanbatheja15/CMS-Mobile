import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import Video from 'react-native-video';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Content from './Content';
import Chapters from './Chapters';
import Slides from './Slides';
import {
    GestureHandlerRootView,
    ScrollView,
} from 'react-native-gesture-handler';
import { themeAtom } from '../atoms';
import { useRecoilValue } from 'recoil';

type NavigationProps = NavigationProp<RootStackParamList>;

const Tab = createMaterialTopTabNavigator();

const SlidingTabs = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowColor: 'transparent',
                    borderRadius: 10,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: '#4E7AFF',
                    height: 3,
                },
                tabBarActiveTintColor: isDarkTheme ? '#fff' : '#000',
                tabBarInactiveTintColor: '#94A3B8',
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: '500',
                    textTransform: 'none',
                },
                tabBarPressColor: '#334155',
                tabBarScrollEnabled: false,
            }}>
            <Tab.Screen name="Content" component={Content} />
            <Tab.Screen name="Chapters" component={Chapters} />
            <Tab.Screen name="Slides" component={Slides} />
        </Tab.Navigator>
    );
};

const VideoPlayer = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    const navigation = useNavigation<NavigationProps>();

    return (
        <GestureHandlerRootView className="flex flex-1">
            <View
                className={`${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                } h-screen px-4 py-2`}>
                <View>
                    <Video
                        source={{
                            uri: 'https://media.istockphoto.com/id/1450313535/video/eco-friendly-cars-drive-on-elevated-roads.mp4?s=mp4-640x640-is&k=20&c=yLkIiF5a7XWHfqnmSHOuXL-gy5D3UNlwGpzzh7dXWKw=',
                        }}
                        paused={false}
                        repeat={true}
                        allowsExternalPlayback={true}
                        playInBackground={true}
                        controls={true}
                        className="w-full h-80"
                    />
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                        } font-bold text-2xl my-4`}>
                        Introduction to HTML
                    </Text>
                </View>
                <SlidingTabs />
            </View>
        </GestureHandlerRootView>
    );
};

export default VideoPlayer;
