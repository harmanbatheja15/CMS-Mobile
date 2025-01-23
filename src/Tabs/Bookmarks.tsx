import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import { FlashList } from '@shopify/flash-list';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { deleteBookmark, fetchBookmarks } from '../utils/bookmarks';

type NavigationProps = NavigationProp<RootStackParamList>;

const Bookmarks = () => {
    const navigation = useNavigation<NavigationProps>();
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    const [bookmarks, setBookmarks] = useState<any>();

    useEffect(() => {
        const loadBookmarks = async () => {
            try {
                const response = await fetchBookmarks();
                setBookmarks(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        loadBookmarks();
    }, []);

    const onDelete = async (id: string) => {
        try {
            await deleteBookmark(id);
            setBookmarks(
                (prevBookmarks: any) =>
                    prevBookmarks &&
                    prevBookmarks.filter((bookmark: any) => bookmark.id !== id),
            );
        } catch (err) {
            console.error(err);
        }
    };

    const BookmarkCard = ({ data }: any) => {
        const courseId = data?.content?.courses[0]?.courseId;

        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('VideoPlayer', {
                        courseId: courseId,
                        collectionId: data.contentId,
                        contentId: data.id,
                    })
                }
            >
                <View
                    className={`${
                        isDarkTheme
                            ? 'bg-[#0F172A] border-[#1E293B]'
                            : 'bg-[#F1F5F9] border-[#E2E8F0]'
                    } flex flex-row items-center justify-between p-4 rounded-lg border mb-4`}
                >
                    <View className="flex flex-row items-center w-[60%]">
                        <View
                            className={`border ${
                                isDarkTheme
                                    ? 'bg-[#0F172A] border-[#1E293B]'
                                    : 'bg-[#F1F5F9] border-[#E2E8F0]'
                            } p-4 mr-3 rounded-md`}
                        >
                            <Image
                                source={require('../assets/play-icon.png')}
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
                                {data.content.title}
                            </Text>
                            <Text
                                className={`${
                                    isDarkTheme
                                        ? 'text-[#94A3B8]'
                                        : 'text-[#64748B]'
                                } text-xs`}
                            >
                                Posted on : 10 Aug 2024
                            </Text>
                        </View>
                    </View>
                    <View className="flex flex-row gap-2">
                        <TouchableOpacity onPress={() => onDelete(data.id)}>
                            <Image
                                source={require('../assets/bin-red-icon.png')}
                                className="w-6 h-6"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const NoBookmarks = () => {
        return (
            <View
                className={`${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                } p-4 flex flex-1 justify-center items-center`}
            >
                <View
                    className={`${
                        isDarkTheme ? 'border-[#1E293B]' : 'border-[#E2E8F0]'
                    } w-full h-full flex items-center justify-center border rounded-2xl p-6 gap-2`}
                >
                    <Image source={require('../assets/info-icon.png')} />
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                        } text-center text-base`}
                    >
                        Well.. You have'nt Bookmarked anything yet...
                    </Text>
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#94A3B8]' : 'text-[#64748B]'
                        } text-center text-xs`}
                    >
                        💡 When you find something you want to save for later,
                        Click the “Bookmark” icon and it will appear here.
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View
            className={`${
                isDarkTheme
                    ? 'bg-[#020817] border-[#1E293B]'
                    : 'bg-[#FFFFFFF2] border-[#E2E8F0]'
            } h-full border p-4 space-y-4`}
        >
            {/* Bookmarks */}
            <FlashList
                data={bookmarks}
                ListEmptyComponent={<NoBookmarks />}
                estimatedItemSize={100}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }) => <BookmarkCard data={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default Bookmarks;
