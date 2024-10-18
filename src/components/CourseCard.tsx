import React from 'react';
import {View, Text, Image, Button, TouchableOpacity} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../Tabs/Courses';
import {themeAtom} from '../atoms';
import {useRecoilValue} from 'recoil';

type NavigationProps = NavigationProp<RootStackParamList>;

const CourseCard = () => {
  const navigation = useNavigation<NavigationProps>();
  const theme = useRecoilValue(themeAtom);
  const isDarkTheme = theme === 'dark';

  return (
    <View className="py-2">
      <View
        className={`${
          isDarkTheme
            ? 'bg-[#020817] border-[#1E293B]'
            : 'bg-[#FFFFFF] border-[#E2E8F0]'
        } rounded-2xl border`}>
        <Image
          source={require('../assets/course1.png')}
          className="w-full rounded-2xl h-[203px]"
        />
        <View className="p-4">
          <Text
            className={`${
              isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
            } font-bold text-xl mb-4`}>
            Cohort 3.0 | Web Dev
          </Text>
          {/* <Button
            title="View Content"
            onPress={() => navigation.navigate('FolderView')}
          /> */}
          <TouchableOpacity
            onPress={() => navigation.navigate('FolderView')}
            className="bg-[#3259E8] rounded-xl py-4 px-6">
            <Text className="text-center text-[#FFFFFF] font-medium text-base">
              View Content
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row items-center justify-center mt-4 py-2">
            <Image
              source={require('../assets/user-group-icon.png')}
              className="w-6 h-6"
            />
            <Text
              className={`${
                isDarkTheme ? 'text-[#94A3B8]' : 'text-[#64748B]'
              } font-medium text-sm text-center ml-2`}>
              Join Discord Community
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CourseCard;
