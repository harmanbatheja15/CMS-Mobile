import { View, Text, Image, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import FolderCard from '../components/FolderCard';
import { FlashList } from '@shopify/flash-list';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { fetchFolders } from '../utils/folders';
import { useQuery } from '@tanstack/react-query';

export interface FolderData {
    id: number;
    type: string;
    title: string;
    hidden: boolean;
    description: string | null;
    thumbnail: string;
    parentId: number | null;
    createdAt: string;
    notionMetadataId: string | null;
    commentsCount: number;
}

type FolderViewProps = {
    route: RouteProp<RootStackParamList, 'FolderView'>;
};

const FolderView = ({ route }: FolderViewProps) => {
    const { courseId } = route.params;
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';

    const {
        data: folders,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['folders'],
        queryFn: () => fetchFolders(courseId),
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

    const NoFolders = () => {
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
                        Course Not Started Yet
                    </Text>
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#94A3B8]' : 'text-[#64748B]'
                        } text-center text-xs`}
                    >
                        This course hasn't begun yet. You'll be able to access
                        lectures and slides once it starts.
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <GestureHandlerRootView className="flex flex-1">
            <View
                className={`${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                } flex-1 px-4 py-2`}
            >
                <FlashList
                    data={folders.data}
                    ListEmptyComponent={<NoFolders />}
                    estimatedItemSize={100}
                    keyExtractor={(item: FolderData) => item.id.toString()}
                    renderItem={({ item }) => (
                        <FolderCard data={item} courseId={courseId} />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </GestureHandlerRootView>
    );
};

export default FolderView;
