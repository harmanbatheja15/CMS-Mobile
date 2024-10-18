import {View, Text, Image} from 'react-native';
import {themeAtom} from '../atoms';
import {useRecoilValue} from 'recoil';

const Slides = () => {
  const theme = useRecoilValue(themeAtom);
  const isDarkTheme = theme === 'dark';
  return (
    <View
      className={`${
        isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
      } h-full p-4 space-y-4`}>
      <View
        className={`${
          isDarkTheme
            ? 'bg-[#0F172A] border-[#1E293B]'
            : 'bg-[#F1F5F9] border-[#E2E8F0]'
        } flex flex-row items-center justify-between p-4 rounded-lg border`}>
        <View className="flex flex-row items-center w-[60%]">
          <View
            className={`${
              isDarkTheme ? 'border-[#1E293B]' : 'border-[#E2E8F0]'
            } border p-4 mr-3 rounded-md`}>
            <Image
              source={require('../assets/file-icon.png')}
              className="w-6 h-6"
            />
          </View>
          <View>
            <Text
              className={`${
                isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
              } text-sm`}>
              HTML Presentation
            </Text>
            <Text
              className={`${
                isDarkTheme ? 'text-[#94A3B8]' : 'text-[#64748B]'
              } text-xs`}>
              Posted on : 10 Aug 2024
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
    </View>
  );
};

export default Slides;
