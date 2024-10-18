import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Courses from './Tabs/Courses';
import Downloads from './Tabs/Downloads';
import Bookmarks from './Tabs/Bookmarks';
import History from './Tabs/History';
import Account from './Tabs/Account';
import {styled} from 'nativewind';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Courses" component={Courses} />
      <Tab.Screen name="Downloads" component={Downloads} />
      <Tab.Screen name="Bookmarks" component={Bookmarks} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

const StyledText = styled(Text);

function AppRouter() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Courses" component={Courses} />
      <Tab.Screen name="Downloads" component={Downloads} />
      <Tab.Screen name="Bookmarks" component={Bookmarks} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

export default AppRouter;
