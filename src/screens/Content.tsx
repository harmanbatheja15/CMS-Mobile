import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { themeAtom } from '../atoms';
import { useRecoilValue } from 'recoil';
import { ScrollView } from 'react-native-gesture-handler';
import { addBookmark, fetchContent, removeBookmark } from '../utils/content';

const Content = ({ route }: any) => {
    const { courseId, collectionId, contentId } = route.params;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    const [folders, setFolders] = useState<any[]>([]);
    const [files, setFiles] = useState<any[]>([]);

    useEffect(() => {
        const loadContent = async () => {
            try {
                const response = await fetchContent(courseId, collectionId);
                setFolders(response.folders);
                setFiles(response.files);
            } catch (err) {
                console.error(err);
            }
        };
        loadContent();
    }, [courseId, collectionId]);

    const onAdd = async (id: string) => {
        try {
            await addBookmark(id);
        } catch (err) {
            console.error(err);
        }
    };

    const onDelete = async (id: string) => {
        try {
            await removeBookmark(id);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ScrollView
            className={`border ${
                isDarkTheme
                    ? 'bg-[#020817] border-[#1E293B]'
                    : 'bg-[#FFFFFFF2] border-[#E2E8F0]'
            }`}
            showsVerticalScrollIndicator={false}
        >
            {folders &&
                folders.map((c, index) => (
                    <View className={``} key={index}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() =>
                                setIsDropdownOpen(
                                    isDropdownOpen => !isDropdownOpen,
                                )
                            }
                        >
                            <View
                                className={`${
                                    isDarkTheme
                                        ? 'bg-[#020817] border-[#1E293B]'
                                        : 'bg-[#fff] border-[#E2E8F0]'
                                } flex flex-row items-center justify-between border-b py-6 px-4`}
                            >
                                <View>
                                    <Text
                                        className={`${
                                            isDarkTheme
                                                ? 'text-[#94A3B8]'
                                                : 'text-[#64748B]'
                                        }`}
                                    >
                                        {c.title}
                                    </Text>
                                    <Text
                                        className={`${
                                            isDarkTheme
                                                ? 'text-[#94A3B8]'
                                                : 'text-[#64748B]'
                                        }`}
                                    >
                                        0/{files.length} Lectures
                                    </Text>
                                </View>
                                <Image
                                    source={require('../assets/chevron-down-icon.png')}
                                    className="w-6 h-6"
                                />
                            </View>
                        </TouchableOpacity>

                        {files &&
                            files.map((f, index) => (
                                <View
                                    className={`${
                                        isDropdownOpen ? 'flex' : 'hidden'
                                    }`}
                                    key={index}
                                >
                                    <View
                                        className={`${
                                            isDarkTheme
                                                ? 'bg-[#64748B1A] border-[#1E293B]'
                                                : 'bg-[#64748B1A] border-[#E2E8F0]'
                                        } flex flex-row items-center justify-between border-b py-6 px-4`}
                                    >
                                        <View>
                                            <Text
                                                className={`${
                                                    isDarkTheme
                                                        ? 'text-[#94A3B8]'
                                                        : 'text-[#64748B]'
                                                }`}
                                            >
                                                {f.title}
                                            </Text>
                                        </View>
                                        <View className="flex flex-row items-center justify-center">
                                            {/* <Image
									source={require('../assets/bookmark-icon.png')}
									className="w-6 h-6"
								/> */}
                                            <TouchableOpacity
                                                onPress={() => onAdd(f.id)}
                                            >
                                                <Image
                                                    source={require('../assets/bookmark-icon.png')}
                                                    className="w-6 h-6"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                    </View>
                ))}
        </ScrollView>
    );
};

export default Content;
