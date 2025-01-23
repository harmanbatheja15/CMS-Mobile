import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import Video from 'react-native-video';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Content from './Content';
import Chapters from './Chapters';
import Slides from './Slides';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { themeAtom } from '../atoms';
import { useRecoilValue } from 'recoil';
import { fetchVideo } from '../utils/videoPlayer';

const Tab = createMaterialTopTabNavigator();

const SlidingTabs = ({ courseId, collectionId, contentId }: any) => {
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
            }}
        >
            <Tab.Screen
                name="Content"
                component={Content}
                initialParams={{
                    courseId: courseId,
                    collectionId: collectionId,
                    contentId: contentId,
                }}
            />
            <Tab.Screen name="Chapters" component={Chapters} />
            <Tab.Screen
                name="Slides"
                component={Slides}
                initialParams={{
                    courseId: courseId,
                    collectionId: collectionId,
                    contentId: contentId,
                }}
            />
        </Tab.Navigator>
    );
};

type VideoPlayerProps = {
    route: RouteProp<RootStackParamList, 'VideoPlayer'>;
};

interface ContentTpe {
    id: number;
    type: string;
    title: string;
    hidden: boolean;
    description: string | null;
    thumbnail: string;
    parentId: number;
    createdAt: string;
    commentsCount: number;
    VideoMetadata: any;
    NotionMetadata: any;
}

const VideoPlayer = ({ route }: VideoPlayerProps) => {
    const { courseId, collectionId, contentId } = route.params;
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    const [courseContent, setCourseContent] = useState<ContentTpe>();

    useEffect(() => {
        const loadVideo = async () => {
            try {
                const response = await fetchVideo(
                    courseId,
                    collectionId,
                    contentId,
                );
                setCourseContent(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        loadVideo();
    }, [courseId]);

    return (
        <GestureHandlerRootView className="flex flex-1">
            <View
                className={`${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                } flex-1 px-4 py-2`}
            >
                <View>
                    <View className="w-full h-80">
                        <Video
                            source={{
                                uri: courseContent?.VideoMetadata
                                    ?.video_1080p_1,
                            }}
                            pictureInPicture={true}
                            paused={true}
                            repeat={true}
                            allowsExternalPlayback={true}
                            playInBackground={true}
                            controls={true}
                            className="w-full h-80"
                        />
                    </View>
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                        } font-bold text-2xl my-4`}
                    >
                        {courseContent?.title}
                    </Text>
                </View>
                <SlidingTabs
                    courseId={courseId}
                    collectionId={collectionId}
                    contentId={contentId}
                />
            </View>
        </GestureHandlerRootView>
    );
};

export default VideoPlayer;
