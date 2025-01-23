import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import { FlashList } from '@shopify/flash-list';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { deleteBookmark, fetchBookmarks } from '../utils/bookmarks';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '../../App';

type NavigationProps = NavigationProp<RootStackParamList>;

const BookmarkCard = ({
    data,
    isDarkTheme,
    deleteMutation,
    navigation,
}: any) => {
    const courseId = data?.content?.courses[0]?.courseId;
    console.log(data);

    const handleDelete = () => {
        deleteMutation.mutate(data.id);
    };

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
                    <TouchableOpacity
                        onPress={handleDelete}
                        disabled={deleteMutation.isPending}
                    >
                        <Image
                            source={require('../assets/bin-red-icon.png')}
                            className="w-6 h-6"
                            style={{
                                opacity: deleteMutation.isPending ? 0.5 : 1,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const NoBookmarks = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
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
                    💡 When you find something you want to save for later, Click
                    the "Bookmark" icon and it will appear here.
                </Text>
            </View>
        </View>
    );
};

const Bookmarks = () => {
    const navigation = useNavigation<NavigationProps>();
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteBookmark(id),
        onSuccess: (_, deletedId) => {
            queryClient.setQueryData(['files'], (oldData: any) => ({
                ...oldData,
                data: oldData.data.filter(
                    (bookmark: any) => bookmark.id !== deletedId,
                ),
            }));
        },
        onError: error => {
            console.error('Error deleting bookmark:', error);
        },
    });

    const {
        data: bookmarks,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['bookmarks'],
        queryFn: () => fetchBookmarks(),
    });

    if (isLoading) {
        return (
            <View
                className={`${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                } p-4 flex flex-1 justify-center items-center`}
            >
                <ActivityIndicator />
            </View>
        );
    }

    if (error) {
        return (
            <View
                className={`${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                } p-4 flex flex-1 justify-center items-center`}
            >
                <Text
                    className={`${
                        isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                    } text-center text-base`}
                >
                    An error occurred.
                </Text>
            </View>
        );
    }

    return (
        <View
            className={`${
                isDarkTheme
                    ? 'bg-[#020817] border-[#1E293B]'
                    : 'bg-[#FFFFFFF2] border-[#E2E8F0]'
            } h-full border p-4 space-y-4`}
        >
            <FlashList
                data={bookmarks.data}
                ListEmptyComponent={<NoBookmarks isDarkTheme={isDarkTheme} />}
                estimatedItemSize={100}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }) => (
                    <BookmarkCard
                        data={item}
                        isDarkTheme={isDarkTheme}
                        deleteMutation={deleteMutation}
                        navigation={navigation}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default Bookmarks;
