import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import FolderCard from '../components/FolderCard';
import { FlashList } from '@shopify/flash-list';
import { FOLDER_DATA } from '../data/constants';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../config';

interface FolderData {
    id: number;
    title: string;
    lastUpdated: string;
    isCompleted: boolean;
}

type FolderViewProps = {
    route: RouteProp<RootStackParamList, 'FolderView'>;
};

const FolderView = ({ route }: FolderViewProps) => {
    const { courseId } = route.params;
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    const [courseContent, setCourseContent] = useState<FolderData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (!userData) {
                    throw new Error('User data not found');
                }
                const token = await AsyncStorage.getItem('token');

                const response = await axios.get(
                    `${BASE_URL}/courses/${courseId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: token,
                        },
                    },
                );
                setCourseContent(response.data);
                return response.data;
            } catch (error) {
                throw error;
            }
        };
        fetchData();
    }, []);

    const NoCourseContent = () => {
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
                    data={courseContent}
                    ListEmptyComponent={<NoCourseContent />}
                    estimatedItemSize={100}
                    keyExtractor={(item: FolderData) => item.id.toString()}
                    renderItem={({ item }) => <FolderCard data={item} />}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </GestureHandlerRootView>
    );
};

export default FolderView;
