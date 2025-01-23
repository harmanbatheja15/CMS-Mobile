import { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    Alert,
} from 'react-native';
import { themeAtom } from '../atoms';
import { useRecoilValue } from 'recoil';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchVideo } from '../utils/videoPlayer';

const Slides = ({ route }: any) => {
    const { courseId, collectionId, contentId } = route.params;
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    const [title, setTitle] = useState<string>('');
    const [slides, setSlides] = useState<string>('');

    useEffect(() => {
        const loadSlides = async () => {
            try {
                const response = await fetchVideo(
                    courseId,
                    collectionId,
                    contentId,
                );
                setTitle(response.data.title);
                !response.data.NotionMetadata &&
                    setSlides(response.data.VideoMetadata.slides);
            } catch (err) {
                console.error(err);
            }
        };
        loadSlides();
    }, [courseId]);

    const openInBrowser = async () => {
        if (slides) {
            try {
                const canOpen = await Linking.canOpenURL(slides);
                if (canOpen) {
                    await Linking.openURL(slides);
                } else {
                    Alert.alert('Error', 'Cannot open this URL');
                }
            } catch (error) {
                Alert.alert(
                    'Error',
                    'Something went wrong while opening the URL',
                );
            }
        }
    };

    if (!slides) {
        return (
            <View
                className={`${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                } flex flex-1 items-center justify-center`}
            >
                <Text
                    className={`${
                        isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                    } text-lg font-bold text-center`}
                >
                    Slides are not available...
                </Text>
            </View>
        );
    }

    // TODO: The slides should be downloaded inside the app.

    return (
        <ScrollView
            className={`${isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'}`}
            showsVerticalScrollIndicator={false}
        >
            <View className={`p-4 space-y-4`}>
                <TouchableOpacity activeOpacity={0.7} onPress={openInBrowser}>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'bg-[#0F172A] border-[#1E293B]'
                                : 'bg-[#F1F5F9] border-[#E2E8F0]'
                        } flex flex-row items-center justify-between p-4 rounded-lg border`}
                    >
                        <View className="flex flex-row items-center w-[60%]">
                            <View
                                className={`${
                                    isDarkTheme
                                        ? 'border-[#1E293B]'
                                        : 'border-[#E2E8F0]'
                                } border p-4 mr-3 rounded-md`}
                            >
                                <Image
                                    source={require('../assets/file-icon.png')}
                                    className="w-6 h-6"
                                />
                            </View>
                            <View>
                                <Text
                                    className={`${
                                        isDarkTheme
                                            ? 'text-[#F8FAFC]'
                                            : 'text-[#020817]'
                                    } text-sm`}
                                >
                                    {title}
                                </Text>
                            </View>
                        </View>
                        <View className="flex flex-row gap-2">
                            <Image
                                source={require('../assets/download-icon.png')}
                                className="w-10 h-10"
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Slides;
