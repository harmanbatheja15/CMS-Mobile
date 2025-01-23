import { Text, View, Image, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../../App';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RouteProp } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import { FlashList } from '@shopify/flash-list';
import FileCard from '../components/FileCard';
import { FileData } from '../services/types';
import { fetchFiles } from '../utils/files';
import { useQuery } from '@tanstack/react-query';

type FileViewProps = {
    route: RouteProp<RootStackParamList, 'FileView'>;
};

const FileView = ({ route }: FileViewProps) => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    const { courseId, collectionId } = route.params;

    const {
        data: files,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['files'],
        queryFn: () => fetchFiles(courseId, collectionId),
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

    const NoFiles = () => {
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
                    data={files.data}
                    ListEmptyComponent={<NoFiles />}
                    estimatedItemSize={100}
                    keyExtractor={(item: FileData) => item.id.toString()}
                    renderItem={({ item }) => (
                        <FileCard
                            data={item}
                            courseId={courseId}
                            collectionId={collectionId}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </GestureHandlerRootView>
    );
};

export default FileView;
