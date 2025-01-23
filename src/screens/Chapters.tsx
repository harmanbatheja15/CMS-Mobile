import { View, Text, Image } from 'react-native';
import { themeAtom } from '../atoms';
import { useRecoilValue } from 'recoil';
import { ScrollView } from 'react-native-gesture-handler';

const Chapters = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    return (
        <ScrollView
            className={`${isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'}`}
            showsVerticalScrollIndicator={false}
        >
            <View className={`py-4 px-2 space-y-4`}>
                <View
                    className={`${
                        isDarkTheme ? 'bg-[#0F172A]' : 'bg-[#F1F5F9]'
                    } flex flex-row items-center justify-between p-4 rounded-2xl`}
                >
                    <View>
                        <Text
                            className={`${
                                isDarkTheme
                                    ? 'text-[#F8FAFC]'
                                    : 'text-[#020817]'
                            }`}
                        >
                            1. Welcome to 100xDevs
                        </Text>
                    </View>
                    <Text
                        className={`text-[#4E7AFF] bg-[#3B82F61A] px-4 py-2 rounded-full`}
                    >
                        00:00:00
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default Chapters;
