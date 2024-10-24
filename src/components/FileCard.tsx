import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { themeAtom } from '../atoms';
import { useRecoilValue } from 'recoil';
import { RootStackParamList } from '../../App';

type NavigationProps = NavigationProp<RootStackParamList>;

interface FileData {
    id: number;
    title: string;
    postedOn: string;
    isCompleted: boolean;
}

interface FileCardProps {
    data: FileData;
}

const FileCard = ({ data }: FileCardProps) => {
    const navigation = useNavigation<NavigationProps>();
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('VideoPlayer')}>
            <View
                className={`${
                    isDarkTheme
                        ? 'bg-[#0F172A] border-[#1E293B]'
                        : 'bg-[#E2E8F0] border-[#E2E8F0]'
                } flex flex-row items-center justify-between p-4 rounded-lg border my-2`}>
                <View className="flex flex-row items-center w-[60%]">
                    <View
                        className={`${
                            isDarkTheme
                                ? 'border-[#1E293B]'
                                : 'border-[#E2E8F0]'
                        } border p-4 mr-3 rounded-md`}>
                        <Image
                            source={require('../assets/folder-icon.png')}
                            className="w-6 h-6"
                        />
                    </View>
                    <View>
                        <Text
                            className={`${
                                isDarkTheme
                                    ? 'text-[#F8FAFC]'
                                    : 'text-[#020817]'
                            } text-sm`}>
                            {data.title}
                        </Text>
                        <Text
                            className={`${
                                isDarkTheme
                                    ? 'text-[#94A3B8]'
                                    : 'text-[#64748B]'
                            } text-xs`}>
                            {data.postedOn}
                        </Text>
                    </View>
                </View>
                <View className="flex flex-row gap-2">
                    {data.isCompleted && (
                        <TouchableOpacity activeOpacity={0.9}>
                            <Image
                                source={require('../assets/tick-icon.png')}
                                className="w-6 h-6"
                            />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity activeOpacity={0.7}>
                        <Image
                            source={require('../assets/bookmark-icon.png')}
                            className="w-6 h-6"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default FileCard;
