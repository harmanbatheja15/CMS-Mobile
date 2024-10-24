import { Text, View, Image, TouchableOpacity, SectionList } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import {
    GestureHandlerRootView,
    ScrollView,
} from 'react-native-gesture-handler';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import { HISTORY_DATA } from '../data/constants';

type NavigationProps = NavigationProp<RootStackParamList>;

const History = () => {
    const navigation = useNavigation<NavigationProps>();
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';

    if (!HISTORY_DATA || HISTORY_DATA.length === 0) {
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
                        No Watch History
                    </Text>
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#94A3B8]' : 'text-[#64748B]'
                        } text-center text-xs`}
                    >
                        It looks like you haven't watched any videos yet. Start
                        learning now to see your recently watched content here.
                    </Text>
                </View>
            </View>
        );
    }

    const HistoryCard = ({ data }: any) => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('VideoPlayer')}
            >
                <View
                    className={`${
                        isDarkTheme
                            ? 'bg-[#0F172A] border-[#1E293B]'
                            : 'bg-[#E2E8F0] border-[#E2E8F0]'
                    } flex flex-row items-center justify-between p-4 rounded-lg border my-2`}
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
                                {data.title}
                            </Text>
                            <Text
                                className={`${
                                    isDarkTheme
                                        ? 'text-[#94A3B8]'
                                        : 'text-[#64748B]'
                                } text-xs`}
                            >
                                Last Updated : {data.lastUpdated}
                            </Text>
                        </View>
                    </View>
                    <View className="flex flex-row gap-2">
                        <Image
                            source={require('../assets/tick-icon.png')}
                            className="w-6 h-6"
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <GestureHandlerRootView className="flex flex-1">
            <View
                className={`${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                } px-4 py-2`}
            >
                <SectionList
                    sections={HISTORY_DATA}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <HistoryCard data={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text className="mt-4">{title}</Text>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </GestureHandlerRootView>
    );
};

export default History;
