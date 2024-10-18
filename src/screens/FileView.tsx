import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../Tabs/Courses';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {useRecoilValue} from 'recoil';
import {themeAtom} from '../atoms';

type NavigationProps = NavigationProp<RootStackParamList>;

const FileView = () => {
  const navigation = useNavigation<NavigationProps>();

  const theme = useRecoilValue(themeAtom);
  const isDarkTheme = theme === 'dark';

  return (
    <GestureHandlerRootView className="flex flex-1">
      <ScrollView>
        <View
          className={`${
            isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
          } h-screen px-4 py-2`}>
          <TouchableOpacity onPress={() => navigation.navigate('VideoPlayer')}>
            <View
              className={`${
                isDarkTheme
                  ? 'bg-[#0F172A] border-[#1E293B]'
                  : 'bg-[#E2E8F0] border-[#E2E8F0]'
              } flex flex-row items-center justify-between p-4 rounded-lg border my-2`}>
              <View className="flex flex-row items-center w-[60%]">
                <View
                  className={`${
                    isDarkTheme ? 'border-[#1E293B]' : 'border-[#E2E8F0]'
                  } border p-4 mr-3 rounded-md`}>
                  <Image
                    source={require('../assets/folder-icon.png')}
                    className="w-6 h-6"
                  />
                </View>
                <View>
                  <Text
                    className={`${
                      isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                    } text-sm`}>
                    HTML Introduction
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
                  source={require('../assets/tick-icon.png')}
                  className="w-6 h-6"
                />
                <Image
                  source={require('../assets/bookmark-icon.png')}
                  className="w-6 h-6"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default FileView;
